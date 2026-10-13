/*
 * 권지혁으로 살아가기 — 실존 인물과 무관한 허구의 패러디.
 * Pure static game, no external APIs, no analytics, no external fonts, no build step.
 * Important: all criminal conduct in the game is fictional and is NOT an allegation
 * about the person depicted in the provided source photographs.
 */
'use strict';

const SAVE_KEY = 'kwon-jihyeok-life-save-v2';
const HALL_KEY = 'kwon-jihyeok-life-hall-v2';
const COLLECTION_KEY = 'kwon-jihyeok-life-collection-v2';
const YEAR_BORN = 2000; // 게임 세계관의 출생연도. 실제 생년과 무관.
const GOOD_ODDS = 3 ** 9;
const CRIME_COMBINATIONS = 3 ** 15;
const stages = [
  {age:9, section:'초등학생',title:'이 동네에서 살아남는 방법',body:'초등학교에 입학했다. 이사를 앞둔 가족의 대화가 들린다.\n어린 지혁은 선택의 순간에 서 있다.',correct:0,choices:[
    {text:'이사를 자주 다니며 전학의 달인이 된다.',result:'또 전학이다. 친구 이름보다 포장이사 업체 번호를 먼저 외웠다. 점점 전학이 익숙해졌다.'},
    {text:'한 학교에서 끝까지 버티며 반장에 도전한다.',result:'학급 운영 경험을 쌓았으나 교실 게시판에 얼굴이 붙었다.'},
    {text:'급식실의 비밀 조직을 조사한다.',result:'우유 배급표에서 수상한 숫자를 발견했다. 이때부터 잘못된 호기심이 자라기 시작했다.'}
  ]},
  {age:14,section:'중학생',title:'출석부 vs 온라인 게임',body:'중학교가 시작됐다. 교실에서는 출석을 부르고, 컴퓨터에서는 레이드가 열린다.\n지혁의 진로를 바꿀 결정적인 로그인 화면이다.',correct:1,choices:[
    {text:'매일 성실하게 등교하고 선생님 말씀을 듣는다.',result:'성실하게 등교했다. 친구는 숙제를 빌려 달라고 했다.'},
    {text:'학교에 안 가고 집에서 온라인 게임을 한다.',result:'출석부에는 공백, 게임 서버에는 접속 기록. 길드장이 온라인 출석을 칭찬했다.'},
    {text:'학생회 선거에서 공약으로 무료 와이파이를 건다.',result:'지나친 권력욕이 싹텄다. 동아리보다 더 수상한 조직에서 연락이 왔다.'}
  ]},
  {age:17,section:'고등학생',title:'수능보다 중요한 화면',body:'고등학교. 모의고사 점수는 흔들리고, 휴대폰 배터리는 3%다.\n운명은 생각보다 하찮은 장면에서 갈라진다.',correct:2,choices:[
    {text:'교과서 세 권을 끝내고 기출문제를 푼다.',result:'전교 1등의 야심을 품자 세계선이 반대로 꺾였다.'},
    {text:'전국 모의고사 성적표를 액자에 걸어 둔다.',result:'성적은 올라갔으나 엔딩 확률이 바닥으로 내려갔다.'},
    {text:'공부를 열심히 하지 않고 휴대폰 게임을 한다.',result:'공부보다 일일 접속 보상이 중요한 시기. 일일 접속 보상을 모두 받았다.'}
  ]},
  {age:19,section:'입시',title:'한 번 더? 아니면 바로?',body:'고등학교를 마쳤다. 주변에서는 진학과 사회생활을 이야기한다.\n지혁에게는 매우 구체적인 우회로가 있다.',correct:0,choices:[
    {text:'재수를 한다.',result:'독서실에 출근하는 삶이 시작된다. 이듬해 시험까지 남은 일수를 셌다.'},
    {text:'바로 취업 전선에 뛰어든다.',result:'첫 명함을 손에 넣었다. 인생 서버에서 명함의 색이 수상하게 변한다.'},
    {text:'세계 일주를 떠나겠다고 선언한다.',result:'항공권은 없고 야망만 있다. 여기서부터 국제 범죄물의 배경음이 깔린다.'}
  ]},
  {age:21,section:'대학',title:'캠퍼스의 갈림길',body:'입시의 문이 열린다. 캠퍼스를 어디에 둘 것인가?\n별것 아닌 선택처럼 보이지만 세계선은 상당히 예민하다.',correct:1,choices:[
    {text:'먼 곳의 산 좋고 물 좋은 대학에 들어간다.',result:'공기는 좋지만 운명은 나빠졌다. 수상한 선배가 말을 건다.'},
    {text:'서울 소재 대학에 입학한다.',result:'통학시간이 늘었다. 지하철 환승에 익숙해졌다.'},
    {text:'대학 대신 동네 사업을 바로 시작한다.',result:'사업자등록보다 이상한 거래 제안이 먼저 들어왔다.'}
  ]},
  {age:23,section:'진로',title:'뜬금없는 약대의 부름',body:'진로를 결정할 시기. 누군가는 공무원을, 누군가는 사업을 말한다.\n지혁은 보통 사람이라면 설명하기 어려운 진로를 고민한다.',correct:2,choices:[
    {text:'인플루언서가 되어 협찬만 받으며 산다.',result:'협찬 제안 사이로 출처를 알 수 없는 계약서가 끼어 있었다.'},
    {text:'창업 동아리에서 투자자를 모은다.',result:'회계 장부보다 화려한 IR 덱이 먼저 완성됐다.'},
    {text:'약대 진학에 도전한다.',result:'왜 하필 약대인지 아무도 모른다. 그렇지만 아주 중요한 플래그가 켜졌다.'}
  ]},
  {age:25,section:'군 복무',title:'입대 장소를 고르세요',body:'입대 통지서를 받았다. 어디에서 국방의 의무를 수행할 것인가?\n운명은 생각보다 산과 철책을 좋아한다.',correct:0,choices:[
    {text:'최전방 부대에 간다.',result:'찬바람과 함께 또 하나의 이상한 기억를 얻었다.'},
    {text:'가능하면 후방 부대로 간다.',result:'편안한 선택은 이 게임에서 유난히 비싸다. 세계선이 다시 뒤틀렸다.'},
    {text:'군대 이야기만 나오면 게임을 켜서 외면한다.',result:'기록상으로는 잠깐의 회피였지만, 운명은 이를 훨씬 큰 사고의 시작으로 기억한다.'}
  ]},
  {age:29,section:'진학',title:'사회인이 될 시간인데',body:'사람들은 취업과 이직을 한다. 지혁은 아직도 배움의 현관을 기웃거린다.\n이번 선택의 대가는 무려 몇 년치 시간이다.',correct:1,choices:[
    {text:'한 번에 큰돈을 벌 사업을 시작한다.',result:'첫 계약부터 의심스러운 고객이 등장했다.'},
    {text:'대학원에 간다.',result:'논문과 커피로 연명했다. 논문 첫 줄을 쓰기까지 석 달이 걸렸다.'},
    {text:'모든 것을 뒤로하고 해외로 떠난다.',result:'공항에서 누군가 수상한 서류가방을 내밀었다.'}
  ]},
  {age:32,section:'최종 선택',title:'운명의 마지막 면접',body:'드디어 마지막 관문. 막대한 시간과 수많은 우연 끝에 세 개의 문이 놓였다.\n세 개의 문 앞에서 고민한다.',correct:2,choices:[
    {text:'야망을 품고 수상한 재벌 회장의 비서가 된다.',result:'회장이 건넨 것은 근로계약서가 아니라 미확인 장부였다.'},
    {text:'한탕을 꿈꾸며 의문의 투자회사에 들어간다.',result:'첫 주부터 금융수사대 뉴스에 회사 이름이 등장했다.'},
    {text:'대기업에 입사한다.',result:'서류, 인적성, 면접을 통과했다. 내일부터 출근이다.'}
  ]}
];

