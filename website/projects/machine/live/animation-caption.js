// Our text → interpretation → VADC narrative, independent of the demo model's tour.
(() => {
  const view = document.querySelector('.animation-view');
  const caption = document.createElement('section');
  caption.className = 'amfm-caption';
  caption.setAttribute('aria-label','Text to VADC workflow');
  const heading = document.createElement('div'); heading.className = 'amfm-caption-heading';
  const stage = document.createElement('strong');
  const source = document.createElement('span'); source.className = 'caption-source';
  heading.append(stage,source);
  const text = document.createElement('p');
  const vector = document.createElement('div'); vector.className = 'caption-vadc';
  caption.append(heading,text,vector); view.append(caption);
  const idleSteps = [
    ['01 / TEXT INPUT','A sentence enters the machine. Its meaning must be interpreted before it can become sound.'],
    ['02 / INTERPRETATION','The model interprets the emotional tone of the text. Ambiguity and context can change how the same words are understood.'],
    ['03 / VADC','The interpretation becomes four values: Valence, Arousal, Dominance and Confidence, each between 0 and 1.'],
    ['04 / SOUND MAPPING','The Windows backend maps VADC to eight control voltages and sends them to VCV Rack. The words are reconstructed as sound.']
  ];
  let idleIndex = 0, live = false, inputText = '', lastReasoning = '', lastVector = null;
  function render(title,body,mode,vadc = null) {
    const changed = stage.textContent !== title;
    stage.textContent = title; source.textContent = mode;
    text.textContent = body;
    vector.replaceChildren();
    if (vadc) for (const key of ['valence','arousal','dominance','confidence']) {
      const cell = document.createElement('span');
      const number = vadc[key];
      cell.textContent = key[0].toUpperCase() + ' ' + (typeof number === 'number' ? number.toFixed(2) : '—');
      vector.append(cell);
    }
    vector.hidden = !vadc;
    if (changed) {
      text.scrollTop = 0;
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) caption.animate([{opacity:.45,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
    }
  }
  function showIdle() { const [title,body] = idleSteps[idleIndex]; render(title,body,'WORKFLOW'); }
  function reset() { live = false; idleIndex = 0; inputText = ''; lastReasoning = ''; lastVector = null; showIdle(); }
  window.addEventListener('amfm:model-stage',event=>{
    const job = event.detail; live = true;
    if (job.state === 'submitting') {
      inputText = job.text || ''; lastReasoning = ''; lastVector = null;
      render('01 / TEXT INPUT','“'+inputText+'”','YOUR INPUT'); return;
    }
    if (job.reasoning) lastReasoning = job.reasoning;
    if (job.vadc) lastVector = job.vadc;
    switch (job.state) {
      case 'queued': render('01 / QUEUED','Your text is waiting in the shared installation queue. The model has not returned an interpretation yet.','BACKEND'); break;
      case 'interpreting': render('02 / INTERPRETATION','The model is interpreting the emotional tone of “'+inputText+'” and preparing its VADC response.','LIVE MODEL'); break;
      case 'mapped': render('03 / TEXT → VADC',lastReasoning || 'The model returned VADC. The backend has mapped the four values to control voltages.','MODEL OUTPUT',lastVector); break;
      case 'osc_sent': render('04 / VADC → SOUND',lastReasoning || 'The mapped control voltages have been sent to VCV Rack.','BACKEND OUTPUT',lastVector); break;
      case 'completed': render('04 / INTERPRETATION → VADC',lastReasoning || 'The model interpretation has been converted to VADC and mapped to sound parameters.','MODEL OUTPUT',lastVector); break;
      case 'failed': render('MODEL REQUEST FAILED',job.error?.message || 'The model could not complete this request. No simulated VADC was substituted.','BACKEND ERROR'); break;
    }
  });
  document.getElementById('new-session').addEventListener('click',reset);
  document.getElementById('close').addEventListener('click',()=>{live=true;render('SESSION CLOSED','Monitoring is stopped. Start a new session to interpret another piece of text.','IDLE');});
  showIdle();
  const timer = setInterval(()=>{
    if (live || document.hidden || document.querySelector('.process').hidden) return;
    idleIndex = (idleIndex+1)%idleSteps.length; showIdle();
  },6500);
  window.addEventListener('pagehide',()=>clearInterval(timer));
})();
