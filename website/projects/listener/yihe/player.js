(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const tracks = { original: $('original'), vcv: $('vcv') };
  const copy = {
    en: {
      about:'About this recording',location:'Nanjing · 24 October 2026',begin:'Begin listening',play:'Play',pause:'Pause',original:'Original',vcv:'VCV',volume:'Volume',close:'Close',
      ready:'Start with the original sound. Switch whenever you are ready.',
      originalPlaying:'Listening to the original recording.',vcvPlaying:'Listening to the VCV recording.',paused:'Paused.',loading:'Loading the recording…',error:'The recording could not play. Press Play to try again.',
      aboutTitle:'Listening becomes remembering.',concept:'The patch does not retain every sound. It captures selected fragments and repeats them. Listening here explores how a place can remain with us through a few sounds.',
      imageLabel:'Image',imageNote:'A 31-second time-lapse of Yihe Road, recorded on 24 October 2026. It loops silently and stays unchanged when the sound switches.',
      originalLabel:'Original sound',originalNote:'The audio track extracted from the Yihe Road field screen recording.',
      vcvLabel:'VCV sound',vcvNote:'The recorded audio referenced by the Yihe Road Ableton project. The browser plays this recording; it does not run the patch.',
      listeningLabel:'Listening',listeningNote:'Switching matches elapsed time in both recordings, with a short crossfade. If the target recording is shorter, the position is limited to its end. The time-lapse is independent of the audio timeline.',
      changeLabel:'The progress line',changeNote:'Its shape shows estimated acoustic change relative to earlier material, calculated offline from each recording. Peaks suggest places to listen again; they do not confirm a new sound source or a new sample being recorded.',
      changeHint:'Relative sound change · click or drag to listen',
      authorNote:"The place description is reserved for the author's own writing."
    },
    zh: {
      about:'关于这次录音',location:'南京 · 2026年10月24日',begin:'开始聆听',play:'播放',pause:'暂停',original:'原声',vcv:'VCV',volume:'音量',close:'关闭',
      ready:'先听现场原声，准备好后再切换。',originalPlaying:'正在聆听现场原声。',vcvPlaying:'正在聆听 VCV 录音。',paused:'已暂停。',loading:'正在加载录音……',error:'录音暂时无法播放，请点击播放重试。',
      aboutTitle:'聆听逐渐成为回忆。',concept:'Patch 并不保留所有声音。它选择性地捕捉片段，并让它们重复。通过这里的聆听，探索一个地方如何以几种声音留在记忆中。',
      imageLabel:'影像',imageNote:'2026年10月24日在颐和路拍摄的约31秒延时摄影。影像静音循环，切换声音时保持不变。',
      originalLabel:'原声',originalNote:'从颐和路现场屏幕录制中提取的音轨。',
      vcvLabel:'VCV 声音',vcvNote:'颐和路 Ableton 工程引用的录音文件。网页播放已有录音，不在浏览器中运行 patch。',
      listeningLabel:'聆听方式',listeningNote:'切换时两份录音按相同秒数对齐，并短暂交叉淡化；超过目标录音长度时定位到其末尾。延时摄影独立循环，不与声音时间线同步。',
      changeLabel:'进度线的起伏',changeNote:'起伏由每份实际录音离线分析生成，表示声音相对此前材料的声学变化程度。峰值提示值得回听的位置，不代表已确认新声源出现，也不代表 patch 刚刚录入了新采样。',
      changeHint:'相对声音变化 · 点击或拖动回听',
      authorNote:'地点文字留给作者亲自书写。'
    }
  };
  let lang='en', mode='original', started=false, playing=false, busy=false, message='ready';
  let context, gains, master, stopTimer, transition=0;
  let curveMode, seeking=false;
  const t = key => copy[lang][key];
  function render() {
    document.documentElement.lang = lang==='en'?'en':'zh-CN';
    document.querySelectorAll('[data-text]').forEach(el => {el.textContent=t(el.dataset.text);});
    $('placeName').textContent=window.PLACE.name[lang];
    $('description').textContent=window.PLACE.description[lang];
    $('description').hidden=!window.PLACE.description[lang];
    $('language').textContent=lang==='en'?'中文':'EN';
    $('language').lang=lang==='en'?'zh-CN':'en';
    $('play').textContent=t(!started?'begin':playing?'pause':'play');
    $('play').disabled=busy;
    for (const key of Object.keys(tracks)) {
      $(key+'Button').setAttribute('aria-pressed',String(mode===key));
      $(key+'Button').disabled=busy || (!started && key==='vcv');
    }
    $('status').textContent=t(message);
    $('volume').setAttribute('aria-label',t('volume'));
    $('seek').setAttribute('aria-label',lang==='en'?'Playback position':'播放进度');
    $('changeTimeline').title=t('changeHint');
    updateTime();
  }
  function setup() {
    if(context)return;
    context=new (window.AudioContext||window.webkitAudioContext)();
    master=context.createGain();master.gain.value=Number($('volume').value)/100;master.connect(context.destination);
    gains={};
    for (const key of Object.keys(tracks)) {
      const source=context.createMediaElementSource(tracks[key]);
      gains[key]=context.createGain();gains[key].gain.value=key===mode?1:0;
      source.connect(gains[key]).connect(master);
    }
  }
  function settle() {
    clearTimeout(stopTimer);transition++;
    if (!context)return;
    for(const key of Object.keys(tracks)) {
      gains[key].gain.cancelScheduledValues(context.currentTime);
      gains[key].gain.setValueAtTime(key===mode?1:0,context.currentTime);
      if(key!==mode)tracks[key].pause();
    }
  }
  async function togglePlay() {
    if(busy)return;
    if(playing) {
      settle();Object.values(tracks).forEach(a=>a.pause());playing=false;message='paused';render();return;
    }
    busy=true;message='loading';render();
    try {
      setup();await context.resume();settle();await tracks[mode].play();
      started=true;playing=true;message=mode+'Playing';
    } catch(error) {playing=false;message='error';}
    finally {busy=false;render();}
  }
  async function switchTo(next) {
    if(!started||busy||next===mode)return;
    const previous=mode, target=tracks[next];
    busy=true;message='loading';render();
    try {
      if(target.readyState<1) {
        await new Promise((resolve,reject)=>{
          const cleanup=()=>{clearTimeout(timeout);target.removeEventListener('loadedmetadata',ready);target.removeEventListener('error',failed);};
          const ready=()=>{cleanup();resolve();};
          const failed=()=>{cleanup();reject(new Error('Audio metadata unavailable'));};
          const timeout=setTimeout(failed,12000);
          target.addEventListener('loadedmetadata',ready,{once:true});
          target.addEventListener('error',failed,{once:true});
          target.load();
        });
      }
      if(!Number.isFinite(target.duration))throw new Error('Audio duration unavailable');
      if(playing)await context.resume();
      // Match elapsed seconds, never percentages or the other track's old cursor.
      const position=Math.min(tracks[previous].currentTime,Math.max(0,target.duration-.05));
      target.currentTime=position;
      if(tracks[previous].currentTime>target.duration-.05)tracks[previous].currentTime=position;
      if(!playing){mode=next;settle();message='paused';return;}
      await target.play();
      // Compensate for time spent waiting for the target to become playable.
      const aligned=Math.min(tracks[previous].currentTime,Math.max(0,target.duration-.05));
      if(Math.abs(target.currentTime-aligned)>.08)target.currentTime=aligned;
      clearTimeout(stopTimer);const ticket=++transition;
      const now=context.currentTime;
      const fadeSeconds=Math.min(1.2,Math.max(.02,target.duration-target.currentTime-.02));
      for(const key of Object.keys(tracks)) {
        const param=gains[key].gain;
        if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(now);
        else {const value=param.value;param.cancelScheduledValues(now);param.setValueAtTime(value,now);}
        param.linearRampToValueAtTime(key===next?1:0,now+fadeSeconds);
      }
      mode=next;message=mode+'Playing';
      stopTimer=setTimeout(()=>{if(ticket===transition)tracks[previous].pause();},fadeSeconds*1000);
    } catch(error) {target.pause();message='error';}
    finally {busy=false;render();}
  }
  function clock(seconds) {
    if(!Number.isFinite(seconds))return '—:—';
    return Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0');
  }
  function drawCurve() {
    if(curveMode===mode)return;
    curveMode=mode;
    const analysis=window.AUDIO_CHANGE?.tracks[mode];
    const values=analysis?.values || [0,0];
    const duration=analysis?.duration || 1;
    const points=values.map((value,i)=>[Math.min(1000,1000*i/duration),2+15*value]);
    points.push([1000,points[points.length-1][1]]);
    const path='M '+points.map(([x,a])=>`${x.toFixed(2)},${(20-a).toFixed(2)}`).join(' L ')+
      ' L '+points.slice().reverse().map(([x,a])=>`${x.toFixed(2)},${(20+a).toFixed(2)}`).join(' L ')+' Z';
    $('changeShape').setAttribute('d',path);$('playedShape').setAttribute('d',path);
  }
  function updateCurveProgress(ratio) {
    ratio=Math.max(0,Math.min(1,ratio));
    $('playedRect').setAttribute('width',String(1000*ratio));
    $('playhead').style.left=(ratio*100)+'%';
  }
  function updateTime() {
    drawCurve();
    const a=tracks[mode];$('elapsed').textContent=clock(a.currentTime);$('duration').textContent=clock(a.duration);
    $('seek').disabled=busy||!started||!Number.isFinite(a.duration);
    if(!seeking)$('seek').value=Number.isFinite(a.duration)?1000*a.currentTime/a.duration:0;
    updateCurveProgress(Number($('seek').value)/1000);
    $('seek').setAttribute('aria-valuetext',clock(a.currentTime)+' / '+clock(a.duration));
  }
  $('play').onclick=togglePlay;
  $('originalButton').onclick=()=>switchTo('original');$('vcvButton').onclick=()=>switchTo('vcv');
  $('volume').oninput=()=>{if(master)master.gain.setTargetAtTime(Number($('volume').value)/100,context.currentTime,.03);};
  $('seek').oninput=()=>{const a=tracks[mode];if(Number.isFinite(a.duration)){a.currentTime=a.duration*Number($('seek').value)/1000;$('elapsed').textContent=clock(a.currentTime);updateCurveProgress(Number($('seek').value)/1000);}};
  $('seek').addEventListener('pointerdown',()=>{seeking=true;});
  $('seek').addEventListener('keydown',()=>{seeking=true;});
  $('seek').addEventListener('keyup',()=>{seeking=false;updateTime();});
  $('seek').addEventListener('blur',()=>{seeking=false;updateTime();});
  document.addEventListener('pointerup',()=>{if(seeking){seeking=false;updateTime();}});
  document.addEventListener('pointercancel',()=>{seeking=false;updateTime();});
  Object.entries(tracks).forEach(([key,a])=>{
    a.addEventListener('timeupdate',()=>{if(key===mode)updateTime();});
    a.addEventListener('loadedmetadata',updateTime);
    a.addEventListener('waiting',()=>{if(key===mode&&playing){message='loading';render();}});
    a.addEventListener('playing',()=>{if(key===mode&&playing){message=mode+'Playing';render();}});
    a.addEventListener('error',()=>{if(key===mode){playing=false;message='error';Object.values(tracks).forEach(track=>track.pause());render();}});
  });
  $('language').onclick=()=>{lang=lang==='en'?'zh':'en';render();};
  $('aboutButton').onclick=()=>$('about').showModal();
  $('closeAbout').onclick=()=>$('about').close();
  $('about').addEventListener('click',e=>{if(e.target===$('about')){const r=$('about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('about').close();}});
  document.addEventListener('keydown',e=>{
    if(e.code!=='Space'||e.altKey||e.ctrlKey||e.metaKey||$('about').open)return;
    const target=e.target;
    // Preserve typing and the native activation of unrelated page buttons.
    if(target.isContentEditable||target.closest('textarea,select,[contenteditable="true"]')||
      (target.tagName==='INPUT'&&target.type!=='range')||
      target.closest('#aboutButton,#language'))return;
    // Prevent native button clicks / page scrolling, including held-key repeats.
    e.preventDefault();
    if(!e.repeat)togglePlay();
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)$('background').play().catch(()=>{});});
  $('background').play().catch(()=>{});
  render();
})();