const goodLife = [
 {age:35, title:'첫 프로젝트를 마쳤습니다',body:'지혁은 대기업에서 기획 문서를 정리하고 동료의 일을 돕는다. 퇴근할 때 회사 노트북을 두고 나온다. 당연한데 이 세계선에서는 역사적 사건이다.'},
 {age:42, title:'반차를 정직하게 신청합니다',body:'출근 시간을 지키고, 회의록을 올리고, 친구에게 밥을 산다. 회사에서 받은 표창장은 냉장고 자석에 붙는다.'},
 {age:51, title:'이제 후배를 돌볼 시간',body:'신입사원에게 모르는 건 물어보라고 말한다. 지혁이 이끌었던 프로젝트는 고객에게 피해를 주지 않고 정상적으로 운영된다.'},
 {age:65, title:'정년퇴직, 그리고 평화',body:'인수인계를 마치고 웃으며 회사를 나왔다. 집에 와서 게임을 켰다. 중학생 때와 달리 내일은 출근하지 않아도 된다.'},
 {age:84, title:'진짜 평범하게 잘 살았습니다',body:'사랑하는 사람들과 여행하고, 동네의 자원봉사 활동도 했다. 누구에게나 있을 법한 다정하고 평범한 인생이 완성됐다.'}
];


const BAD_CHAPTER_COUNT = 9;
const STAGE_RESULTS = [
  ['전학 서류에 도장이 또 찍혔다.','반장 선거 사진이 복도에 붙었다.','급식실에서 이상한 소문이 돌았다.'],
  ['출석부에 이름이 빠짐없이 적혔다.','게임 길드에서 야간 레이드가 열렸다.','학생회 공약만 화제가 됐다.'],
  ['기출문제집의 빈칸이 사라졌다.','성적표를 액자에 걸었다.','게임 일일 접속 보상을 놓치지 않았다.'],
  ['독서실 자리 번호가 익숙해졌다.','첫 회사 명함을 받았다.','세계 지도를 펼쳐 놓고 고민했다.'],
  ['낯선 캠퍼스에서 길을 잃었다.','서울에서 첫 강의를 들었다.','첫 사업 계획서에 사인을 했다.'],
  ['협찬 메일이 쌓이기 시작했다.','투자설명회를 준비했다.','약대 준비 서류를 펼쳤다.'],
  ['철책 너머로 바람이 세게 불었다.','후방 생활에 적응했다.','게임을 켰지만 통지서는 그대로 남았다.'],
  ['사업용 계좌를 개설했다.','대학원 강의실에 불이 켜졌다.','공항 전광판에서 출발편을 찾았다.'],
  ['이름 모를 회장의 서류를 받았다.','의문의 투자회사가 출근을 요구했다.','대기업 최종 합격 연락을 받았다.']
];
const BAD_ARCS = [
 {title:'첫 번째 사고',body:r=>`${r.place}에서 ${r.item} 때문에 소란이 벌어졌다. 지혁은 문제를 키울지, 피할지 고민한다.`,choices:r=>[
   `${r.item}을 사람들 앞에 내민다.`,`${r.enemy}에게 먼저 따진다.`,`${r.action}에 전력을 다한다.`]},
 {title:'소문이 퍼지다',body:r=>`${r.rumor}이라는 별명이 생겼다. 소문은 ${r.place} 밖으로도 빠르게 번진다.`,choices:r=>[
   '소문이 모두 거짓이라며 역정을 낸다.','관심을 끌기 위해 더 큰 행사를 연다.','가명으로 새로운 계획을 발표한다.']},
 {title:'의문의 방문자',body:r=>`${r.inspector}이(가) 나타났다. 그동안 쌓인 ${r.burden} 문제를 더는 덮을 수 없다.`,choices:r=>[
   '질문을 피하며 눈치만 본다.','근거 없는 해명 기자회견을 연다.','상황을 수습한다며 엉뚱한 약속을 한다.']},
 {title:'동료들의 반란',body:r=>`${r.enemy}이(가) 반기를 든다. ${r.action}은(는) 점점 통제하기 어려워졌다.`,choices:r=>[
   '자신의 권위부터 내세운다.','말도 안 되는 타협안을 낸다.','엉뚱한 사람에게 책임을 넘긴다.']},
 {title:'최악의 하루',body:r=>`${r.loss} 앞에서 지혁은 거울을 봤다. 초췌한 얼굴과 ${r.item}만이 예전의 영광을 말해 준다.`,choices:r=>[
   '아직 끝난 게 아니라고 선언한다.','새로운 팀을 만든다고 떠든다.','마지막 돈으로 판을 뒤집으려 한다.']},
 {title:'인생의 최종 선택',body:r=>`${r.place}의 불이 꺼지고 ${r.burden}이(가) 남았다. 지혁은 마지막 결정을 앞두고 있다.`,choices:r=>[
   '수상한 장부를 책장 뒤에 숨긴다.','잘못된 선택이었다고 뒤늦게 털어놓는다.','근거 없이 다시 시작하겠다고 소리친다.']}
];
let game = readJSON(SAVE_KEY, null);
let hall = readJSON(HALL_KEY, []);
if (!Array.isArray(hall)) hall = [];
let unlocked = readJSON(COLLECTION_KEY, []);
if(!Array.isArray(unlocked))unlocked=[];
let modalTab = 'history';
let galleryPage = 0;
let page = 'home';
let modalOpen = false;
let timer = null;
let flashTimer = null;
const app = document.getElementById('app');

