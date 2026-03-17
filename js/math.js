/* ═══════════════════════════════════════════════
   MATH  (addition / subtraction)
═══════════════════════════════════════════════ */
function openMathLevels(subject){
  S.subject=subject;
  const icon=subject==='addition'?'➕':'➖';
  const name=subject==='addition'?'Addition':'Subtraction';
  document.getElementById('levels-title').textContent=`${icon} ${name} – Pick Level`;
  const grid=document.getElementById('levels-grid');
  grid.innerHTML='';
  MATH_LEVELS[subject].forEach((lvl,i)=>{
    const d=document.createElement('div');
    d.className=`level-card lc${i+1}`;
    d.innerHTML=`<div class="lc-num">L${i+1}</div><div class="lc-desc">${lvl.desc}</div>`;
    d.onclick=()=>startMath(i);
    grid.appendChild(d);
  });
  nav('scr-levels',`${icon} ${name}`);
}
function startMath(levelIdx){
  S.level=levelIdx; S.idx=0; S.score=0;
  S.questions=Array.from({length:10},()=>MATH_LEVELS[S.subject][levelIdx].gen());
  renderMathQ();
  const icon=S.subject==='addition'?'➕':'➖';
  nav('scr-math-game',`${icon} Level ${levelIdx+1}`);
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('g-input').focus()));
}
function renderMathQ(){
  const q=S.questions[S.idx];
  document.getElementById('g-problem').innerHTML=`
    <div class="v-row"><span class="v-op-cell"></span><span class="v-num-cell">${q.a}</span></div>
    <div class="v-row"><span class="v-op-cell">${q.op}</span><span class="v-num-cell">${q.b}</span></div>
    <div class="v-divider"></div>`;
  document.getElementById('g-input').value='';
  document.getElementById('g-input').className='answer-input';
  document.getElementById('g-msg').textContent='';
  document.getElementById('g-msg').className='message';
  document.getElementById('g-progress').textContent=`${S.idx+1}/10`;
  document.getElementById('g-score').textContent=`⭐ ${S.score}`;
  document.getElementById('g-bar').style.width=`${(S.idx/10)*100}%`;
}
function checkMath(){
  const inp=document.getElementById('g-input');
  const val=parseInt(inp.value,10);
  if(inp.value===''||isNaN(val)){inp.focus();return;}
  const q=S.questions[S.idx];
  const msg=document.getElementById('g-msg');
  inp.disabled=true;
  if(val===q.ans){
    S.score++; playSound('ok'); addPoints(10);
    inp.className='answer-input';
    msg.className='message correct';
    msg.textContent=OK_MSGS[ri(0,OK_MSGS.length-1)];
    spawnConfetti(12);
    setTimeout(()=>{inp.disabled=false;S.idx++;if(S.idx>=10)showScore();else{renderMathQ();inp.focus();}},900);
  } else {
    playSound('bad');
    inp.className='answer-input shake';
    msg.className='message wrong';
    msg.textContent=`❌ Answer: ${q.a} ${q.op} ${q.b} = ${q.ans}`;
    setTimeout(()=>{inp.disabled=false;S.idx++;if(S.idx>=10)showScore();else{renderMathQ();inp.focus();}},1400);
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('g-input').addEventListener('keydown',e=>{if(e.key==='Enter')checkMath();});
});
