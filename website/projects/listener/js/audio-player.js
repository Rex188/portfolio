const $=id=>document.getElementById(id);
export function setupAudio(onModeChange,onPlayChange){for(let i=0;i<72;i++){const bar=document.createElement('i');bar.style.setProperty('--h',`${4+Math.round(Math.random()*19)}px`);bar.style.animationDelay=`${Math.random()}s`;$('wave').appendChild(bar)}
 document.querySelectorAll('.mode-toggle button').forEach(button=>button.addEventListener('click',()=>onModeChange(button.dataset.mode)));
 $('play').addEventListener('click',()=>onPlayChange());$('volume').setAttribute('aria-label','Volume');}