function readJSON(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function store(){if(game)localStorage.setItem(SAVE_KEY, JSON.stringify(game));else localStorage.removeItem(SAVE_KEY)}
function safe(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function clamp(n){return Math.max(0,Math.min(100,Math.round(n)))}
function selectFrom(list,salt){return list[Math.abs(salt) % list.length]}
function hashNum(n){n=(n^61)^(n>>>16);n=Math.imul(n,9);n=n^(n>>>4);n=Math.imul(n,0x27d4eb2d);return (n^(n>>>15))>>>0}
function allCount(){return hall.length}
function successCount(){return hall.filter(x=>x.good).length}
function enterView(next){page=next;render();window.scrollTo({top:0,behavior:'instant'})}
function newLife(){
  game={version:2,seed:Math.floor(Math.random()*2147483647),screen:'birth',route:'candidate',stageIndex:0,crimeIndex:0,goodIndex:0,
    startCrimeAge:0,major:null,branch:null,routeIndex:null,badChoices:[],
    age:0,stats:{cash:30,heat:0,infamy:0,life:55},
    logs:[{age:0,text:'대한민국에서 권지혁이 태어났다.'}],choices:[],stepResult:null,auto:false,ended:false,ending:null};
  store();enterView('game');
}

function showFlash(msg){let old=document.querySelector('.live-flash');if(old)old.remove();const b=document.createElement('div');b.className='live-flash';b.textContent=msg;document.body.appendChild(b);clearTimeout(flashTimer);flashTimer=setTimeout(()=>b.remove(),2400)}
function doll(type='student',small=false){
  // Composite uses the original unretouched, photo-cut face over a newly proportioned body.
  const outfit=['baby','student','good','bad'].includes(type)?type:'student';
  return `<div class="doll ${outfit} ${small?'small':''}" role="img" aria-label="원본 사진에서 오린 얼굴을 비율에 맞춘 전신 캐릭터에 붙인 권지혁">
    <img class="doll-illustration" src="assets/character-${outfit}.png" alt="" draggable="false">
  </div>`;
}
function header(){return `<header class="site-head"><div class="wrap head-inner"><div class="brand"><span class="brand-mark">ㄱ</span><span>권지혁으로 살아가기</span></div>
<nav class="head-actions"><button class="btn-quiet" data-action="hall">기록</button><button class="btn-quiet" data-action="home">처음으로</button></nav></div></header>`}

function footer(){return `<footer class="footer"><div class="wrap footer-inner"><div class="fiction">※ 실존 인물의 실제 행적과 무관한 허구의 패러디입니다.</div><div>2026</div></div></footer>`}

function homeScreen(){const canResume=game&&!game.ended;
return `<main class="wrap"><section class="intro-grid"><div class="intro">
<h1>권지혁으로<br><span class="under">살아가기</span></h1>
<div class="button-row"><button class="btn-primary" data-action="new">👶 태어나기</button>${canResume?'<button class="btn-secondary" data-action="resume">↪ 이어하기</button>':''}</div>
</div><div class="cover"><span class="cover-doodle">✳</span>${doll('student')}<div class="cover-bubble">왜 나야?</div></div></section></main>`}

function birthScreen(){return `<main class="wrap"><div class="birth-sheet"><div class="birth-top"><h1>권지혁 출생</h1></div>
${doll('baby',true)}<div class="birth-grid"><div><span>국가</span><b>대한민국 🇰🇷</b></div><div><span>출생</span><b>${YEAR_BORN}년</b></div>
<div><span>이름</span><b>권지혁</b></div><div><span>나이</span><b>0세</b></div></div>
<button class="btn-primary" data-action="start-life">살아가기 →</button></div></main>`}

function crimeScene(g){
 const n=g.crimeIndex;
 if(n===0)return {section:'새로운 인생',age:g.startCrimeAge+1,title:'지혁은 어디로 향할까?',body:'세 개의 문이 열렸다.',tag:'갈림길',choices:ROUTE_GROUPS.map((x,i)=>({id:i,text:x.name,result:`${x.prompt}으로 발걸음을 옮겼다.`,kind:'전개',heat:1,infamy:2,cash:-2}))};
 if(n===1){const group=ROUTE_GROUPS[g.major??0];return {section:group.name,age:g.startCrimeAge+3,title:'어디에 발을 들일까?',body:group.prompt,tag:'갈림길',choices:group.branches.map((x,i)=>({id:i,text:x.name,result:`${x.name}에 첫발을 들였다.`,kind:'전개',heat:2,infamy:2,cash:-3}))}}
 if(n===2){const b=ROUTE_GROUPS[g.major??0].branches[g.branch??0];return {section:'새로운 직업',age:g.startCrimeAge+5,title:'지혁의 새 직함',body:'쓸데없이 근사한 직함 세 개가 눈앞에 놓였다.',tag:'갈림길',choices:b.roles.map((rid,i)=>({id:i,text:ROUTES[rid].name,result:ROUTES[rid].intro,kind:'전개',heat:3,infamy:4,cash:0}))}}
 const r=ROUTES[g.routeIndex??0],arc=BAD_ARCS[n-3];
 const age=g.startCrimeAge+[1,3,5,8,12,18,24,32,43][n];
 return {section:r.category,age,title:arc.title,body:arc.body(r),tag:r.name,choices:arc.choices(r).map((v,i)=>({id:i,text:v,result:[
   `${r.item} 때문에 또 소란이 났다.`,`${r.enemy}과(와) 불필요한 언쟁이 이어졌다.`,`${r.action}은(는) 기대와 달리 완전히 꼬였다.`][(i+n)%3],kind:'전개',heat:4+i*3,infamy:4+i*3,cash:-i*3-2}))};
}

function sceneNow(){if(!game)return null;
 if(game.route==='candidate'){const x=stages[game.stageIndex];if(!x)return null;return {...x,tag:'✦ 선택의 순간',choices:x.choices.map((c,i)=>({...c,id:i}))}}
 if(game.route==='crime')return crimeScene(game);
 return null;
}
function statusStats(){const s=game.stats;const stats=game.route==='candidate'?[
 ['💸 주머니 사정',s.cash,'money'],['🌿 사회 적응력',s.life,''],['🚨 수사 위험',s.heat,'heat'],['📢 악명',s.infamy,'infamy']]:game.route==='good'?[
 ['💸 경제적 안정',s.cash,'money'],['🌿 모범 시민력',s.life,''],['🚨 수사 위험',0,'heat'],['📢 악명',0,'infamy']]:[
 ['💸 정체불명 재산',s.cash,'money'],['🚨 수사 위험',s.heat,'heat'],['📢 악명',s.infamy,'infamy'],['🌿 남은 양심',s.life,'']];
 return `<section class="status-card"><h3 class="side-title">현재 상태 / 100</h3>${stats.map(([name,val,kind])=>`<div class="stat-row"><div class="stat-meta"><span>${name}</span><span>${val}</span></div><div class="stat-track"><div class="stat-fill ${kind}" style="width:${clamp(val)}%"></div></div></div>`).join('')}</section>`}
function logBox(){return `<section class="history-card"><h3>✎ 살아온 기록 — 최근 ${Math.min(5,game.logs.length)}개</h3>
${game.logs.slice(-5).reverse().map(l=>`<div class="history-row"><span class="time">${l.age}세</span><span>${safe(l.text)}</span></div>`).join('')||'<p class="history-empty">아직 기록이 없습니다.</p>'}</section>`}
function aside(){let type=game.route==='good'?'good':game.route==='crime'?'bad':game.age<10?'baby':'student';return `<aside class="side-column"><div class="portrait-card"><div class="portrait-top"><span>👤 권지혁</span><span>${game.age}세</span></div>${doll(type,true)}
 <div class="portrait-bottom">${game.route==='crime'&&game.routeIndex!==null?safe(ROUTES[game.routeIndex].name):'🇰🇷 대한민국'}</div></div>${statusStats()}${logBox()}</aside>`}

function progressValue(){if(game.route==='candidate')return Math.round(game.stageIndex/stages.length*100);if(game.route==='good')return Math.round((game.goodIndex+1)/goodLife.length*100);return Math.round(game.crimeIndex/BAD_CHAPTER_COUNT*100)}

function progressBar(){return `<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressValue()}"><div class="progress-fill" style="width:${progressValue()}%;background:${game.route==='good'?'#719a79':game.route==='crime'?'#ee7154':'#f2b85e'}"></div></div>`}
function gameTop(){return `<div class="game-bar"><div class="identity"><div class="age-disc">${game.age}세</div><div><b>권지혁</b><div class="muted">${YEAR_BORN+game.age}년 · 대한민국</div></div></div>
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="year-tag">${game.route==='candidate'?`${game.stageIndex+1} / 9`:game.route==='crime'?`${game.crimeIndex+1} / ${BAD_CHAPTER_COUNT}`:`${game.goodIndex+1} / ${goodLife.length}`}</span><button class="btn-quiet" data-action="auto">${game.auto?'⏸ 멈추기':'⚡ 자동 진행'}</button></div></div>${progressBar()}`}

function decisionScreen(){const sc=sceneNow();if(!sc)return '<p>이벤트를 불러올 수 없습니다.</p>';game.age=sc.age;
 return `<main class="wrap game-wrap">${gameTop()}<div class="game-grid"><section class="story-card"><div class="story-tag">${safe(sc.tag)}</div>
 <h1 class="story-title">${safe(sc.title)}</h1><p class="story-body">${safe(sc.body)}</p><div class="choice-heading">선택하기</div>
 <div class="choices">${sc.choices.map((c,i)=>`<button class="choice" data-action="choice" data-choice="${c.id}"><span class="choice-n">${i+1}</span><span>${safe(c.text)}</span></button>`).join('')}</div>
 </section>${aside()}</div></main>`}

function outcomeScreen(){const r=game.stepResult||{};return `<main class="wrap game-wrap">${gameTop()}<div class="game-grid"><section class="story-card">
 <div class="outcome-stamp">RESULT</div><h1 class="story-title">${safe(r.title||'선택의 결과')}</h1>
 <p class="story-body">${safe(r.choice||'')}</p><div class="result-block">${safe(r.body||'')}</div>
 <div class="next-row"><button class="btn-primary" data-action="next">계속하기 →</button></div></section>${aside()}</div></main>`}

function goodScene(){const x=goodLife[game.goodIndex];game.age=x.age;return `<main class="wrap game-wrap">${gameTop()}<div class="game-grid"><section class="story-card">
 <span class="story-tag">${game.age}세</span><h1 class="story-title">${safe(x.title)}</h1><p class="story-body">${safe(x.body)}</p>
 <button class="btn-primary" data-action="next-good">계속하기 →</button></section>${aside()}</div></main>`}

function pickEnding(){
 const choices=game.badChoices.slice(3);
 const code=choices.reduce((n,v,i)=>n+v*(3**i),0);
 const fateIndex=code % BAD_FATES.length;
 const routeIndex=game.routeIndex??0;
 return {...BAD_ENDINGS[routeIndex*BAD_FATES.length+fateIndex]};
}

function finish(good){
 if(game.ended)return;
 game.ended=true;game.screen='ending';game.age=good?84:Math.max(75,game.age);
 game.ending=good?{id:'G00',name:'평범한 권지혁',sub:'대기업에 입사해 성실하게 일하고 평범한 노년을 맞이했다.',kind:'일상'}:pickEnding();
 if(!good&&!unlocked.includes(game.ending.id)){unlocked.push(game.ending.id);localStorage.setItem(COLLECTION_KEY,JSON.stringify(unlocked))}
 hall.unshift({stamp:Date.now(),good,ending:game.ending.name,age:game.age,seed:game.seed,choices:game.choices.slice(),infamy:game.stats.infamy});
 hall=hall.slice(0,50);localStorage.setItem(HALL_KEY,JSON.stringify(hall));store();render();
}

function endingScreen(){const good=game.route==='good',e=game.ending;return `<main class="wrap"><section class="ending-area">
 <div class="ending-hero ${good?'good':''}"><h1>${safe(e.name)}</h1>${doll(good?'good':'bad')}
 </div><div class="ending-actions"><button class="btn-primary" data-action="new">🔁 다시 태어나기</button><button class="btn-secondary" data-action="image">🖼 카드 저장</button><button class="btn-secondary" data-action="share">📋 복사</button><button class="btn-secondary" data-action="hall">📚 기록</button></div>
 </section></main>`}
function hallModal(){
 const n=48,total=Math.ceil(BAD_ENDINGS.length/n);
 const view=modalTab==='collection'
  ? `<div class="collection-head">${unlocked.length} / ${BAD_ENDINGS.length}</div>
     <div class="record-list">${BAD_ENDINGS.slice(galleryPage*n,(galleryPage+1)*n).map(e=>{
       const known=unlocked.includes(e.id);
       return `<div class="record ${known?'found':'locked'}"><div><strong>${safe(e.id)} · ${known?safe(e.name):'???'}</strong></div></div>`
     }).join('')}</div><div class="pager"><button class="btn-quiet" data-action="gallery-prev" ${galleryPage===0?'disabled':''}>← 이전</button><b>${galleryPage+1} / ${total}</b><button class="btn-quiet" data-action="gallery-next" ${galleryPage===total-1?'disabled':''}>다음 →</button></div>`
  : `<div class="record-list">${hall.length?hall.map((h,i)=>`<div class="record ${h.good?'good':''}"><div><strong>${i+1}. ${safe(h.ending)}</strong><p>${new Date(h.stamp).toLocaleDateString('ko-KR')} · ${h.age}세</p></div></div>`).join(''):'<div class="help-keys">기록 없음</div>'}</div>
     ${hall.length?'<div style="margin-top:16px;text-align:right"><button class="btn-quiet" data-action="clear-hall">기록 삭제</button></div>':''}`;
 return `<div class="modal-backdrop" data-action="close"><div class="modal" role="dialog" aria-modal="true" aria-label="기록">
  <div class="modal-header"><h2>기록</h2><button class="icon-button" data-action="close" aria-label="닫기">×</button></div>
  <div class="modal-tabs"><button class="btn-quiet ${modalTab==='history'?'active':''}" data-action="history-tab">지난 인생</button><button class="btn-quiet ${modalTab==='collection'?'active':''}" data-action="collection-tab">엔딩 도감 ${unlocked.length} / ${BAD_ENDINGS.length}</button></div>${view}</div></div>`;
}
function render(){
 clearTimeout(timer);
 let body=page==='home'?homeScreen():!game?homeScreen():game.screen==='birth'?birthScreen():game.screen==='decision'?decisionScreen():game.screen==='outcome'?outcomeScreen():game.screen==='good'?goodScene():endingScreen();
 app.innerHTML=header()+body+footer()+(modalOpen?hallModal():'');
 if(game)store();
 if(page==='game'&&game&&game.auto&&!modalOpen&&!game.ended){
  let action=game.screen==='decision'?()=>choose(Math.floor(Math.random()*3)):
             game.screen==='outcome'?()=>next():game.screen==='good'?()=>nextGood():null;
  if(action)timer=setTimeout(action,game.screen==='decision'?1500:1300);
 }
}
function choose(index){if(!game||game.screen!=='decision'||!Number.isInteger(index)||index<0||index>2)return;
 const sc=sceneNow();if(!sc)return;
 game.age=sc.age;const c=sc.choices[index];if(!c)return;
 game.choices.push(index);game.logs.push({age:game.age,text:c.text});
 if(game.route==='candidate'){
  const matched=index===sc.correct;const finalMatched=matched&&game.stageIndex===stages.length-1;
  game.stats.cash=clamp(game.stats.cash+(matched?3:-4));game.stats.life=clamp(game.stats.life+(matched?4:-13));
  game.stepResult={title:finalMatched?'입사':'그렇게 시간이 흘렀다',choice:c.text,body:STAGE_RESULTS[game.stageIndex][index]};
  if(!matched){game.route='crime';game.startCrimeAge=game.age;game.stats.heat=clamp(game.stats.heat+8);}
  else{game.stageIndex++;if(finalMatched){game.route='good';game.stats.life=93;game.stats.cash=72}}
 }else if(game.route==='crime'){
  if(game.crimeIndex===0)game.major=index;
  if(game.crimeIndex===1)game.branch=index;
  if(game.crimeIndex===2)game.routeIndex=ROUTE_GROUPS[game.major].branches[game.branch].roles[index];
  game.badChoices.push(index);
  game.stats.heat=clamp(game.stats.heat+c.heat);
  game.stats.infamy=clamp(game.stats.infamy+c.infamy);
  game.stats.cash=clamp(game.stats.cash+c.cash);
  game.stats.life=clamp(game.stats.life-4);
  game.stepResult={title:game.crimeIndex===2?ROUTES[game.routeIndex].name:'그날의 결과',choice:c.text,body:c.result};
  game.crimeIndex++;
 }
 game.logs.push({age:game.age,text:game.stepResult.body});game.logs=game.logs.slice(-100);
 game.screen='outcome';store();render();window.scrollTo({top:0,behavior:'smooth'});
}

function next(){if(!game||game.screen!=='outcome')return;
 if(game.route==='candidate'){game.screen='decision'}
 else if(game.route==='good'){game.screen='good';game.goodIndex=0}
 else if(game.route==='crime'){
   if(game.crimeIndex>=BAD_CHAPTER_COUNT){finish(false);window.scrollTo({top:0,behavior:'smooth'});return}
   game.screen='decision';
 }
 store();render();window.scrollTo({top:0,behavior:'smooth'});
}

function nextGood(){if(!game||game.screen!=='good')return;
 game.logs.push({age:game.age,text:goodLife[game.goodIndex].title});game.goodIndex++;
 if(game.goodIndex>=goodLife.length){finish(true);window.scrollTo({top:0,behavior:'smooth'});return}
 game.screen='good';store();render();window.scrollTo({top:0,behavior:'smooth'});
}
function resultText(){return `권지혁으로 살아가기 — ${game.ending.name}`;}

async function share(){const t=resultText();try{await navigator.clipboard.writeText(t);showFlash('엔딩 결과를 복사했습니다!')}catch{const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.left='-9999px';document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();showFlash('엔딩 결과를 복사했습니다!')}}
function downloadCard(){
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
 const ctx=canvas.getContext('2d');const good=game.route==='good';
 ctx.fillStyle=good?'#e5f0e8':'#292522';ctx.fillRect(0,0,1080,1350);
 ctx.strokeStyle=good?'#527965':'#c6a38d';ctx.lineWidth=7;ctx.strokeRect(46,46,988,1258);
 ctx.textAlign='center';ctx.fillStyle=good?'#466e5e':'#ebbc9d';ctx.font='bold 31px sans-serif';ctx.fillText('권지혁으로 살아가기',540,151);
 ctx.fillStyle=good?'#25372f':'#fff8ef';ctx.font='bold 79px sans-serif';
 const title=game.ending.name;
 if(ctx.measureText(title).width>920)ctx.font='bold 64px sans-serif';
 ctx.fillText(title,540,267,910);
 const img=new Image();img.onload=()=>{
   ctx.drawImage(img,270,322,540,810);
   ctx.fillStyle=good?'#446a55':'#e6d1bf';ctx.font='22px sans-serif';
   ctx.fillText('※ 실존 인물의 실제 행적과 무관한 허구의 패러디',540,1225);
   try {
    const a=document.createElement('a');a.download='kwon-jihyeok-'+game.ending.id+'.png';a.href=canvas.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();showFlash('엔딩 이미지가 저장되었습니다.');
   }catch(e){showFlash('이미지 저장을 완료하지 못했습니다.');}
 };img.onerror=()=>showFlash('캐릭터 이미지를 찾지 못했습니다.');img.src=`assets/character-${good?'good':'bad'}.png`;
}
function onAction(el){const action=el.dataset.action;if(!action)return;
 if(action==='home'){modalOpen=false;enterView('home');return}
 if(action==='hall'){modalOpen=true;modalTab='history';render();return}
 if(action==='collection-tab'){modalTab='collection';galleryPage=0;render();return}
 if(action==='history-tab'){modalTab='history';render();return}
 if(action==='gallery-next'){galleryPage=Math.min(Math.ceil(BAD_ENDINGS.length/48)-1,galleryPage+1);render();return}
 if(action==='gallery-prev'){galleryPage=Math.max(0,galleryPage-1);render();return}
 if(action==='close'){modalOpen=false;render();return}
 if(action==='clear-hall'){if(confirm('이 기기의 전생 기록을 모두 지울까요?')){hall=[];localStorage.removeItem(HALL_KEY);render()}return}
 if(action==='new'){modalOpen=false;newLife();return}
 if(action==='resume'){modalOpen=false;enterView('game');return}
 if(action==='start-life'){game.screen='decision';game.age=stages[0].age;store();render();window.scrollTo(0,0);return}
 if(action==='choice'){choose(Number(el.dataset.choice));return}
 if(action==='next'){next();return}
 if(action==='next-good'){nextGood();return}
 if(action==='auto'){game.auto=!game.auto;store();render();showFlash(game.auto?'선택을 자동으로 진행합니다.':'자동 결정을 중지했습니다.');return}
 if(action==='image'&&game&&game.ended){downloadCard();return}
 if(action==='share'&&game&&game.ended){share();return}
}
app.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(!el)return;if(el.classList.contains('modal-backdrop')&&e.target!==el)return;onAction(el)});
window.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&modalOpen){modalOpen=false;render();return}
 if(modalOpen||page!=='game'||!game||e.altKey||e.ctrlKey||e.metaKey)return;
 if(game.screen==='decision'&&['1','2','3'].includes(e.key)){choose(Number(e.key)-1)}
 else if(e.key==='Enter'&&game.screen==='outcome')next();
 else if(e.key==='Enter'&&game.screen==='good')nextGood();
});
render();
