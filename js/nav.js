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
function nav(scrId,title,pushBack=true){
  const cur=document.querySelector('.screen.active');
  if(pushBack&&cur) S.navStack.push({scr:cur.id,title:document.getElementById('page-title').innerHTML});
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(scrId).classList.add('active');
  document.getElementById('page-title').innerHTML=title;
  document.getElementById('back-btn').style.display=S.navStack.length?'block':'none';
  document.getElementById('main-content').scrollTop=0;
}
function goBack(){
  if(!S.navStack.length) return;
  const p=S.navStack.pop();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(p.scr).classList.add('active');
  document.getElementById('page-title').innerHTML=p.title;
  document.getElementById('back-btn').style.display=S.navStack.length?'block':'none';
}
