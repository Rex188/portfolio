const fields = ['status','portfolio','supplement','portal','result','deadline','deadlineNote','round','program'];
const stages = ['待准备','准备中','已提交但待确认','材料已确认','等待结果','初筛未通过','获得面试/试音邀请','候补','录取','有条件录取','未录取','撤回'];
const material = ['待核对','待准备','进行中','已提交待确认','已确认接收','不适用'];
const results = ['未公布','初筛未通过','面试/试音邀请','候补','录取','有条件录取','未录取','撤回'];
const ranks = Object.fromEntries(stages.map((x,i)=>[x,i]));
const terminals = new Set(['录取','有条件录取','未录取','撤回']);
function validPlan(plan) {
 if(!plan||!Array.isArray(plan.updates)||plan.updates.length>200||!Number.isInteger(plan.scannedCount)||plan.scannedCount<0||plan.scannedCount>10000)return false;
 if(!Array.isArray(plan.messageIds)||plan.messageIds.length>2000||!plan.messageIds.every(x=>typeof x==='string'&&/^[a-f0-9]{8,64}$/i.test(x)))return false;
 const keys=new Set();
 for(const u of plan.updates){
  if(!u||typeof u.recordId!=='string'||!plan.messageIds.includes(u.messageId)||!Number.isFinite(Date.parse(u.emailAt))||Date.parse(u.emailAt)>Date.now()+600000)return false;
  const key=u.recordId+'/'+u.messageId;if(keys.has(key))return false;keys.add(key);
  if(!['explicit','needs_review'].includes(u.confidence)||typeof u.summary!=='string'||u.summary.length>5000||!u.summary.trim())return false;
  if(typeof u.quotedEvidence!=='string'||u.quotedEvidence.length>1500||!u.quotedEvidence.trim())return false;
  try{const url=new URL(u.evidence.url);if(url.protocol!=='https:'||url.hostname!=='mail.google.com'||!url.hash.includes(u.messageId)||typeof u.evidence.title!=='string')return false;}catch{return false;}
  if(!u.fields||Array.isArray(u.fields)||typeof u.fields!=='object')return false;
  for(const [k,v] of Object.entries(u.fields)){
   if(!fields.includes(k)||typeof v!=='string'||v.length>1000)return false;
   if(k==='status'&&!stages.includes(v)||['portfolio','supplement'].includes(k)&&!material.includes(v)||k==='result'&&!results.includes(v))return false;
   if(k==='deadline'&&v&&!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
  }
  if(u.tasks&&(!Array.isArray(u.tasks)||u.tasks.length>20||!u.tasks.every(t=>typeof t==='string'&&t.length>0&&t.length<2000)))return false;
 }
 return true;
}
function manualRecords(before,submitted,now=new Date().toISOString()){
 return submitted.map(r=>{
  const old=before.find(x=>x.id===r.id);
  const changed=old&&fields.some(k=>old[k]!==r[k]);
  return {...r,...(old?Object.fromEntries(['autoEvents','mailFieldDates','lastMailAt'].filter(k=>old[k]!==undefined).map(k=>[k,old[k]])):{}),manualLock:changed?true:!!r.manualLock,lastSource:old&&JSON.stringify(old)===JSON.stringify(r)?old.lastSource:'manual',...(changed?{manualUpdatedAt:now}:{})};
 });
}
function applyPlan(state,plan,now=new Date().toISOString()){
 if(!validPlan(plan))throw new Error('Invalid mail sync plan');
 const next=structuredClone(state);delete next.etag;
 const report={applied:0,review:0,duplicates:0,locked:0,unknown:0};
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));
 // Old confirmations are applied first so newer decisions remain authoritative.
 for(const u of [...plan.updates].sort((a,b)=>Date.parse(a.emailAt)-Date.parse(b.emailAt))){
  const r=next.records.find(x=>x.id===u.recordId);if(!r){report.unknown++;continue;}
  r.autoEvents??=[];r.mailFieldDates??={};
  if(r.autoEvents.some(e=>e.messageId===u.messageId)){report.duplicates++;continue;}
  const changes=[],skipped=[];let needsReview=u.confidence==='needs_review';
  for(const [k,v] of Object.entries(u.fields)){
   if(r[k]===v)continue;
   if(r.manualLock){skipped.push(k+'：保留手动修正');needsReview=true;continue;}
   if(u.confidence!=='explicit'){skipped.push(k+'：证据待核对');continue;}
   if(r.mailFieldDates[k]&&Date.parse(u.emailAt)<=Date.parse(r.mailFieldDates[k])){skipped.push(k+'：较早邮件');continue;}
   if((k==='status'&&ranks[v]<ranks[r.status])||(k==='result'&&r.result!=='未公布'&&v==='未公布')||(['portfolio','supplement'].includes(k)&&r[k]==='已确认接收'&&v!=='已确认接收')||(k==='status'&&terminals.has(r.status)&&!terminals.has(v))){skipped.push(k+'：不倒退已有确认');needsReview=true;continue;}
   // A different final result needs a newer, explicit dated decision.
   if(k==='result'&&terminals.has(r.result)&&v!==r.result&&(!r.mailFieldDates.result||Date.parse(u.emailAt)<=Date.parse(r.mailFieldDates.result))){skipped.push(k+'：最终结果冲突');needsReview=true;continue;}
   changes.push(k+'：'+r[k]+' → '+v);r[k]=v;r.mailFieldDates[k]=u.emailAt;
  }
  const exists=r.evidence.some(e=>e.url===u.evidence.url);if(!exists)r.evidence.push(u.evidence);
  for(const text of u.tasks||[])if(!r.tasks.some(t=>t.text===text))r.tasks.push({text,done:false});
  const event={messageId:u.messageId,emailAt:u.emailAt,syncedAt:now,summary:u.summary,quotedEvidence:u.quotedEvidence,changes,skipped,needsReview};
  r.autoEvents.push(event);r.autoEvents=r.autoEvents.slice(-1000);
  r.history.push({date:day,text:'[Gmail 自动] '+u.summary+(changes.length?'；'+changes.join('；'):'')+(skipped.length?'；'+skipped.join('；'):''),source:'gmail',messageId:u.messageId});
  r.updated=day;if(changes.length)r.lastSource='gmail';
  if(!r.lastMailAt||Date.parse(u.emailAt)>Date.parse(r.lastMailAt))r.lastMailAt=u.emailAt;
  if(changes.length)report.applied++;if(needsReview)report.review++;if(r.manualLock&&skipped.length)report.locked++;
 }
 next.sync={...state.sync,lastCheckedAt:now,lastSuccessAt:now,scannedCount:plan.scannedCount,windowStart:plan.windowStart||'',windowEnd:plan.windowEnd||now,updatedCount:report.applied,reviewCount:report.review,status:'success',cadenceHours:6,runner:'codex-local',processedMessageIds:[...new Set([...(state.sync?.processedMessageIds||[]),...plan.messageIds])].slice(-10000)};
 next.revision=state.revision+1;return {state:next,report};
}
module.exports={validPlan,applyPlan,manualRecords};
