/* ═══════════════════════════════════════════════
   SENTENCES
═══════════════════════════════════════════════ */
function startSentences(){
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  S.subject='sentences'; S.idx=0;
  const pool=shuffle([...SENTENCES]);
  S.questions=pool.slice(0,10);
  renderSentence();
  nav('scr-sentences','📝 Sentences');
}
function renderSentence(){
  const q=S.questions[S.idx],total=S.questions.length;
  document.getElementById('snt-emoji').textContent=q.e;
  document.getElementById('snt-text').textContent=q.t;
  document.getElementById('snt-progress').textContent=`${S.idx+1}/${total}`;
  document.getElementById('snt-bar').style.width=`${(S.idx/total)*100}%`;
  document.getElementById('snt-prev').disabled=(S.idx===0);
  document.getElementById('snt-next').textContent=(S.idx>=total-1)?'Done ✅':'Next ➡';
}
function sentNav(dir){
  if(dir===1){
    if(S.idx>=S.questions.length-1){nav('scr-home','🌟 Learn &amp; Play 🌟');return;}
    S.idx++;
  } else if(dir===-1&&S.idx>0) S.idx--;
  renderSentence();
}
function speakSentence(){ say(S.questions[S.idx].t); }

function sentenceMicCheck(){
  const target = S.questions[S.idx].t.toLowerCase().replace(/[^a-z\s]/g,'');
  const targetWords = target.split(/\s+/).filter(w=>w.length>2);
  micBtnStart('snt-mic-btn');
  startMic(
    (alts) => {
      micBtnReset('snt-mic-btn');
      let best = 0;
      for(const alt of alts){
        const heardWords = alt.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/);
        const score = targetWords.filter(w=>heardWords.includes(w)).length / targetWords.length;
        if(score > best) best = score;
      }
      if(best >= 0.55){
        playSound('ok'); addPoints(5); spawnConfetti(8);
        showMicResult('snt-mic-result','✅ Great reading! 🌟', true);
      } else {
        playSound('bad');
        showMicResult('snt-mic-result', `🎤 I heard: "${alts[0]}"`, false);
      }
    },
    (err) => {
      micBtnReset('snt-mic-btn');
      if(err!=='aborted') showMicResult('snt-mic-result','🎤 Could not hear — try again!',false);
    }
  );
}
