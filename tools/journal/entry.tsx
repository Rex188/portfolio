import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Tracker from './tracker';
function App(){const [ready,setReady]=useState(false),[checking,setChecking]=useState(true),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{fetch('/api/journal',{cache:'no-store'}).then(r=>{setReady(r.ok);if(r.status===503)setError('私人存储暂时不可用，请稍后重试。');}).catch(()=>setError('连接失败，请检查网络后重试。')).finally(()=>setChecking(false));},[]);
 if(ready)return <Tracker/>;
 async function login(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{const r=await fetch('/api/journal?action=login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});const data=await r.json();if(!r.ok)throw Error(data.error||'登录失败');setPassword('');setReady(true);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 return <main className="loginpage"><form onSubmit={login} className="loginbox"><div className="brandmark">r.</div><div className="eyebrow">PERSONAL WORKSPACE</div><h1>私人申请档案</h1><p>输入密码，继续记录你的下一步。</p><label htmlFor="password">访问密码</label><input id="password" type="password" autoComplete="current-password" autoFocus value={password} onChange={e=>setPassword(e.target.value)} required disabled={checking||busy}/>{error&&<p role="alert" className="loginerror">{error}</p>}<button className="primary" disabled={checking||busy}>{checking?'正在连接…':busy?'正在验证…':'进入档案'}<span>↗</span></button><small>仅供本人使用 · 密码验证后读取私人记录</small></form></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
