/* ═══════════════════════════════════════════════
   SKIP COUNTING
═══════════════════════════════════════════════ */
let skipAns=0;

function openSkipLevels(){
  document.getElementById('levels-title').textContent='🔢 Skip Counting – Pick Level';
  const grid=document.getElementById('levels-grid');
  grid.innerHTML='';
  SKIP_LEVELS.forEach((lvl,i)=>{
    const d=document.createElement('div');
    d.className=`level-card lc${i+1}`;
    d.innerHTML=`<div class="lc-num">L${i+1}</div><div class="lc-desc">${lvl.desc}</div>`;
    d.onclick=()=>startSkip(i);
    grid.appendChild(d);
  });
  nav('scr-levels','🔢 Skip Counting');
}
function startSkip(levelIdx){
  S.subject='skip'; S.level=levelIdx; S.idx=0; S.score=0;
  nav('scr-skip',`🔢 Skip Count L${levelIdx+1}`);
  newSkipQ();
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('skip-input').focus()));
}
function newSkipQ(){
  const step=SKIP_LEVELS[S.level].step;
  const start=ri(1,8)*step;
  const seq=[start,start+step,start+2*step,start+3*step,start+4*step];
  const blankPos=ri(1,3);
  skipAns=seq[blankPos];

  document.getElementById('skip-badge').textContent=`Count by ${step}s`;
  document.getElementById('skip-progress').textContent=`${S.idx+1}/10`;
  document.getElementById('skip-score').textContent=`⭐ ${S.score}`;
  document.getElementById('skip-bar').style.width=`${(S.idx/10)*100}%`;
  document.getElementById('skip-msg').textContent='';
  document.getElementById('skip-msg').className='message';
  document.getElementById('skip-input').value='';
  document.getElementById('skip-input').className='answer-input';

  const container=document.getElementById('skip-seq');
  container.innerHTML='';
  seq.forEach((n,i)=>{
    if(i>0){const a=document.createElement('div');a.className='skip-arrow';a.textContent='→';container.appendChild(a);}
    if(i===blankPos){
      const inp=document.getElementById('skip-input');
      inp.style.display='inline-block';
      container.appendChild(inp);
    } else {
      const d=document.createElement('div');d.className='skip-num';d.textContent=n;container.appendChild(d);
    }
  });
  document.getElementById('skip-input').focus();
}
function checkSkip(){
  const inp=document.getElementById('skip-input');
  const val=parseInt(inp.value,10);
  if(inp.value===''||isNaN(val)){inp.focus();return;}
  const msg=document.getElementById('skip-msg');
  inp.disabled=true;
  if(val===skipAns){
    S.score++; playSound('ok'); addPoints(10); spawnConfetti(12);
    msg.className='message correct'; msg.textContent=OK_MSGS[ri(0,OK_MSGS.length-1)];
    setTimeout(()=>{inp.disabled=false;S.idx++;if(S.idx>=10)showScore();else{newSkipQ();}},900);
  } else {
    playSound('bad');
    inp.className='answer-input shake';
    msg.className='message wrong'; msg.textContent=`❌ Answer: ${skipAns}`;
    setTimeout(()=>{inp.disabled=false;S.idx++;if(S.idx>=10)showScore();else{newSkipQ();}},1400);
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('skip-input').addEventListener('keydown',e=>{if(e.key==='Enter')checkSkip();});
});
