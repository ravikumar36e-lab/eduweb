/* ═══════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════ */
function ri(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function uniqueNums(n,min,max){ const s=new Set(); while(s.size<n) s.add(ri(min,max)); return [...s]; }

/* ═══════════════════════════════════════════════
   SPEECH
═══════════════════════════════════════════════ */
function say(text){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.rate=0.75; u.pitch=1.2; window.speechSynthesis.speak(u);
}

/* ═══════════════════════════════════════════════
   SOUND  (Web Audio API)
═══════════════════════════════════════════════ */
let _ac=null;
function ac(){return _ac||(_ac=new(window.AudioContext||window.webkitAudioContext)());}
function tone(f,t,d,type='sine',v=0.3){
  try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=f;o.type=type;g.gain.setValueAtTime(v,c.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+t+d);o.start(c.currentTime+t);o.stop(c.currentTime+t+d+.01);}catch(e){}
}
function playSound(type){
  try{
    if(type==='ok')[[523,.00],[659,.12],[784,.24],[1047,.36]].forEach(([f,t])=>tone(f,t,.22));
    else if(type==='bad'){tone(330,.00,.18,'sawtooth',.2);tone(247,.20,.30,'sawtooth',.18);}
    else if(type==='levelDone')[[523,.00],[659,.10],[784,.20],[659,.30],[784,.42],[1047,.54],[1047,.70]].forEach(([f,t])=>tone(f,t,.16,'sine',.32));
  }catch(e){}
}

/* ═══════════════════════════════════════════════
   POINTS
═══════════════════════════════════════════════ */
let totalPoints = JSON.parse(localStorage.getItem('lp_points')) || 0;
let _correctCount = 0;
const BOOST_MSGS = ['Awesome','Splendid','Wonderful','Brilliant','Fantastic','Amazing','Outstanding','Superb'];

function updatePointsDisplay(){
  document.getElementById('points-badge').textContent = `⭐ ${totalPoints} pts`;
}
function addPoints(n){
  totalPoints += n;
  _correctCount++;
  localStorage.setItem('lp_points', JSON.stringify(totalPoints));
  const badge = document.getElementById('points-badge');
  badge.textContent = `⭐ ${totalPoints} pts`;
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
  // Boost every 3 correct answers
  if (_correctCount % 3 === 0) {
    const name = localStorage.getItem('lp_name') || 'Superstar';
    const msg = BOOST_MSGS[ri(0, BOOST_MSGS.length - 1)];
    showBoost(`${msg}, ${name}! 🌟`);
  }
}
function showBoost(text){
  const el = document.getElementById('boost-toast');
  el.textContent = text;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
function resetPoints(){
  if (!confirm('Reset all points to 0?')) return;
  totalPoints = 0; _correctCount = 0;
  localStorage.setItem('lp_points', '0');
  updatePointsDisplay();
}

/* ═══════════════════════════════════════════════
   CONFETTI
═══════════════════════════════════════════════ */
function spawnConfetti(n=20){
  const box=document.getElementById('celebration'); box.style.display='block';
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='confetti';
    c.style.cssText=`left:${Math.random()*100}vw;width:${8+Math.random()*10}px;height:${8+Math.random()*10}px;background:${CC[Math.floor(Math.random()*CC.length)]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s;border-radius:${Math.random()>.5?'50%':'3px'};`;
    box.appendChild(c);
  }
  setTimeout(()=>{box.style.display='none';box.innerHTML='';},4000);
}
