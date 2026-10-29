// V2 viewport workstation; the archived V1 keeps its original long-page layout.
document.body.classList.add('workstation');
const consoleBottom = document.createElement('section');
consoleBottom.className = 'console-bottom panel';
consoleBottom.setAttribute('aria-label','Model workspace');
consoleBottom.innerHTML = `<div class="console-tabs" role="tablist" aria-label="Model workspace">
  <button id="animation-tab" type="button" role="tab" aria-selected="true" aria-controls="animation-panel">Model.Process</button>
  <button id="log-tab" type="button" role="tab" aria-selected="false" aria-controls="log-panel" tabindex="-1">Model.Log <span class="log-activity" aria-hidden="true"></span></button>
  <span class="workspace-caption">TRANSFORMER / LIVE</span>
</div>`;
const processPanel = document.querySelector('.process');
const logPanel = document.querySelector('.log-panel');
processPanel.id = 'animation-panel'; logPanel.id = 'log-panel';
for (const [panel,tab] of [[processPanel,'animation-tab'],[logPanel,'log-tab']]) {
  panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',tab);
  consoleBottom.append(panel);
}
document.querySelector('.center-column').append(consoleBottom);
function showConsoleTab(name) {
  const showLog = name === 'log';
  processPanel.hidden = showLog; logPanel.hidden = !showLog;
  for (const [id,selected] of [['animation-tab',!showLog],['log-tab',showLog]]) {
    $(id).setAttribute('aria-selected',String(selected)); $(id).tabIndex = selected ? 0 : -1;
  }
  if (showLog) requestAnimationFrame(()=>{ $('model-log').scrollTop = $('model-log').scrollHeight; });
}
$('animation-tab').addEventListener('click',()=>showConsoleTab('animation'));
$('log-tab').addEventListener('click',()=>showConsoleTab('log'));
document.querySelector('.console-tabs').addEventListener('keydown',event=>{
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const target = event.key === 'Home' ? 'animation' : event.key === 'End' ? 'log' : $('animation-tab').getAttribute('aria-selected') === 'true' ? 'log' : 'animation';
  showConsoleTab(target); $(target === 'log' ? 'log-tab' : 'animation-tab').focus();
});
// Observe submission without duplicating the model request or taking input focus.
$('input-form').addEventListener('submit',()=>{
  if ($('text-input').value.trim()) showConsoleTab('log');
});
new MutationObserver(()=>{
  $('log-tab').classList.toggle('has-activity',$('model-log').dataset.streaming === 'true');
}).observe($('model-log'),{attributes:true,attributeFilter:['data-streaming']});
showConsoleTab('animation');
// Keep the HTML's expanded introduction on startup; fold only on user input.
