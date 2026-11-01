'use strict';
const tracks = [
  {title: 'i should say i enjoy this existential crisis', file: 'media/existential-crisis.m4a', duration: 233.74},
  {title: 'break', file: 'media/break.m4a', duration: 115.17},
  {title: 'get lost', file: 'media/get-lost.m4a', duration: 208.99},
  {title: 'well, farewell', file: 'media/well-farewell.m4a', duration: 249.06}
];
const audio = document.querySelector('#audio');
const toggle = document.querySelector('#toggle');
const seek = document.querySelector('#seek');
const status = document.querySelector('#status');
let current = -1;
let playRequest = 0;
const format = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const list = document.querySelector('#track-list');
tracks.forEach((track, i) => {
  const row = document.createElement('li');
  row.className = 'track';
  const button = document.createElement('button');
  button.setAttribute('aria-label', `Play ${track.title}`);
  const number = document.createElement('span'); number.className = 'track-no'; number.textContent = String(i + 1).padStart(2, '0');
  const title = document.createElement('span'); title.className = 'track-name'; title.textContent = track.title;
  const time = document.createElement('span'); time.className = 'track-time'; time.textContent = format(Math.round(track.duration));
  button.append(number, title, time); row.append(button); list.append(row);
  button.addEventListener('click', () => { if (current === i) togglePlayback(); else select(i); });
});
function sync() {
  const playing = !audio.paused && !audio.ended;
  toggle.textContent = playing ? 'Ⅱ' : '▶';
  toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  document.querySelector('#player-kicker').textContent = current < 0 ? 'READY TO LISTEN' : playing ? 'NOW PLAYING / REX LI' : 'PAUSED / REX LI';
  [...list.children].forEach((row, i) => {
    row.classList.toggle('selected', i === current);
    row.querySelector('.track-no').textContent = i === current && playing ? 'Ⅱ' : String(i + 1).padStart(2, '0');
    row.querySelector('button').setAttribute('aria-label', `${i === current && playing ? 'Pause' : 'Play'} ${tracks[i].title}`);
    if (i === current) row.querySelector('button').setAttribute('aria-current', 'true');
    else row.querySelector('button').removeAttribute('aria-current');
  });
}
async function play() {
  const request = ++playRequest;
  try { await audio.play(); if (request === playRequest) status.textContent = `Playing ${tracks[current].title}`; }
  catch (error) { if (request === playRequest && error.name !== 'AbortError') { status.textContent = 'Playback could not start. Press play to retry.'; document.querySelector('#player-kicker').textContent = 'PLAYBACK UNAVAILABLE — RETRY'; } }
}
function select(index, autoplay = true) {
  current = (index + tracks.length) % tracks.length;
  audio.src = tracks[current].file;
  document.querySelector('#current-title').textContent = tracks[current].title;
  document.querySelector('#elapsed').textContent = '0:00';
  document.querySelector('#duration').textContent = format(Math.round(tracks[current].duration));
  seek.value = 0; seek.disabled = true;
  sync(); if (autoplay) play();
}
function togglePlayback() { if (current < 0) select(0); else if (audio.paused) play(); else { ++playRequest; audio.pause(); } }
toggle.addEventListener('click', togglePlayback);
document.querySelector('#play-all').addEventListener('click', () => select(0));
document.querySelector('#previous').addEventListener('click', () => { if (audio.currentTime > 3) audio.currentTime = 0; else select(current < 0 ? 0 : current - 1); });
document.querySelector('#next').addEventListener('click', () => select(current < 0 ? 0 : current + 1));
audio.addEventListener('play', sync); audio.addEventListener('pause', sync);
audio.addEventListener('loadedmetadata', () => { seek.disabled = !Number.isFinite(audio.duration); if (Number.isFinite(audio.duration)) document.querySelector('#duration').textContent = format(Math.round(audio.duration)); });
audio.addEventListener('timeupdate', () => { document.querySelector('#elapsed').textContent = format(audio.currentTime); if (Number.isFinite(audio.duration) && audio.duration > 0) seek.value = audio.currentTime / audio.duration * 100; });
seek.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value) / 100 * audio.duration; });
audio.addEventListener('ended', () => { if (current < tracks.length - 1) select(current + 1); else { sync(); document.querySelector('#player-kicker').textContent = 'END OF RECORDINGS'; status.textContent = 'All four recordings have finished.'; } });
audio.addEventListener('error', () => { status.textContent = 'This recording could not be loaded. Please try another track.'; document.querySelector('#player-kicker').textContent = 'RECORDING UNAVAILABLE'; });
document.querySelector('#mute').addEventListener('click', event => { audio.muted = !audio.muted; event.currentTarget.textContent = audio.muted ? '×' : '♪'; event.currentTarget.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute'); event.currentTarget.setAttribute('aria-pressed', String(audio.muted)); });
document.addEventListener('keydown', event => { if (event.code === 'Space' && !event.repeat && !['INPUT','BUTTON','A','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); togglePlayback(); } });
