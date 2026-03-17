/* ═══════════════════════════════════════════════
   MISSING LETTER
═══════════════════════════════════════════════ */
function startMissing(){
  S.subject='missing'; S.idx=0; S.score=0;
  const pool=shuffle([...ML_DATA]);
  S.questions=pool.slice(0,10);
  renderMissing();
  nav('scr-missing','🔡 Missing Letter');
}
function renderMissing(){
  const q=S.questions[S.idx];
  document.getElementById('ml-emoji').textContent=q.e;
  document.getElementById('ml-progress').textContent=`${S.idx+1}/10`;
  document.getElementById('ml-score').textContent=`⭐ ${S.score}`;
  document.getElementById('ml-bar').style.width=`${(S.idx/10)*100}%`;
  document.getElementById('ml-msg').textContent='';
  document.getElementById('ml-msg').className='message';

  const disp=document.getElementById('ml-word-display'); disp.innerHTML='';
  [...q.w.toUpperCase()].forEach((ch,i)=>{
    const b=document.createElement('div');
    b.className='ml-letter '+(i===1?'blank':'solid');
    b.id=`ml-ch-${i}`;
    b.textContent=i===1?'_':ch;
    disp.appendChild(b);
  });

  const vow=document.getElementById('ml-vowels'); vow.innerHTML='';
  ['A','E','I','O','U'].forEach(v=>{
    const b=document.createElement('button');
    b.className='ml-vowel-btn'; b.textContent=v;
    b.onclick=()=>checkMissing(v.toLowerCase());
    vow.appendChild(b);
  });
}
function missingMicCheck(){
  const q = S.questions[S.idx];
  micBtnStart('ml-mic-btn');
  startMic(
    (alts) => {
      micBtnReset('ml-mic-btn');
      const clean = a => a.replace(/[^a-z]/g,'');
      // If any alternative is the full word, use the correct vowel directly
      if(alts.some(a => clean(a) === q.w)){
        checkMissing(q.w[1]);
      } else {
        // Try to extract vowel from same-length heard word
        const heard = clean(alts[0]);
        if(heard.length === q.w.length){
          checkMissing(heard[1]);
        } else {
          showMicResult('ml-mic-result', `🎤 I heard "${alts[0]}" — try again!`, false);
        }
      }
    },
    (err) => {
      micBtnReset('ml-mic-btn');
      if(err!=='aborted') showMicResult('ml-mic-result','🎤 Could not hear — try again!',false);
    }
  );
}

function checkMissing(v){
  const q=S.questions[S.idx];
  const correct=q.w[1];
  const blankEl=document.getElementById('ml-ch-1');
  const msg=document.getElementById('ml-msg');
  document.querySelectorAll('.ml-vowel-btn').forEach(b=>b.onclick=null);

  blankEl.textContent=v.toUpperCase();
  if(v===correct){
    S.score++; playSound('ok'); addPoints(10); spawnConfetti(12);
    blankEl.className='ml-letter reveal-correct';
    msg.className='message correct'; msg.textContent=OK_MSGS[ri(0,OK_MSGS.length-1)];
    say(q.w);
    setTimeout(()=>{S.idx++;if(S.idx>=10)showScore();else renderMissing();},1000);
  } else {
    playSound('bad');
    blankEl.className='ml-letter reveal-wrong';
    msg.className='message wrong'; msg.textContent=`❌ It is "${q.w}"`;
    setTimeout(()=>{
      blankEl.className='ml-letter blank'; blankEl.textContent='_';
      msg.textContent=''; msg.className='message';
      document.querySelectorAll('.ml-vowel-btn').forEach(b=>b.onclick=()=>checkMissing(b.textContent.toLowerCase()));
    },1200);
  }
}
