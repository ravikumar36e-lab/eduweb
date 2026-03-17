/* ═══════════════════════════════════════════════
   SCORE
═══════════════════════════════════════════════ */
function showScore(){
  const total=S.questions.length||10;
  const pct=S.score/total;
  let stars,msg;
  if(pct>=.9){stars='⭐⭐⭐';msg='Outstanding! You are a superstar! 🌟';}
  else if(pct>=.7){stars='⭐⭐';msg='Great work! Keep it up! 💪';}
  else if(pct>=.5){stars='⭐';msg='Good try! Practice makes perfect! 🎯';}
  else{stars='🌈';msg='Keep practicing – you\'ll get there! 🌈';}
  document.getElementById('sc-title').textContent='🏆 Done!';
  document.getElementById('sc-stars').textContent=stars;
  document.getElementById('sc-big').textContent=`${S.score}/${total}`;
  document.getElementById('sc-msg').textContent=msg;
  let hasNext=false;
  if(S.subject==='words') hasNext=!!WORD_LEVELS[S.level+1];
  else if(S.subject==='addition'||S.subject==='subtraction') hasNext=!!MATH_LEVELS[S.subject][S.level+1];
  else if(S.subject==='ordering') hasNext=S.level<2;
  else if(S.subject==='skip') hasNext=S.level<4;
  else if(S.subject==='clock') hasNext=S.level<4;
  document.getElementById('sc-next').style.display=hasNext?'block':'none';
  playSound('levelDone'); spawnConfetti(40);
  nav('scr-score','🏆 Score');
}
function goNextLevel(){
  if(S.subject==='words') startWords(S.level+1);
  else if(S.subject==='addition'||S.subject==='subtraction') startMath(S.level+1);
  else if(S.subject==='ordering') startOrdering(S.level+1);
  else if(S.subject==='skip') startSkip(S.level+1);
  else if(S.subject==='clock') startClock(S.level+1);
}
function retryLevel(){
  if(S.subject==='words') startWords(S.level);
  else if(S.subject==='addition'||S.subject==='subtraction') startMath(S.level);
  else if(S.subject==='ordering') startOrdering(S.level);
  else if(S.subject==='skip') startSkip(S.level);
  else if(S.subject==='clock') startClock(S.level);
  else if(S.subject==='missing') startMissing();
  else if(S.subject==='family'){
    for(const[cat,fams]of Object.entries(WORD_FAMILIES)){if(fams[S.familyKey]){startFamily(cat,S.familyKey);return;}}
  }
}
