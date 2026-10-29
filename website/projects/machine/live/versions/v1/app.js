function scaleDesktop(){const scale=Math.min(1,window.innerWidth/2091);document.documentElement.style.setProperty("--desktop-scale",scale);document.documentElement.style.setProperty("--dock-zoom",1/scale);}
scaleDesktop(); window.addEventListener("resize",scaleDesktop);
// Live model jobs are managed by model-client.js; live media is managed by webrtc.js.
const $ = id => document.getElementById(id);
const dimensions = ['valence','arousal','confidence','dominance'];
let values = [.5,.6,.5,.5], busy = false, session = 1;
// Play is connected to the live Windows receiver in webrtc.js.
$('text-input').addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); $('input-form').requestSubmit(); } });
$('close').addEventListener('click', () => { detachModelJob(); busy = false; window.vcvMedia?.close(); document.querySelector('.send').disabled = false; $('system-state').textContent = 'Idle'; $('input-state').textContent = 'SESSION CLOSED/'; $('output-state').textContent = '×××× WAITING FOR INPUT ××××'; $('model-log').textContent += '\n[closed] WebRTC receiver closed; monitoring detached (backend job may continue)'; });
$('new-session').addEventListener('click', () => {
  detachModelJob(); busy = false; session++; values=[.5,.6,.5,.5]; document.querySelector('.send').disabled=false;
  $('text-input').value=''; dimensions.forEach((d,i)=>$(d).textContent=values[i].toFixed(2));
  $('session-id').textContent=crypto.randomUUID().slice(0,18).toUpperCase(); $('new-session').textContent='Session '+session; $('system-state').textContent='Online'; $('input-state').textContent='WAIT FOR INPUT/'; $('output-state').textContent='×××× WAITING FOR MODEL OUTPUT ××××'; $('model-log').textContent='[ready] new session · live model backend\nawait pipeline.wait_for_input()'; $('process-log').textContent='[ready] transformer / VADC\nawait pipeline.wait_for_input()'; $('text-input').focus();
});


// Keep the technical explanation visible while folding away the introduction.
$('intro-toggle').addEventListener('click', () => {
  const collapsed = document.querySelector('.introduction').classList.toggle('is-collapsed');
  document.querySelectorAll('.intro-fold').forEach(section => { section.inert = collapsed; });
  $('intro-toggle').setAttribute('aria-expanded', String(!collapsed));
  $('intro-toggle').setAttribute('aria-label', collapsed ? 'Expand introduction' : 'Collapse introduction');
  $('intro-toggle').title = collapsed ? '展开 Introduction' : '收起 Introduction';
});

// Preserve the existing animation's 640px canvas layout inside this panel.
const llmFrame = $('llm-animation');
new ResizeObserver(([entry]) => {
  const {width, height} = entry.contentRect;
  if (!width || !height) return;
  const scale = width / 640;
  llmFrame.style.height = (height / scale) + 'px';
  llmFrame.style.transform = 'scale(' + scale + ')';
}).observe(llmFrame.parentElement);
