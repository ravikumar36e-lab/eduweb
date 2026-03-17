/* ═══════════════════════════════════════════════
   WORD LEVELS (by length)
═══════════════════════════════════════════════ */
function buildWordLevels(){
  const grid=document.getElementById('word-levels-grid');
  WORD_LEVELS.forEach((lvl,i)=>{
    const d=document.createElement('div');
    d.className=`level-card lc${i+1}`;
    d.innerHTML=`<div class="lc-num">L${i+1}</div><div class="lc-desc">${lvl.label}</div>`;
    d.onclick=()=>startWords(i);
    grid.appendChild(d);
  });
}
function startWords(levelIdx){
  S.subject='words'; S.level=levelIdx; S.idx=0; S.score=0; S.familyKey=null;
  const pool=shuffle([...WORD_LEVELS[levelIdx].words]);
  S.questions=pool.slice(0,10).map(w=>({w}));
  renderWord(); nav('scr-word-view',`📖 Level ${levelIdx+1}`);
}

/* ═══════════════════════════════════════════════
   WORD FAMILIES
═══════════════════════════════════════════════ */
function buildFamilyList(){
  const card=document.getElementById('family-list-card');
  card.innerHTML='';
  Object.entries(WORD_FAMILIES).forEach(([cat,families])=>{
    const h=document.createElement('div'); h.className='family-category'; h.textContent=cat; card.appendChild(h);
    const wrap=document.createElement('div'); wrap.className='family-chips';
    Object.keys(families).forEach(fam=>{
      const chip=document.createElement('div'); chip.className='family-chip'; chip.textContent=fam;
      chip.onclick=()=>startFamily(cat,fam); wrap.appendChild(chip);
    });
    card.appendChild(wrap);
  });
}
function startFamily(cat,fam){
  S.subject='family'; S.familyKey=fam; S.idx=0; S.score=0;
  const pool=shuffle([...WORD_FAMILIES[cat][fam]]);
  S.questions=pool.slice(0,Math.min(10,pool.length)).map(w=>({w}));
  renderWord(); nav('scr-word-view',`🔤 ${fam} family`);
}

/* ═══════════════════════════════════════════════
   WORD VIEW
═══════════════════════════════════════════════ */
function renderWord(){
  const item=S.questions[S.idx], total=S.questions.length, isFam=S.subject==='family';
  const badge=document.getElementById('w-badge');
  if(isFam){badge.style.display='inline-block';badge.textContent=S.familyKey+' family';}
  else badge.style.display='none';
  const cont=document.getElementById('w-letters'); cont.innerHTML='';
  [...item.w.toUpperCase()].forEach((ch,i)=>{
    const b=document.createElement('div'); b.className='letter-box'; b.textContent=ch; b.style.animationDelay=(i*.07)+'s'; cont.appendChild(b);
  });
  document.getElementById('w-counter').textContent=`Word ${S.idx+1} of ${total}`;
  document.getElementById('w-label').textContent=isFam?`${item.w.length}-letter word`:WORD_LEVELS[S.level].hint;
  document.getElementById('w-progress').textContent=`${S.idx+1}/${total}`;
  document.getElementById('w-level-label').textContent=isFam?S.familyKey:`Level ${S.level+1}`;
  document.getElementById('w-bar').style.width=`${(S.idx/total)*100}%`;
  document.getElementById('btn-prev').disabled=(S.idx===0);
  document.getElementById('btn-next').textContent=(S.idx>=total-1)?'Done ✅':'Next ➡';
}
function wordNav(dir){
  if(dir===1){if(S.idx>=S.questions.length-1){S.score=S.questions.length;showScore();return;}playSound('ok');S.idx++;}
  else if(dir===-1&&S.idx>0) S.idx--;
  renderWord();
}
function speakWord(){ say(S.questions[S.idx].w); }

function speakCheck(){
  const target = S.questions[S.idx].w.toLowerCase();
  micBtnStart('wv-mic-btn');
  startMic(
    (alts) => {
      micBtnReset('wv-mic-btn');
      const clean = a => a.replace(/[^a-z]/g,'');
      const match = alts.some(a => clean(a) === target || a === target);
      if(match){
        playSound('ok'); addPoints(5); spawnConfetti(8);
        showMicResult('wv-mic-result', OK_MSGS[ri(0,OK_MSGS.length-1)], true);
        setTimeout(()=>wordNav(1), 1000);
      } else {
        playSound('bad');
        showMicResult('wv-mic-result', `🎤 I heard "${alts[0]}" — try again!`, false);
      }
    },
    (err) => {
      micBtnReset('wv-mic-btn');
      if(err!=='aborted') showMicResult('wv-mic-result','🎤 Could not hear — try again!',false);
    }
  );
}
