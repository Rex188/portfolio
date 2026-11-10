// Up to three pinned notices that float over every tracker view.
// Text is saved to the private journal; card positions and collapsed state stay on this device.
import React,{useEffect,useRef,useState} from 'react';
import {Megaphone,Pencil,Trash2,ChevronDown,ChevronUp,Plus,Check,RotateCw,LocateFixed} from 'lucide-react';
import type {Notice} from './tracker-types';

type Pos={x:number;y:number};
const POS_KEY='journal-notice-pos',MIN_KEY='journal-notice-min',MAX=3;
const readPref=<T,>(k:string,fallback:T):T=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v) as T:fallback;}catch{return fallback;}};
const writePref=(k:string,v:unknown)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
const stamp=(iso:string)=>iso?new Date(iso).toLocaleString('zh-CN',{timeZone:'America/New_York',hour12:false,month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
const newId=()=>Math.random().toString(36).slice(2,10);
function clamp(p:Pos,el:HTMLElement|null):Pos{const w=el?.offsetWidth||320;return {x:Math.round(Math.min(Math.max(0,p.x),Math.max(0,window.innerWidth-w))),y:Math.round(Math.min(Math.max(0,p.y),Math.max(0,window.innerHeight-56)))};}

export default function NoticeBoard({notices,onSaved,onToast}:{notices:Notice[];onSaved:(n:Notice[])=>void;onToast:(s:string)=>void}){
 const [pos,setPos]=useState<Record<string,Pos>>(()=>readPref(POS_KEY,{}));
 const [min,setMin]=useState<Record<string,boolean>>(()=>readPref(MIN_KEY,{}));
 const [edit,setEdit]=useState<{id:string;text:string;isNew:boolean}|null>(null);
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const drag=useRef<{id:string;dx:number;dy:number;el:HTMLElement}|null>(null);
 useEffect(()=>writePref(POS_KEY,pos),[pos]);
 useEffect(()=>writePref(MIN_KEY,min),[min]);
 // Keep moved cards on screen when the window shrinks.
 useEffect(()=>{const f=()=>setPos(p=>Object.fromEntries(Object.entries(p).map(([id,v])=>[id,clamp(v,document.querySelector<HTMLElement>(`[data-notice="${id}"]`))])));window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f);},[]);

 const save=async(next:{id:string;text:string}[],message:string)=>{setBusy(true);setError('');try{const r=await fetch('/api/journal?action=notice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({notices:next})});const data=await r.json() as {error?:string;notices?:Notice[]};if(!r.ok||!data.notices)throw Error(data.error||'公告保存失败');onSaved(data.notices);setEdit(null);onToast(message);return true;}catch(e){setError((e as Error).message);return false;}finally{setBusy(false);}};
 const plain=()=>notices.map(({id,text})=>({id,text}));
 const commit=()=>{if(!edit)return;if(!edit.text.trim()){if(edit.isNew){setEdit(null);return;}setError('公告内容不能为空；不需要的话请删除');return;}save(edit.isNew?[...plain(),{id:edit.id,text:edit.text}]:plain().map(n=>n.id===edit.id?{...n,text:edit.text}:n),'公告已保存');};
 const remove=(id:string)=>{if(!window.confirm('删除这条公告？'))return;save(plain().filter(n=>n.id!==id),'公告已删除').then(ok=>{if(ok){setPos(p=>{const {[id]:_,...rest}=p;return rest;});setMin(m=>{const {[id]:_,...rest}=m;return rest;});}});};

 const down=(e:React.PointerEvent<HTMLElement>,id:string)=>{if((e.target as HTMLElement).closest('button,textarea'))return;const el=(e.currentTarget.closest('[data-notice]') as HTMLElement);const r=el.getBoundingClientRect();drag.current={id,dx:e.clientX-r.left,dy:e.clientY-r.top,el};e.currentTarget.setPointerCapture(e.pointerId);setPos(p=>({...p,[id]:{x:Math.round(r.left),y:Math.round(r.top)}}));};
 const move=(e:React.PointerEvent)=>{const d=drag.current;if(!d)return;setPos(p=>({...p,[d.id]:clamp({x:e.clientX-d.dx,y:e.clientY-d.dy},d.el)}));};
 const up=()=>{drag.current=null;};

 const items=edit?.isNew?[...notices,{id:edit.id,text:'',updatedAt:''}]:notices;
 const card=(n:Notice,i:number)=>{const editing=edit?.id===n.id,free=!!pos[n.id],folded=!!min[n.id]&&!editing;
  return <section key={n.id} data-notice={n.id} className={'noticecard'+(free?' free':'')+(folded?' min':'')} style={free?{left:pos[n.id].x,top:pos[n.id].y}:undefined} aria-label={'公告 '+(i+1)}>
   <header onPointerDown={e=>down(e,n.id)} onPointerMove={move} onPointerUp={up} onPointerCancel={up} title="按住拖动到任意位置">
    <Megaphone size={19}/><b>公告 {i+1}</b>{n.updatedAt&&<small>{stamp(n.updatedAt)}</small>}
    {!editing&&<span className="noticetools">
     <button aria-label={'编辑公告 '+(i+1)} title="编辑" disabled={busy} onClick={()=>{setEdit({id:n.id,text:n.text,isNew:false});setError('');setMin(m=>({...m,[n.id]:false}));}}><Pencil size={16}/></button>
     <button aria-label={(folded?'展开':'收起')+'公告 '+(i+1)} title={folded?'展开':'收起'} onClick={()=>setMin(m=>({...m,[n.id]:!folded}))}>{folded?<ChevronDown size={17}/>:<ChevronUp size={17}/>}</button>
     {free&&<button aria-label={'公告 '+(i+1)+' 回到顶部中间'} title="回到顶部中间" onClick={()=>setPos(p=>{const {[n.id]:_,...rest}=p;return rest;})}><LocateFixed size={16}/></button>}
     <button aria-label={'删除公告 '+(i+1)} title="删除" disabled={busy} onClick={()=>remove(n.id)}><Trash2 size={16}/></button>
    </span>}
   </header>
   {editing?<div className="noticeedit"><textarea rows={5} maxLength={5000} autoFocus value={edit.text} onChange={e=>setEdit({...edit,text:e.target.value})} placeholder="写下需要一直看到的提醒…"/>{error&&<p className="noticeerror" role="alert">{error}</p>}<div className="noticeactions"><button disabled={busy} onClick={()=>{setEdit(null);setError('');}}>取消</button><button className="primary" disabled={busy} onClick={commit}>{busy?<RotateCw size={15}/>:<Check size={15}/>}保存</button></div></div>
    :!folded&&<p className="noticetext">{n.text}</p>}
   {!editing&&error&&<p className="noticeerror" role="alert">{error}</p>}
  </section>;};

 // Every card stays in the dock so dragging never remounts it; a moved card is position:fixed and leaves the flex row.
 return <div className="noticedock">
  {items.map(card)}
  {items.length<MAX&&!edit?.isNew&&<button className="noticeadd" disabled={busy} onClick={()=>{setEdit({id:newId(),text:'',isNew:true});setError('');}}><Plus size={16}/>{items.length?'再加一条公告':'添加公告'}<small>{items.length}/{MAX}</small></button>}
 </div>;
}
