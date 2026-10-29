// Receiver-only VDO.Ninja integration. The Windows API owns the current view URL.
(() => {
  const frame = document.getElementById('vcv-live');
  const rail = document.querySelector('.live-rack');
  const state = document.getElementById('vcv-state');
  const placeholder = document.getElementById('vcv-placeholder');
  const audioButton = document.getElementById('vcv-audio');
  const play = document.getElementById('play');
  const external = document.getElementById('vcv-external');
  const dockToggle = document.getElementById('vcv-dock-toggle');
  const introToggle = document.getElementById('intro-dock-toggle');
  const leftColumn = document.querySelector('.left-column');
  const centerColumn = document.querySelector('.center-column');
  const modelLog = document.querySelector('.log-panel');
  const dockContent = document.getElementById('vcv-dock-content');
  function setDockExpanded(expanded) {
    document.body.classList.toggle('is-rtc-expanded',expanded);
    document.body.classList.remove('intro-dock-open');
    rail.classList.toggle('is-minimized',!expanded);
    dockToggle.setAttribute('aria-expanded',String(expanded));
    dockToggle.setAttribute('aria-label',expanded ? 'Minimize WebRTC dock' : 'Expand WebRTC dock');
    dockToggle.querySelector('.dock-arrow').textContent = expanded ? '↘' : '↗';
    dockToggle.querySelector('.dock-tab-label').textContent = expanded ? 'Minimize' : 'VCV / LIVE';
    dockContent.inert = !expanded;
    introToggle.setAttribute('aria-expanded','false');
    introToggle.setAttribute('aria-label','Open introduction dock');
    if (!document.body.classList.contains('workstation')) {
      if (expanded) centerColumn.append(modelLog);
      else leftColumn.append(modelLog);
    }
  }
  dockToggle.addEventListener('click',()=>setDockExpanded(rail.classList.contains('is-minimized')));
  introToggle.addEventListener('click',()=>{
    const open = document.body.classList.toggle('intro-dock-open');
    introToggle.setAttribute('aria-expanded',String(open));
    introToggle.setAttribute('aria-label',open ? 'Close introduction dock' : 'Open introduction dock');
  });
  document.addEventListener('keydown',event=>{
    if (event.key === 'Escape' && document.body.classList.contains('intro-dock-open')) {
      document.body.classList.remove('intro-dock-open');
      introToggle.setAttribute('aria-expanded','false');
      introToggle.setAttribute('aria-label','Open introduction dock');
      introToggle.focus();
    }
  });
  setDockExpanded(false);
  let viewURL, audioEnabled = false, loaded = false, stopped = false, checking = false;
  let statsTimer, statusTimer, startupTimer;
  let pendingResultPlayback = false, resultPlaybackTimer;
  function cancelResultPlayback() {
    pendingResultPlayback = false;
    clearTimeout(resultPlaybackTimer);
  }
  window.addEventListener('amfm:model-stage',event=>{
    const job = event.detail;
    if (job.state === 'submitting') {
      cancelResultPlayback(); pendingResultPlayback = true;
    } else if (job.state === 'failed') {
      cancelResultPlayback();
    } else if (pendingResultPlayback && job.dataReady && ['mapped','osc_sent','completed'].includes(job.state)) {
      pendingResultPlayback = false;
      // Let the returned values paint before the slow layout expansion begins.
      resultPlaybackTimer = setTimeout(()=>setAudio(true),350);
    }
  });
  document.getElementById('new-session').addEventListener('click',cancelResultPlayback);
  function send(data) { if (loaded) frame.contentWindow.postMessage(data,'https://vdo.ninja'); }
  function setState(label, connected = false) {
    state.textContent = label; rail.classList.toggle('stream-connected',connected);
  }
  function audioUI() {
    audioButton.textContent = audioEnabled ? 'Mute' : 'Sound on';
    audioButton.setAttribute('aria-pressed',String(audioEnabled));
    play.textContent = audioEnabled ? 'Pause' : 'Play';
    play.setAttribute('aria-pressed',String(audioEnabled));
    document.getElementById('play-state').textContent = audioEnabled ? '● VCV AUDIO' : '';
  }
  function load() {
    if (!viewURL) return;
    clearTimeout(startupTimer); clearInterval(statsTimer);
    const url = new URL(viewURL);
    url.searchParams.set('iframetarget',location.origin);
    if (!audioEnabled) url.searchParams.set('muted','');
    else url.searchParams.delete('muted');
    frame.src = url.href; loaded = true; stopped = false;
    placeholder.hidden = true; setState('CONNECTING WEBRTC');
    startupTimer = setTimeout(()=>{ if (!rail.classList.contains('stream-connected')) setState('WAITING FOR VIDEO · RECONNECT IF NEEDED'); },20000);
  }
  async function refresh() {
    if (checking) return;
    checking = true;
    try {
      const response = await fetch('/api/machine/status',{cache:'no-store',signal:AbortSignal.timeout(15000)});
      if (!response.ok) throw new Error('Installation unavailable');
      const status = await response.json();
      if (!status.media?.view_url) throw new Error('Windows has no configured viewer');
      const url = new URL(status.media.view_url);
      if (url.origin !== 'https://vdo.ninja' || !url.searchParams.has('view') || url.searchParams.has('push')) throw new Error('Invalid receiver URL');
      const changed = viewURL !== url.href; viewURL = url.href;
      const standalone = new URL(viewURL); standalone.searchParams.delete('cleanviewer'); standalone.searchParams.delete('muted');
      external.href = standalone.href; external.hidden = false;
      const ready = status.vcv?.process_running && status.vcv?.osc_port_listening;
      document.getElementById('vcv-quality').textContent = ready ? 'VCV / OSC 7001 READY' : 'VCV OFFLINE';
      const port = document.querySelector('.port');
      port.textContent = ready ? 'VCV / PORT 7001 ONLINE' : 'VCV / PORT 7001 OFFLINE';
      if (!stopped && (!loaded || changed)) load();
    } catch(error) {
      if (!loaded) { placeholder.hidden = false; placeholder.textContent = 'Windows receiver unavailable. Try Reconnect.'; setState('INSTALLATION UNREACHABLE'); }
      document.getElementById('vcv-quality').textContent = 'STATUS UNAVAILABLE';
    } finally { checking = false; }
  }
  frame.addEventListener('load',()=>{
    if (!loaded) return;
    send({mute:!audioEnabled}); if (audioEnabled) send({volume:1});
    send({getFreshStats:true}); clearInterval(statsTimer);
    statsTimer = setInterval(()=>send({getFreshStats:true}),5000);
  });
  window.addEventListener('message',event=>{
    if (event.origin !== 'https://vdo.ninja' || event.source !== frame.contentWindow || !loaded) return;
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (data.stats && typeof data.stats.total_inbound_connections === 'number') {
      if (data.stats.total_inbound_connections > 0) { clearTimeout(startupTimer); setState('WEBRTC CONNECTED',true); }
      else setState('WAITING FOR WINDOWS STREAM');
    }
    if (data.action === 'guest-connected') { clearTimeout(startupTimer); setState('WEBRTC CONNECTED',true); }
    if (data.action === 'guest-disconnected') setState('STREAM DISCONNECTED · RECONNECT');
  });
  async function setAudio(enabled) {
    setDockExpanded(true);
    audioEnabled = enabled; stopped = false; audioUI();
    if (!loaded) { if (viewURL) load(); else await refresh(); }
    send({mute:!audioEnabled}); if (audioEnabled) send({volume:1});
  }
  function toggleAudio() { return setAudio(!audioEnabled); }
  function close() {
    cancelResultPlayback();
    stopped = true; loaded = false; audioEnabled = false;
    clearInterval(statsTimer); clearTimeout(startupTimer); frame.removeAttribute('src');
    placeholder.hidden = false; placeholder.textContent = 'Stream closed. Press Play or Reconnect.';
    setState('RECEIVER CLOSED'); audioUI();
    setDockExpanded(false);
    const introduction = document.querySelector('.introduction');
    introduction.classList.remove('is-collapsed');
    introduction.querySelectorAll('.intro-fold').forEach(section => { section.inert = false; });
    const foldToggle = document.getElementById('intro-toggle');
    foldToggle.setAttribute('aria-expanded','true');
    foldToggle.setAttribute('aria-label','Collapse introduction');
    foldToggle.title = '收起 Introduction';
    document.getElementById('introduction-content').scrollTop = 0;
    // On phones the introduction lives in a dock even with WebRTC minimized.
    const useIntroDock = window.matchMedia('(max-width:720px)').matches;
    document.body.classList.toggle('intro-dock-open',useIntroDock);
    introToggle.setAttribute('aria-expanded',String(useIntroDock));
    introToggle.setAttribute('aria-label',useIntroDock ? 'Close introduction dock' : 'Open introduction dock');
  }
  audioButton.addEventListener('click',toggleAudio); play.addEventListener('click',toggleAudio);
  document.getElementById('vcv-reconnect').addEventListener('click',async()=>{ stopped=false; if (viewURL) load(); await refresh(); });
  document.getElementById('vcv-expand').addEventListener('click',async()=>{
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await rail.requestFullscreen(); }
    catch { setState('USE OPEN ↗ FOR A LARGER VIEW'); }
  });
  window.vcvMedia = {close,play:()=>setAudio(true)};
  statusTimer = setInterval(refresh,30000); refresh();
  window.addEventListener('pagehide',()=>{cancelResultPlayback();clearInterval(statusTimer);clearInterval(statsTimer);clearTimeout(startupTimer);});
})();
