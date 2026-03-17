/* ═══════════════════════════════════════════════
   APP STATE
═══════════════════════════════════════════════ */
const S={
  subject:null, level:0, questions:[], idx:0, score:0,
  familyKey:null, navStack:[]
};

/* ═══════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════ */
function _syncNavBtns(){
  const show = S.navStack.length ? 'block' : 'none';
  document.getElementById('back-btn').style.display = show;
  document.getElementById('home-btn').style.display  = show;
}
function nav(scrId,title,pushBack=true){
  const cur=document.querySelector('.screen.active');
  if(pushBack&&cur) S.navStack.push({scr:cur.id,title:document.getElementById('page-title').innerHTML});
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(scrId).classList.add('active');
  document.getElementById('page-title').innerHTML=title;
  _syncNavBtns();
  document.getElementById('main-content').scrollTop=0;
}
function goBack(){
  if(!S.navStack.length) return;
  const p=S.navStack.pop();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(p.scr).classList.add('active');
  document.getElementById('page-title').innerHTML=p.title;
  _syncNavBtns();
}
function goHome(){
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  S.navStack=[];
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('scr-home').classList.add('active');
  document.getElementById('page-title').innerHTML='🌟 Learn &amp; Play 🌟';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('home-btn').style.display='none';
  document.getElementById('main-content').scrollTop=0;
}
