// Fixed upstream only; keep the local prototype's job-scoped event stream.
const UPSTREAM = 'https://rex.tailaccd1f.ts.net';
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = new URL(req.url, 'https://' + req.headers.host);
  const path = String(req.query?.path || url.searchParams.get('path') || '');
  const jobId = String(req.query?.job_id || url.searchParams.get('job_id') || '');
  const validId = /^[a-zA-Z0-9-]{1,100}$/;
  const reply = (code, message) => res.status(code).json({error:{message}});
  let endpoint;
  let body;
  if (req.method === 'GET' && path === 'status') endpoint = '/status';
  else if (req.method === 'GET' && /^jobs\/[a-zA-Z0-9-]{1,100}$/.test(path)) endpoint = '/' + path;
  else if (req.method === 'GET' && path === 'events' && validId.test(jobId)) endpoint = '/events';
  else if (req.method === 'POST' && path === 'interpret') {
    if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return reply(403, 'Origin not allowed');
    if (!(req.headers['content-type'] || '').startsWith('application/json')) return reply(415, 'Expected application/json');
    let data;
    try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return reply(400, 'Invalid JSON'); }
    if (typeof data?.text !== 'string' || !data.text.trim() || [...data.text.trim()].length > 500 || !validId.test(data.client_request_id || '')) return reply(400, 'Expected 1–500 characters and a valid request ID');
    body = JSON.stringify({text:data.text.trim(),client_request_id:data.client_request_id});
    endpoint = '/interpret';
  } else return reply(404, 'Unknown endpoint');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), endpoint === '/events' ? 22000 : 45000);
  res.on('close', () => controller.abort());
  try {
    const upstream = await fetch(UPSTREAM + endpoint, {method:req.method, body, headers:{'Content-Type':'application/json','Accept':endpoint === '/events' ? 'text/event-stream' : 'application/json'},signal:controller.signal});
    if (endpoint !== '/events' || !upstream.ok) {
      const data = await upstream.json();
      return res.status(upstream.status).json(data);
    }
    res.writeHead(200, {'Content-Type':'text/event-stream; charset=utf-8','X-Accel-Buffering':'no'});
    res.write('retry: 3000\n\n');
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const {done,value} = await reader.read();
      if (done) break;
      buffer += decoder.decode(value,{stream:true});
      let end;
      while ((end = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0,end).trimEnd(); buffer = buffer.slice(end+1);
        if (line.startsWith(':')) res.write(': heartbeat\n\n');
        if (!line.startsWith('data:')) continue;
        let event;
        try { event = JSON.parse(line.slice(5)); } catch { continue; }
        if (event.job_id !== jobId) continue;
        res.write('event: job\ndata: ' + JSON.stringify(event) + '\n\n');
        if (['completed','failed'].includes(event.state)) { controller.abort(); return res.end(); }
      }
    }
    res.end();
  } catch (error) {
    if (res.headersSent) res.end();
    else reply(502, 'Windows model backend is unreachable. Please try again.');
  } finally { clearTimeout(timer); }
};
