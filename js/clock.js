/* ═══════════════════════════════════════════════
   TELLING TIME
═══════════════════════════════════════════════ */
let clkCorrectTime='';

function openClockLevels(){
  document.getElementById('levels-title').textContent='🕐 Tell Time – Pick Level';
  const grid=document.getElementById('levels-grid');
  grid.innerHTML='';
  CLK_LEVELS.forEach((lvl,i)=>{
    const d=document.createElement('div');
    d.className=`level-card lc${i+1}`;
    d.innerHTML=`<div class="lc-num">L${i+1}</div><div class="lc-desc">${lvl.desc}</div>`;
    d.onclick=()=>startClock(i);
    grid.appendChild(d);
  });
  nav('scr-levels','🕐 Tell Time');
}
function startClock(levelIdx){
  S.subject='clock'; S.level=levelIdx; S.idx=0; S.score=0;
  nav('scr-clock',`🕐 Tell Time L${levelIdx+1}`);
  newClockQ();
}
function fmtTime(h,m){ return `${h}:${m.toString().padStart(2,'0')}`; }
function newClockQ(){
  const mins=CLK_LEVELS[S.level].minutes;
  const h=ri(1,12), m=mins[ri(0,mins.length-1)];
  clkCorrectTime=fmtTime(h,m);
  drawClock(h,m);

  document.getElementById('clk-progress').textContent=`${S.idx+1}/10`;
  document.getElementById('clk-score').textContent=`⭐ ${S.score}`;
  document.getElementById('clk-bar').style.width=`${(S.idx/10)*100}%`;
  document.getElementById('clk-msg').textContent='';
  document.getElementById('clk-msg').className='message';

  const allMins=CLK_LEVELS[S.level].minutes;
  const wrongs=new Set();
  while(wrongs.size<3){
    const wh=ri(1,12),wm=allMins[ri(0,allMins.length-1)];
    const ws=fmtTime(wh,wm);
    if(ws!==clkCorrectTime) wrongs.add(ws);
  }
  const choices=shuffle([clkCorrectTime,...wrongs]);
  const cont=document.getElementById('clock-choices');
  cont.innerHTML='';
  choices.forEach(t=>{
    const b=document.createElement('button');
    b.className='clock-choice'; b.textContent=t;
    b.onclick=()=>checkClock(t,b);
    cont.appendChild(b);
  });
}
function checkClock(chosen,btn){
  document.querySelectorAll('.clock-choice').forEach(b=>b.onclick=null);
  const msg=document.getElementById('clk-msg');
  if(chosen===clkCorrectTime){
    S.score++; playSound('ok'); addPoints(10); spawnConfetti(12);
    btn.className='clock-choice correct-ans';
    msg.className='message correct'; msg.textContent=OK_MSGS[ri(0,OK_MSGS.length-1)];
  } else {
    playSound('bad');
    btn.className='clock-choice wrong-ans';
    document.querySelectorAll('.clock-choice').forEach(b=>{if(b.textContent===clkCorrectTime)b.className='clock-choice correct-ans';});
    msg.className='message wrong'; msg.textContent=`❌ It was ${clkCorrectTime}`;
  }
  setTimeout(()=>{S.idx++;if(S.idx>=10)showScore();else newClockQ();},1500);
}
function drawClock(h,m){
  const cx=100,cy=100,r=88;
  function rad(deg){return deg*Math.PI/180;}
  const mAngle=(m/60)*360-90;
  const hAngle=((h%12)/12)*360+(m/60)*30-90;
  function pt(angle,len){return{x:cx+len*Math.cos(rad(angle)),y:cy+len*Math.sin(rad(angle))};}
  const mEnd=pt(mAngle,72), hEnd=pt(hAngle,50);
  const nums=[12,1,2,3,4,5,6,7,8,9,10,11];
  const marks=Array.from({length:12},(_,i)=>{
    const a=(i/12)*360-90;
    const p1=pt(a,76),p2=pt(a,r-4);
    return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#ccc" stroke-width="2"/>`;
  }).join('');
  const labels=nums.map((n,i)=>{
    const a=(i/12)*360-90; const p=pt(a,64);
    return `<text x="${p.x}" y="${p.y+6}" text-anchor="middle" font-size="14" font-weight="bold" fill="#333" font-family="'Baloo 2',sans-serif">${n}</text>`;
  }).join('');
  document.getElementById('clock-svg').innerHTML=`
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#667eea" stroke-width="5"/>
    ${marks}${labels}
    <line x1="${cx}" y1="${cy}" x2="${hEnd.x}" y2="${hEnd.y}" stroke="#333" stroke-width="7" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mEnd.x}" y2="${mEnd.y}" stroke="#667eea" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="#764ba2"/>`;
}
