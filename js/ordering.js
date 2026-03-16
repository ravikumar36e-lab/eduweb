/* ═══════════════════════════════════════════════
   NUMBER ORDERING
═══════════════════════════════════════════════ */
let ordNums=[], ordChosen=[];

function openOrderLevels(){
  document.getElementById('levels-title').textContent='📊 Ordering – Pick Level';
  const grid=document.getElementById('levels-grid');
  grid.innerHTML='';
  ORD_LEVELS.forEach((lvl,i)=>{
    const d=document.createElement('div');
    d.className=`level-card lc${i+1}`;
    d.innerHTML=`<div class="lc-num">L${i+1}</div><div class="lc-desc">${lvl.desc}</div>`;
    d.onclick=()=>startOrdering(i);
    grid.appendChild(d);
  });
  nav('scr-levels','📊 Ordering');
}
function startOrdering(levelIdx){
  S.subject='ordering'; S.level=levelIdx; S.idx=0; S.score=0;
  nav('scr-ordering',`📊 Ordering L${levelIdx+1}`);
  newOrderQ();
}
function newOrderQ(){
  const max=ORD_LEVELS[S.level].max;
  ordNums=shuffle(uniqueNums(5,1,max));
  ordChosen=[];
  renderOrderQ();
}
function renderOrderQ(){
  document.getElementById('ord-progress').textContent=`${S.idx+1}/10`;
  document.getElementById('ord-score').textContent=`⭐ ${S.score}`;
  document.getElementById('ord-bar').style.width=`${(S.idx/10)*100}%`;
  document.getElementById('ord-msg').textContent='';
  document.getElementById('ord-msg').className='message';

  const slots=document.getElementById('ord-slots');
  slots.innerHTML='';
  for(let i=0;i<5;i++){
    const s=document.createElement('div');
    s.className='ord-slot'+(ordChosen[i]!==undefined?' filled':'');
    s.textContent=ordChosen[i]!==undefined?ordChosen[i]:'';
    slots.appendChild(s);
  }
  const tiles=document.getElementById('ord-tiles');
  tiles.innerHTML='';
  ordNums.forEach((n,i)=>{
    const t=document.createElement('div');
    t.className='ord-tile'+(ordChosen.includes(n)?' used':'');
    t.textContent=n;
    if(!ordChosen.includes(n)) t.onclick=()=>ordTap(n);
    tiles.appendChild(t);
  });
}
function ordTap(n){
  if(ordChosen.includes(n)) return;
  ordChosen.push(n);
  renderOrderQ();
  if(ordChosen.length===5){
    const sorted=[...ordNums].sort((a,b)=>a-b);
    const correct=ordChosen.every((v,i)=>v===sorted[i]);
    const msg=document.getElementById('ord-msg');
    if(correct){
      S.score++; playSound('ok'); addPoints(10); spawnConfetti(12);
      msg.className='message correct';
      msg.textContent=OK_MSGS[ri(0,OK_MSGS.length-1)];
    } else {
      playSound('bad');
      msg.className='message wrong';
      msg.textContent=`❌ Order: ${sorted.join(' → ')}`;
    }
    setTimeout(()=>{S.idx++;if(S.idx>=10)showScore();else newOrderQ();},1400);
  }
}
function ordUndo(){
  if(ordChosen.length===0) return;
  ordChosen.pop();
  renderOrderQ();
}
