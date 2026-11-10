// Private journal: server-side password check and authenticated private Blob access.
const crypto = require('node:crypto');
const {promisify} = require('node:util');
const pbkdf2 = promisify(crypto.pbkdf2);
const verifier = require('../auth-config.json');
const {validPlan,applyPlan,manualRecords}=require('../lib/journal-sync.cjs');
const COOKIE = '__Host-rex_journal';
const FILE = 'journal-state.json';
const attempts = new Map();
const ttl = 7 * 24 * 60 * 60;
function key(){return crypto.createHash('sha256').update('rex-journal-v1\0'+process.env.BLOB_READ_WRITE_TOKEN+'\0'+verifier.hash).digest();}
function mac(value){return crypto.createHmac('sha256',key()).update(value).digest('hex');}
function equal(a,b){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y);}
function signedIn(req){
 const raw=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1)||'';
 const [expiry,nonce,sig]=raw.split('.');if(!expiry||!nonce||!sig||!/^\d+$/.test(expiry)||Number(expiry)<Date.now()/1000||Number(expiry)>Date.now()/1000+ttl+60)return false;
 return equal(mac(expiry+'.'+nonce),sig);
}
function cookie(value,age){return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;}
function valid(records){
 if(!Array.isArray(records)||records.length>200)return false;
 const ids=new Set();
 for(const r of records){
  if(!r||typeof r!=='object'||typeof r.id!=='string'||ids.has(r.id))return false;ids.add(r.id);
  for(const k of ['id','school','short','region','program','round','deadline','deadlineNote','status','portfolio','supplement','portal','result','note','review','updated'])if(typeof r[k]!=='string'||r[k].length>50000)return false;
  if(r.manualLock!==undefined&&typeof r.manualLock!=='boolean')return false;
  if(![1,2,3].includes(r.priority)||!Array.isArray(r.tasks)||r.tasks.length>500||!Array.isArray(r.evidence)||r.evidence.length>500||!Array.isArray(r.history)||r.history.length>5000)return false;
  for(const t of r.tasks)if(typeof t.text!=='string'||typeof t.done!=='boolean'||t.text.length>5000||(t.star!==undefined&&typeof t.star!=='boolean'))return false;
  for(const h of r.history)if(typeof h.date!=='string'||typeof h.text!=='string')return false;
  for(const e of r.evidence){try{if(typeof e.title!=='string'||!['https:','http:'].includes(new URL(e.url).protocol))return false;}catch{return false;}}
 }
 return true;
}
async function current(blob){try{
 // Read canonical write metadata before reading content. The download response
 // can carry a compression-specific ETag, which cannot guard an object write.
 const options={token:process.env.BLOB_READ_WRITE_TOKEN};
 const metadata=await blob.head(FILE,options);
 const result=await blob.get(FILE,{...options,access:'private',useCache:false});
 if(!result)return {records:[],revision:1,etag:null};
 const state=JSON.parse(await new Response(result.stream).text());return {...state,etag:metadata.etag};
 }catch(e){if(e instanceof blob.BlobNotFoundError)return {records:[],revision:1,etag:null};throw e;}}
