// Actual Windows job events via SSE, with snapshot polling for recovery.
let modelRun = 0, modelAbort, modelEvents, modelPoll, activeModelJob, requestDraft;
let traceQueue = '', traceFrame, traceTime = 0, seenTrace = new Set(), currentRank = -1;
const stageNames = {
  request_received:'request accepted by Windows backend', queued:'entered shared installation queue',
  model_started:'DeepSeek inference started', model_finished:'model returned VADC',
  mapped:'mapped VADC to control voltages', osc_sent:'OSC dispatched to VCV',
  echo:'CV echo sampled', completed:'installation cycle completed', failed:'job failed'
};
const stateRanks = {queued:0,interpreting:1,mapped:2,osc_sent:3,completed:4,failed:4};
function pumpTrace(now) {
  const el = $('model-log');
  if (!traceTime) traceTime = now;
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? traceQueue.length : Math.max(1,Math.floor((now-traceTime)*1.8));
  const follow = el.scrollHeight-el.clientHeight-el.scrollTop < 36;
  // Work in code points so a chunk never splits an emoji or surrogate pair.
  const chars = Array.from(traceQueue), part = chars.splice(0,count).join('');
  traceQueue = chars.join(''); el.textContent = (el.textContent + part).slice(-60000);
  if (follow) el.scrollTop = el.scrollHeight;
  traceTime = now;
  if (traceQueue) traceFrame = requestAnimationFrame(pumpTrace);
  else { traceFrame = null; traceTime = 0; el.dataset.streaming = 'false'; }
}
function printTrace(message) {
  traceQueue += message + '\n'; $('model-log').dataset.streaming = 'true';
  if (!traceFrame) traceFrame = requestAnimationFrame(pumpTrace);
}
function onceTrace(key, message) { if (!seenTrace.has(key)) { seenTrace.add(key); printTrace(message); } }
function detachModelJob() {
  document.body.classList.remove('is-interpreting');
  modelRun++; modelAbort?.abort(); modelEvents?.close(); clearTimeout(modelPoll);
  modelEvents = null; activeModelJob = null; sessionStorage.removeItem('amfm-live-job');
  if (traceFrame) cancelAnimationFrame(traceFrame);
  traceFrame = null; traceQueue = ''; traceTime = 0; $('model-log').dataset.streaming = 'false';
  setModelBusy(false);
}
async function modelApi(path, options = {}) {
  const res = await fetch('/api/machine' + path, {...options, cache:'no-store',signal:options.signal || AbortSignal.timeout(55000)});
  let data;
  try { data = await res.json(); } catch { throw new Error('The model service is temporarily unavailable. Please try again.'); }
  if (!res.ok) throw new Error(data.error?.message || 'Backend HTTP ' + res.status);
  return data;
}
function setModelBusy(value) {
  busy = value; document.querySelector('.send').disabled = value;
  document.querySelector('.send').textContent = value ? 'Running…' : 'Send ↵';
  $('text-input').readOnly = value;
}
function receiveJob(job, run) {
  if (run !== modelRun || !activeModelJob || job.job_id && job.job_id !== activeModelJob) return;
  if (job.simulated === true) throw new Error('Backend returned a simulated job; live mode requires real inference.');
  for (const step of job.timeline || []) {
    onceTrace('stage:'+step.stage+':'+step.at, '['+(step.at || '').slice(11,23)+' UTC] '+step.stage+' · '+(stageNames[step.stage] || step.label || step.stage));
  }
  // Some API snapshots contain a state without a full timeline.
  if (!(job.timeline || []).length && job.state) onceTrace('state:'+job.state,'[backend] '+job.state+(job.queue_position ? ' · queue position '+job.queue_position : ''));
  if (job.model) onceTrace('model','[model] '+(job.model.name || job.model.provider)+' · '+(job.model.latency_ms ?? '?')+' ms · simulated='+String(job.simulated));
  if (job.vadc) {
    if (!dimensions.every(d=>typeof job.vadc[d] === 'number' && Number.isFinite(job.vadc[d]) && job.vadc[d]>=0 && job.vadc[d]<=1)) throw new Error('Backend returned an invalid VADC vector.');
    onceTrace('vadc','[VADC] '+dimensions.map(d=>d+'='+job.vadc[d].toFixed(3)).join('  '));
    values = dimensions.map(d=>job.vadc[d]); dimensions.forEach((d,i)=>$(d).textContent=values[i].toFixed(2));
  }
  if (job.reasoning) onceTrace('interpretation','[interpretation]\n'+job.reasoning);
  if (job.voltages) onceTrace('voltages','[CV] '+Object.entries(job.voltages).map(([k,v])=>k+'='+v+'V').join('  '));
  if (job.osc?.status === 'SENT') onceTrace('osc','[OSC] SENT · port '+job.osc.port+' · audio output not confirmed');
  if (job.echo) onceTrace('echo','[echo] '+(job.echo.matched ?? 0)+'/'+(job.echo.total ?? 8)+' CV channels matched · audio output not confirmed');
  if (job.error) onceTrace('error','[ERROR] '+(job.error.code || '')+' '+(job.error.message || String(job.error)));
  const rank = stateRanks[job.state] ?? -1;
  if (rank < currentRank) return;
  currentRank = rank;
  document.body.classList.toggle('is-interpreting', job.state === 'interpreting');
  $('system-state').textContent = job.state || 'Online';
  $('output-state').textContent = '×× '+String(job.state || 'WAITING').toUpperCase()+' ××';
  $('process-log').textContent = '[job] '+activeModelJob+'\n[state] '+job.state+(job.reasoning?'\n'+job.reasoning:'')+(job.vadc?'\n'+JSON.stringify(job.vadc):'');
  if (job.state === 'completed' || job.state === 'failed') {
    modelEvents?.close(); clearTimeout(modelPoll); setModelBusy(false);
    sessionStorage.removeItem('amfm-live-job');
    onceTrace('done','[end] '+job.state+'\n$ awaiting next input_');
  }
}
function watchJob(jobId, run) {
  activeModelJob = jobId; sessionStorage.setItem('amfm-live-job',jobId);
  modelEvents = new EventSource('/api/machine/events?job_id='+encodeURIComponent(jobId));
  modelEvents.addEventListener('job', event => {
    try { const data = JSON.parse(event.data); receiveJob(data.job || data,run); }
    catch(error) { onceTrace('event-error','[stream] '+error.message); }
  });
  modelEvents.onerror = () => { if (run===modelRun && busy) onceTrace('reconnect','[stream] reconnecting · job polling remains active; request will not be resubmitted'); };
  async function poll() {
    if (run !== modelRun || !busy) return;
    try { receiveJob(await modelApi('/jobs/'+encodeURIComponent(jobId),{signal:modelAbort.signal}),run); }
    catch(error) { if (run !== modelRun) return; onceTrace('poll:'+error.message,'[connection] '+error.message+' · retrying status only'); }
    if (run===modelRun && busy) modelPoll = setTimeout(poll,1000);
  }
  poll();
}
$('input-form').addEventListener('submit', async event => {
  event.preventDefault(); const text = $('text-input').value.trim();
  if (busy || !text) { if (!text) $('text-input').focus(); return; }
  if (Array.from(text).length > 500) { printTrace('[validation] Maximum 500 characters.'); return; }
  detachModelJob(); const run = modelRun; modelAbort = new AbortController(); seenTrace = new Set(); currentRank = -1;
  setModelBusy(true); $('system-state').textContent = 'Submitting'; $('input-state').textContent = 'READING STDIN/';
  $('output-state').textContent = '×× CONNECTING TO MODEL ××';
  if (!requestDraft || requestDraft.text !== text) requestDraft = {text,client_request_id:crypto.randomUUID()};
  printTrace('\n$ interpret --stdin\n> '+text+'\n[input] validated '+Array.from(text).length+' characters / '+new TextEncoder().encode(text).length+' UTF-8 bytes\n[tokenization] provider-side; token IDs / internal steps are not exposed by this API\n[request] POST /interpret · '+requestDraft.client_request_id);
  try {
    const result = await modelApi('/interpret',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(requestDraft),signal:modelAbort.signal});
    if (run !== modelRun) return;
    if (!result.job_id) throw new Error('Backend did not return a job ID.');
    requestDraft = null; watchJob(result.job_id,run); $('session-id').textContent=result.job_id.slice(0,18).toUpperCase();
    printTrace('[accepted] job='+result.job_id); receiveJob(result,run);
  } catch(error) {
    if (run !== modelRun) return;
    setModelBusy(false); $('system-state').textContent='Request error'; $('output-state').textContent='×× MODEL REQUEST FAILED ××';
    printTrace('[ERROR] '+error.message+'\n[retry] same input reuses its request ID to prevent duplicate jobs');
  }
});
async function checkModelBackend() {
  const run = modelRun;
  try {
    const status = await modelApi('/status'); if (run!==modelRun || busy) return;
    $('model-log').textContent='';
    printTrace('[connected] Windows installation / '+status.model.name+'\n[model] simulated='+status.model.simulated+' · configured='+status.model.configured+'\n[ready] SSE job events + status polling\n$ awaiting input_');
    $('system-state').textContent = status.model.configured ? 'Online' : 'Unconfigured';
    const resumed = sessionStorage.getItem('amfm-live-job');
    if (resumed) { modelAbort = new AbortController(); setModelBusy(true); seenTrace = new Set(); printTrace('[resume] '+resumed); watchJob(resumed,run); }
  } catch(error) { if (run===modelRun && !busy) { $('model-log').textContent='[offline] '+error.message; $('system-state').textContent='Backend offline'; } }
}
checkModelBackend();
window.addEventListener('pagehide',()=>{ modelAbort?.abort(); modelEvents?.close(); clearTimeout(modelPoll); });