// Up to three pinned notices; an older single `notice` is read as the first one.
function noticesOf(state){if(Array.isArray(state.notices))return state.notices;return state.notice?.text?[{id:'n1',text:state.notice.text,updatedAt:state.notice.updatedAt||''}]:[];}
// Portal shortcuts: links only. Anything that looks like an email, username or password is refused.
const secretLike=/[\w.+-]+@[\w-]+\.[\w.]+|密码|口令|用户名|password|passwd|username|\bpin\b|computing id/i;
function validPortals(list){
 if(!Array.isArray(list)||list.length>100)return false;
 for(const p of list){
  if(!p||typeof p!=='object')return false;
  for(const k of ['school','portal','region','note'])if(typeof p[k]!=='string'||p[k].length>2000||secretLike.test(p[k]))return false;
  if(!Array.isArray(p.links)||p.links.length>10)return false;
  for(const l of p.links){if(!l||typeof l.label!=='string'||l.label.length>200||secretLike.test(l.label))return false;try{const u=new URL(l.url);if(u.protocol!=='https:'&&u.protocol!=='http:'||u.username||u.password||/[?&](password|pwd|pin|token)=/i.test(u.search))return false;}catch{return false;}}
 }
 return true;
}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','private, no-store, max-age=0');res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 const reply=(code,data)=>res.status(code).json(data);
 if(!process.env.BLOB_READ_WRITE_TOKEN)return reply(503,{error:'私人存储尚未连接，请稍后重试。'});
 const url=new URL(req.url,'https://'+req.headers.host);const action=String(req.query?.action||url.searchParams.get('action')||'');
 if(!['GET','POST','PUT'].includes(req.method)){res.setHeader('Allow','GET, POST, PUT');return reply(405,{error:'不支持此操作'});}
 if(req.method!=='GET'){
  if(req.headers.origin!=='https://'+req.headers.host)return reply(403,{error:'来源不匹配'});
  if(action!=='logout'&&!(req.headers['content-type']||'').startsWith('application/json'))return reply(415,{error:'需要 JSON 格式'});
 }
 let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return reply(400,{error:'数据格式无效'});}
 if(req.method==='POST'&&action==='login'){
  const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'').split(',')[0];const now=Date.now();let limit=attempts.get(ip);if(!limit||limit.until<now){limit={count:0,until:now+900000};attempts.set(ip,limit);}if(attempts.size>10000)for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);
  if(++limit.count>12){res.setHeader('Retry-After','900');return reply(429,{error:'尝试次数较多，请 15 分钟后再试。'});}
  if(typeof body?.password!=='string'||body.password.length>256)return reply(400,{error:'请输入密码'});
  const digest=await pbkdf2(body.password,verifier.salt,600000,32,'sha256');if(!equal(digest.toString('hex'),verifier.hash))return reply(401,{error:'密码不正确'});
  attempts.delete(ip);const value=Math.floor(now/1000+ttl)+'.'+crypto.randomBytes(24).toString('hex');res.setHeader('Set-Cookie',cookie(value+'.'+mac(value),ttl));return reply(200,{ok:true});
 }
 if(req.method==='POST'&&action==='logout'){res.setHeader('Set-Cookie',cookie('',0));return reply(200,{ok:true});}
 if(!signedIn(req))return reply(401,{error:'请先输入密码登录。'});
 try{
  const blob=await import('@vercel/blob');const state=await current(blob);
  if(req.method==='GET')return reply(200,{records:state.records,revision:state.revision,sync:state.sync||null,notices:noticesOf(state),portals:state.portals||[],portalsSyncedAt:state.portalsSyncedAt||''});
  if(req.method==='POST'&&action==='portals'){
   if(!validPortals(body?.portals))return reply(400,{error:'Portal 链接格式无效，或包含疑似账号密码的内容'});
   const {etag,...rest}=state;const portalsSyncedAt=new Date().toISOString();
   await blob.put(FILE,JSON.stringify({...rest,portals:body.portals,portalsSyncedAt}),{token:process.env.BLOB_READ_WRITE_TOKEN,access:'private',addRandomSuffix:false,allowOverwrite:!!state.etag,...(state.etag?{ifMatch:state.etag}:{}),contentType:'application/json',cacheControlMaxAge:60});
   return reply(200,{count:body.portals.length,portalsSyncedAt});
  }
  if(req.method==='POST'&&action==='notice'){
   // Notices are saved on their own: records, revision and sync stay untouched, and the canonical ETag guards the write.
   const list=body?.notices;
   if(!Array.isArray(list)||list.length>3||!list.every(n=>n&&typeof n.id==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(n.id)&&typeof n.text==='string'&&n.text.length<=5000)||new Set(list.map(n=>n.id)).size!==list.length)return reply(400,{error:'最多三条公告，每条最多 5000 字'});
   const prev=noticesOf(state),now=new Date().toISOString();
   const notices=list.filter(n=>n.text.trim()).map(n=>{const old=prev.find(p=>p.id===n.id);return {id:n.id,text:n.text,updatedAt:old&&old.text===n.text?old.updatedAt:now};});
   const {etag,notice:_old,...rest}=state;
   await blob.put(FILE,JSON.stringify({...rest,notices}),{token:process.env.BLOB_READ_WRITE_TOKEN,access:'private',addRandomSuffix:false,allowOverwrite:!!state.etag,...(state.etag?{ifMatch:state.etag}:{}),contentType:'application/json',cacheControlMaxAge:60});
   return reply(200,{notices});
  }
  if(req.method==='POST'&&action==='sync'){
   if(!validPlan(body)||JSON.stringify(body).length>1000000)return reply(400,{error:'邮件核对计划格式无效'});
   const merged=applyPlan(state,body);
   await blob.put(FILE,JSON.stringify(merged.state),{token:process.env.BLOB_READ_WRITE_TOKEN,access:'private',addRandomSuffix:false,allowOverwrite:!!state.etag,...(state.etag?{ifMatch:state.etag}:{}),contentType:'application/json',cacheControlMaxAge:60});
   return reply(200,{revision:merged.state.revision,report:merged.report,sync:merged.state.sync});
  }
  if(req.method==='PUT'){
   if(!body||!valid(body.records)||!Number.isInteger(body.revision)||JSON.stringify(body).length>1000000)return reply(400,{error:'记录格式无效'});
   if(body.revision!==state.revision)return reply(409,{error:'其他页面已更新记录。请先导出当前修改，再刷新。'});
   const {etag:_e,...kept}=state;const next={...kept,records:manualRecords(state.records,body.records),revision:state.revision+1};
   await blob.put(FILE,JSON.stringify(next),{token:process.env.BLOB_READ_WRITE_TOKEN,access:'private',addRandomSuffix:false,allowOverwrite:!!state.etag,...(state.etag?{ifMatch:state.etag}:{}),contentType:'application/json',cacheControlMaxAge:60});return reply(200,{revision:next.revision,records:next.records});
  }
  return reply(405,{error:'不支持此操作'});
 }catch(e){if(['BlobPreconditionFailedError','BlobAlreadyExistsError'].includes(e.constructor?.name))return reply(409,{error:'记录已更新，请先导出修改，再刷新。'});console.error('Journal storage operation failed:',e.name,String(e.message).replace(/vercel_blob_rw_[A-Za-z0-9_]+/g,'[redacted]'));return reply(503,{error:'暂时无法读取或保存私人记录，修改仍在当前页面，请稍后重试。'});}
};
module.exports._test={valid,signedIn,mac,cookie};
