/* ═══════════════════════════════════════════════
   WORD LEVEL DATA
═══════════════════════════════════════════════ */
const WORD_LEVELS=[
  {label:'3-letter words',hint:'3-letter word',
   words:['ant','bag','bat','bee','bus','cat','cow','cup','dog','ear','egg','eye','fan','fox','hat','hen','hug','jam','jar','key','leg','log','map','net','owl','pen','pig','pot','rat','red','rug','sun','tap','tea','tin','web','zip','zoo','fly','sky','mud','sad','joy','top','bed','bug','gum','run','dig','hop']},
  {label:'4-letter words',hint:'4-letter word',
   words:['bear','bird','book','cake','corn','crab','door','drum','duck','face','farm','fire','fish','flag','frog','game','gold','hand','hero','home','jump','king','kite','lake','lamb','leaf','lion','lock','love','milk','moon','nest','pink','play','rain','ring','rose','sand','ship','snow','song','star','road','sail','read','luck','hill','hook','gate','draw']},
  {label:'5-letter words',hint:'5-letter word',
   words:['brain','bread','brave','clean','dance','dream','eagle','feast','field','flame','glass','grade','grain','laugh','peace','peach','reach','scale','shake','share','sleep','smart','smile','smoke','snake','speak','stone','sweet','teach','think','train','treat','twice','watch','whale','wheat','whole','write','young','chair','cloud','crowd','crown','dress','drink','drive','ghost','giant','plant','plate']},
  {label:'6+ letter words',hint:'longer word',
   words:['animal','button','candle','castle','circle','flower','forest','garden','hammer','jacket','jungle','kitten','ladder','monkey','orange','parrot','pencil','planet','rabbit','ribbon','rocket','school','silver','spider','spring','summer','sunset','tennis','ticket','turtle','valley','walnut','window','winter','yellow','zipper','cotton','doctor','dragon','finger','insect','mirror','mother','napkin','needle','potato','purple','sailor','statue','bridge']}
];

/* ═══════════════════════════════════════════════
   WORD FAMILY DATA
═══════════════════════════════════════════════ */
const WORD_FAMILIES={
  'Short -a':{'-ab':['cab','lab','dab','gab','jab','nab','tab'],'-ad':['bad','dad','had','lad','mad','pad','sad','tad'],'-ag':['bag','gag','lag','nag','rag','wag','hag','sag'],'-am':['dam','jam','ram','yam','ham','bam','cam'],'-an':['can','fan','man','pan','ran','van','tan','ban'],'-ap':['cap','lap','map','nap','rap','tap','yap','gap'],'-at':['bat','cat','fat','hat','mat','rat','sat','pat']},
  'Short -e':{'-en':['den','hen','men','pen','ten','fen'],'-et':['bet','get','jet','let','met','net','pet','set'],'-ed':['bed','led','red','wed','fed','ted'],'-eg':['beg','leg','peg','keg','veg']},
  'Short -i':{'-ib':['bib','fib','nib','rib'],'-id':['bid','did','hid','kid','lid','rid','mid'],'-ig':['big','dig','fig','jig','wig','pig','rig','zig'],'-im':['dim','him','rim','skim','trim','slim'],'-in':['bin','din','pin','tin','win','fin','kin','gin'],'-ip':['dip','hip','lip','nip','zip','sip','tip','rip'],'-it':['bit','fit','hit','kit','lit','sit','nit','pit']},
  'Short -o':{'-ob':['bob','cob','job','mob','rob','sob','gob'],'-od':['cod','nod','pod','rod','sod'],'-og':['bog','cog','dog','fog','hog','jog','log'],'-op':['cop','hop','lop','mop','pop','top','stop','shop'],'-ot':['cot','dot','hot','lot','pot','rot','tot','got'],'-ox':['box','fox','pox']},
  'Short -u':{'-ub':['cub','dub','hub','rub','tub','sub'],'-ud':['bud','mud','dud','spud'],'-ug':['bug','hug','jug','lug','mug','rug','tug'],'-um':['gum','hum','sum','bum','drum'],'-un':['bun','fun','gun','sun','nun','run','pun'],'-ut':['but','cut','hut','nut','gut','rut']},
  'Ending Blends':{'-nd':['and','end','band','hand','land','sand','find','kind','mind','wind','pond'],'-nk':['bank','rank','tank','sank','pink','rink','sink','wink','link','bonk','honk','junk','bunk'],'-ng':['bang','gang','hang','sang','ring','king','sing','wing','song','long','rung','lung'],'-mp':['camp','damp','lamp','ramp','bump','dump','hump','jump','pump'],'-st':['best','last','past','test','nest','rest','vest','fist','list','dust','must','rust']},
  'Double Letters':{'-ff':['riff','muff','cuff','huff','puff'],'-ll':['wall','ball','tall','call','fall','fill','pull','bell','well','tell'],'-ss':['mass','fuss','mess','boss','hiss','kiss','pass','miss','less'],'-zz':['buzz','jazz','fizz']},
  'L-Blends':{'bl-':['blue','blob','blow','blew','blur','blend','black','blade','blame','blank','blast'],'cl-':['clap','clue','clay','clip','club','claw','clam','class','clean','clear','click'],'fl-':['flag','flap','flat','flee','flip','flop','flew','flock','flame','flash'],'gl-':['glad','glob','glow','glue','glee','glass','glide'],'pl-':['play','plow','plan','plus','plug','plum','plop','plant','plate','plain'],'sl-':['slam','slap','sled','slid','slim','slip','slot','slow','slime','sleep','slide']},
  'R-Blends':{'br-':['brag','brat','bran','brew','brim','brick','bread','break','brave','brain'],'cr-':['crab','crew','crop','crow','cram','crack','crisp','cross','crowd','crown'],'dr-':['drip','drag','drop','draw','drum','dress','drink','drive','dream'],'fr-':['free','frog','from','fresh','fried','front','frost','fruit','frame'],'gr-':['grab','grid','grew','gram','grow','greed','green','grind','great','grade'],'tr-':['trip','true','tree','trim','trap','track','truck','trail','train','trace'],'pr-':['prey','prim','prod','press','pride','prime','print','prize','proud']},
  'S-Blends':{'sc-':['scan','scam','scum','scab','scar','scale','scare'],'sk-':['skin','skip','skim','skit','skill','skunk'],'sm-':['smog','smug','small','smart','smell','smile','smoke','smash'],'sn-':['snow','snap','snug','snip','snob','snore','sneak','snail'],'sp-':['spin','spit','spot','spun','spam','speak','spell','spend'],'st-':['star','stay','stem','stop','stir','stud','stand','store','steam','stone'],'sw-':['swan','swap','swim','sway','sweet','swing','swear','sweat']},
  'Digraphs':{'ch-':['chin','chip','chat','chew','chop','chair','chain','chest','check','child'],'sh-':['ship','shed','shoe','shop','shelf','shell','shift','short','sharp','shake'],'th-':['this','that','thin','thud','than','them','then','thick','think','three'],'wh-':['what','when','whip','wheel','whale','where','which','white','while','whole']},
  'R-Controlled':{'-ar':['car','arm','art','cart','dart','barn','bark','yard','scar','star','hard'],' -or':['corn','born','fork','horn','form','torn','sort','cord','pork','storm'],'-ir':['sir','dirt','bird','firm','girl','stir','third','shirt','first'],'-er':['her','term','germ','fern','tiger','water','after','cover','never'],'-ur':['fur','blur','curl','curb','burn','turn','hurt','burp','surf']},
  'Long Vowels':{'-ay':['day','say','way','hay','pay','bay','may','lay','ray','play','stay','away'],'-ea':['eat','pea','sea','tea','beak','beam','beat','deal','heat','leaf','read','team'],'-ee':['see','bee','feed','meet','feet','free','beef','need','keep','peel','tree','green'],'-oa':['oat','oak','boat','coal','coat','road','soap','foam','goal','soak','loan'],'-ow':['bow','row','low','own','tow','blow','slow','crow','flow','glow','grow','show']},
  'Magic -e':{'a_e':['cake','game','rate','made','page','cage','cave','cane','lake','lane','tape','brave','flame','grade','shake'],'i_e':['kite','dime','life','line','bike','ride','time','hide','dive','fine','pine','smile','write','pride'],'o_e':['bone','hope','code','vote','rose','nose','rope','hole','note','cone','stone','smoke','whole'],'u_e':['cube','huge','rule','tube','cute','tune','rude','mule','pure','cure','fuse']},
  'Diphthongs':{'-oi':['coin','join','boil','coil','soil','oil','foil','toil','point','noise'],'-oy':['boy','joy','coy','toy','ploy','soy','enjoy','royal','annoy'],'-ou':['out','loud','pout','cloud','pound','sound','round','scout','shout','mouth'],'-ow':['cow','bow','how','now','plow','vow','wow','owl','crowd','clown','gown','town']},
  'Glued Sounds':{'-ang':['bang','rang','sang','hang','gang','fang','clang','sprang'],'-ing':['ring','king','sing','wing','ding','ping','bring','spring','sting','swing','thing'],'-ong':['song','long','gong','strong','prong','along','belong'],'-ung':['rung','lung','sung','hung','young','stung','swung','clung'],'-ank':['bank','rank','tank','yank','sank','blank','plank','thank','spank','drank'],'-ink':['pink','rink','sink','wink','link','think','drink','brink','stink','shrink'],'-onk':['bonk','honk','monk','conk'],'-unk':['funk','junk','sunk','dunk','bunk','trunk','chunk','skunk','stunk']}
};

/* ═══════════════════════════════════════════════
   MISSING LETTER DATA
═══════════════════════════════════════════════ */
const ML_DATA=[
  // short -a
  {w:'cat',e:'🐱'},{w:'bat',e:'🦇'},{w:'hat',e:'🎩'},{w:'rat',e:'🐭'},{w:'mat',e:'🟫'},
  {w:'map',e:'🗺️'},{w:'fan',e:'🌀'},{w:'pan',e:'🍳'},{w:'can',e:'🥫'},{w:'van',e:'🚐'},
  {w:'jam',e:'🍓'},{w:'ham',e:'🥩'},{w:'bag',e:'👜'},{w:'cap',e:'🧢'},{w:'tap',e:'🚿'},
  {w:'sad',e:'😢'},{w:'dad',e:'👨'},{w:'mad',e:'😠'},{w:'cab',e:'🚕'},{w:'lab',e:'🔬'},
  {w:'nap',e:'😴'},{w:'lap',e:'🪑'},{w:'ram',e:'🐏'},{w:'yam',e:'🍠'},{w:'tag',e:'🏷️'},
  // short -e
  {w:'bed',e:'🛏️'},{w:'red',e:'🔴'},{w:'hen',e:'🐔'},{w:'pen',e:'✏️'},{w:'ten',e:'🔟'},
  {w:'web',e:'🕸️'},{w:'leg',e:'🦵'},{w:'jet',e:'✈️'},{w:'net',e:'🎾'},{w:'pet',e:'🐾'},
  {w:'set',e:'🎯'},{w:'bet',e:'🎲'},{w:'get',e:'🎁'},{w:'den',e:'🦊'},{w:'men',e:'👨‍👨‍👦'},
  {w:'peg',e:'📌'},{w:'keg',e:'🪣'},{w:'beg',e:'🙏'},{w:'fed',e:'🍽️'},{w:'led',e:'💡'},
  // short -i
  {w:'pig',e:'🐷'},{w:'big',e:'🐘'},{w:'dig',e:'⛏️'},{w:'wig',e:'👩'},{w:'zip',e:'🤐'},
  {w:'dip',e:'🍲'},{w:'sip',e:'🥤'},{w:'tip',e:'💡'},{w:'bit',e:'🦷'},{w:'fit',e:'💪'},
  {w:'hit',e:'🎯'},{w:'sit',e:'🪑'},{w:'bin',e:'🗑️'},{w:'pin',e:'📌'},{w:'tin',e:'🥫'},
  {w:'win',e:'🏆'},{w:'dim',e:'🕯️'},{w:'rim',e:'⚽'},{w:'nib',e:'✒️'},{w:'rib',e:'🥩'},
  {w:'lid',e:'🍳'},{w:'kid',e:'👧'},{w:'hid',e:'🙈'},{w:'mid',e:'🎯'},{w:'fig',e:'🍑'},
  // short -o
  {w:'fox',e:'🦊'},{w:'box',e:'📦'},{w:'pot',e:'🍲'},{w:'dot',e:'⚫'},{w:'hot',e:'🔥'},
  {w:'lot',e:'🅿️'},{w:'cot',e:'🛏️'},{w:'log',e:'🪵'},{w:'fog',e:'🌫️'},{w:'dog',e:'🐶'},
  {w:'hop',e:'🐸'},{w:'pop',e:'🎆'},{w:'top',e:'🔝'},{w:'mop',e:'🧹'},{w:'job',e:'💼'},
  {w:'sob',e:'😭'},{w:'cob',e:'🌽'},{w:'rob',e:'🦹'},{w:'nod',e:'😌'},{w:'pod',e:'🫛'},
  // short -u
  {w:'bug',e:'🐛'},{w:'hug',e:'🤗'},{w:'jug',e:'🫙'},{w:'mug',e:'☕'},{w:'rug',e:'🟫'},
  {w:'tug',e:'⛵'},{w:'cup',e:'☕'},{w:'bun',e:'🍞'},{w:'fun',e:'🎉'},{w:'sun',e:'☀️'},
  {w:'run',e:'🏃'},{w:'gum',e:'🍬'},{w:'sum',e:'➕'},{w:'bud',e:'🌱'},{w:'mud',e:'💧'},
  {w:'cut',e:'✂️'},{w:'hut',e:'🏚️'},{w:'nut',e:'🥜'},{w:'but',e:'🔘'},{w:'hub',e:'🎡'},
  {w:'rub',e:'🧴'},{w:'tub',e:'🛁'},{w:'cub',e:'🐻'},{w:'dub',e:'🎵'},{w:'sub',e:'🚢'}
];

/* ═══════════════════════════════════════════════
   SENTENCE DATA
═══════════════════════════════════════════════ */
const SENTENCES=[
  {e:'🐱',t:'The cat sits on the mat.'},
  {e:'🐶',t:'The dog likes to run fast.'},
  {e:'☀️',t:'The sun is big and hot.'},
  {e:'🐟🌊',t:'The fish lives in the sea.'},
  {e:'🚌',t:'I ride the big red bus.'},
  {e:'🐔🥚',t:'The hen has one egg.'},
  {e:'🍎',t:'The red apple is sweet.'},
  {e:'🐸',t:'The frog can jump very high.'},
  {e:'📚👧',t:'The girl likes to read books.'},
  {e:'🐻',t:'The big bear lives in the woods.'},
  {e:'🌸',t:'The pink flower smells nice.'},
  {e:'🚂',t:'The fast train goes choo choo.'},
  {e:'🦁',t:'The lion has a big mane.'},
  {e:'🍌🐒',t:'The monkey eats a banana.'},
  {e:'⭐🌙',t:'I can see stars and the moon.'},
  {e:'🐦',t:'The little bird can sing.'},
  {e:'🎈',t:'The red balloon went up high.'},
  {e:'🐢',t:'The turtle walks very slow.'},
  {e:'🐇',t:'The rabbit has long ears.'},
  {e:'🐝🌺',t:'The bee sits on a flower.'},
  {e:'🦋',t:'The butterfly has bright wings.'},
  {e:'🌈',t:'I see a rainbow in the sky.'},
  {e:'⛄',t:'We made a big snowman today.'},
  {e:'🎂',t:'I love my birthday cake.'},
  {e:'🚀',t:'The rocket goes to outer space.'},
  {e:'🐠',t:'The fish swims in the pond.'},
  {e:'🌻',t:'The sunflower is tall and yellow.'},
  {e:'🦉',t:'The owl hoots at night.'},
  {e:'🐞',t:'A ladybug has red and black wings.'},
  {e:'🏠',t:'Our home is on a big street.'},
  {e:'⚽',t:'I like to kick the ball.'},
  {e:'🎨',t:'She likes to draw and paint.'},
  {e:'🍦',t:'I love to eat ice cream.'},
  {e:'🦜',t:'The parrot can talk and sing.'},
  {e:'🐘',t:'The elephant has a long trunk.'},
  {e:'🦒',t:'The giraffe has a very long neck.'},
  {e:'🐋',t:'The whale lives in the big ocean.'},
  {e:'🌿',t:'Plants need water and sunlight.'},
  {e:'🍕',t:'Pizza is my favorite food.'},
  {e:'🎵',t:'I like to sing and dance.'},
  {e:'🚲',t:'I ride my bike to school.'},
  {e:'🌊',t:'Waves crash on the sandy beach.'},
  {e:'🦊',t:'The fox is quick and very smart.'},
  {e:'🌵',t:'A cactus grows in the hot desert.'},
  {e:'🦅',t:'The eagle can fly very high up.'},
  {e:'🍇',t:'Grapes grow on a vine.'},
  {e:'🦌',t:'The deer runs fast in the forest.'},
  {e:'🐧',t:'The penguin lives on ice and snow.'},
  {e:'🦆',t:'The duck swims in the pond.'},
  {e:'🍓',t:'Strawberries are red and very sweet.'},
  {e:'🥕',t:'Rabbits love to eat carrots.'},
  {e:'🌽',t:'Corn grows tall in the farm field.'},
  {e:'🍉',t:'Watermelon is cool and juicy.'},
  {e:'🌙',t:'The moon shines bright at night.'},
  {e:'🌅',t:'The sun rises in the morning.'},
  {e:'🏖️',t:'We play at the beach all day.'},
  {e:'🏔️',t:'The mountain is very tall and cold.'},
  {e:'🌲',t:'The tree has many green leaves.'},
  {e:'🍁',t:'Leaves fall from trees in autumn.'},
  {e:'❄️',t:'Snow is cold and white and soft.'},
  {e:'🐠🐡',t:'Many fish swim in the coral reef.'},
  {e:'🦀',t:'The crab walks sideways on the sand.'},
  {e:'🐙',t:'An octopus has eight long arms.'},
  {e:'🌈🌧️',t:'After the rain a rainbow appears.'},
  {e:'🏊',t:'I like to swim in the pool.'},
  {e:'🎸',t:'He plays the guitar every day.'},
  {e:'📖',t:'Reading books is so much fun.'},
  {e:'✏️📝',t:'We write and draw in class.'},
  {e:'🖍️',t:'I love to color with my crayons.'},
  {e:'🎒',t:'My backpack is red and blue.'},
  {e:'🏫',t:'I go to school every morning.'},
  {e:'👨‍🏫',t:'My teacher is very kind and nice.'},
  {e:'💤',t:'I go to sleep at eight o clock.'},
  {e:'🦓',t:'The zebra has black and white stripes.'},
  {e:'🌍',t:'The earth is round like a big ball.'},
  {e:'🦋',t:'A caterpillar turns into a butterfly.'},
  {e:'🎡',t:'The ferris wheel goes round and round.'},
  {e:'🎢',t:'The roller coaster is so very fast.'},
  {e:'🎪',t:'We went to a fun circus show.'},
  {e:'🐊',t:'The crocodile has very sharp teeth.'},
  {e:'🦚',t:'The peacock has bright colorful feathers.'},
  {e:'🦩',t:'The flamingo stands on one leg.'},
  {e:'🌄',t:'Sunrise is beautiful and bright.'},
  {e:'🌠',t:'A shooting star flies across the sky.'},
  {e:'🎠',t:'I love to ride the merry go round.'},
  {e:'🛝',t:'We love to slide down the slide.'},
  {e:'🐓',t:'The rooster crows in the morning.'},
  {e:'🦐',t:'The shrimp is small and pink.'},
  {e:'🌺',t:'Red roses are very pretty flowers.'},
  {e:'🍄',t:'The mushroom grows in the wet forest.'},
  {e:'🐺',t:'The wolf howls at the full moon.'},
  {e:'🦁🐯',t:'Lions and tigers are big wild cats.'},
  {e:'🌻🌼',t:'Flowers bloom in the warm spring.'},
  {e:'🐿️',t:'The squirrel hides nuts in the ground.'},
  {e:'🦔',t:'The hedgehog has tiny sharp spines.'},
  {e:'🐛',t:'The caterpillar eats green leaves.'},
  {e:'🦗',t:'Crickets sing loudly on summer nights.'},
  {e:'🌙⭐',t:'The night sky is full of bright stars.'},
  {e:'🌊🐬',t:'Dolphins jump and play in the waves.'},
  {e:'🐼',t:'The panda eats bamboo all day long.'},
  {e:'🦘',t:'The kangaroo has a pouch for her baby.'}
];

/* ═══════════════════════════════════════════════
   MATH LEVEL GENERATORS
═══════════════════════════════════════════════ */
const MATH_LEVELS={
  addition:[
    {desc:'Single digit\n1–9',    gen(){const a=ri(1,8),b=ri(1,9-a);return{a,b,op:'+',ans:a+b};}},
    {desc:'2-digit\nno carry',    gen(){let a,b;do{a=ri(11,49);b=ri(11,49);}while((a%10)+(b%10)>=10||Math.floor(a/10)+Math.floor(b/10)>=10);return{a,b,op:'+',ans:a+b};}},
    {desc:'2-digit\nwith carry',  gen(){let a,b;do{a=ri(15,79);b=ri(15,79);}while((a%10)+(b%10)<10||a+b>99);return{a,b,op:'+',ans:a+b};}},
    {desc:'3-digit\naddition',    gen(){const a=ri(100,499),b=ri(100,499);return{a,b,op:'+',ans:a+b};}},
    {desc:'Mixed\nchallenge',     gen(){const a=ri(50,999),b=ri(50,500);return{a,b,op:'+',ans:a+b};}}
  ],
  subtraction:[
    {desc:'Single digit\n1–9',    gen(){const b=ri(1,7),a=ri(b+1,9);return{a,b,op:'−',ans:a-b};}},
    {desc:'2-digit\nno borrow',   gen(){let a,b;do{a=ri(21,99);b=ri(10,a-10);}while((a%10)<(b%10)||Math.floor(a/10)<=Math.floor(b/10));return{a,b,op:'−',ans:a-b};}},
    {desc:'2-digit\nwith borrow', gen(){let a,b;do{a=ri(21,99);b=ri(12,a-1);}while((a%10)>=(b%10));return{a,b,op:'−',ans:a-b};}},
    {desc:'3-digit\nsubtraction', gen(){const b=ri(100,399),a=ri(b+50,900);return{a,b,op:'−',ans:a-b};}},
    {desc:'Mixed\nchallenge',     gen(){const b=ri(50,499),a=ri(b+1,999);return{a,b,op:'−',ans:a-b};}}
  ]
};

/* ═══════════════════════════════════════════════
   ORDERING / SKIP / CLOCK LEVEL DATA
═══════════════════════════════════════════════ */
const ORD_LEVELS=[
  {desc:'Numbers\n1 – 20',    max:20},
  {desc:'Numbers\n1 – 100',   max:100},
  {desc:'Numbers\n1 – 1000',  max:1000}
];

const SKIP_LEVELS=[
  {desc:'Count by 2s',  step:2},
  {desc:'Count by 5s',  step:5},
  {desc:'Count by 10s', step:10},
  {desc:'Count by 3s',  step:3},
  {desc:'Count by 4s',  step:4}
];

const CLK_LEVELS=[
  {desc:'Whole hours\n:00 only',   minutes:[0]},
  {desc:'Half hours\n:00 and :30', minutes:[0,30]},
  {desc:'Quarter hours\n:00 :15 :30 :45', minutes:[0,15,30,45]}
];

/* ═══════════════════════════════════════════════
   SCORE MESSAGES + CONFETTI COLORS
═══════════════════════════════════════════════ */
const OK_MSGS=['Hooray! 🎉','Amazing! 🌟','You Rock! 🚀','Brilliant! 💫','Superstar! ⭐','Fantastic! 🎊','Perfect! 🌈','Wonderful! 🥳'];
const OK_EMOJIS=['🎉','⭐','🌟','🏆','🥳','🎊','💫','✨'];
const BAD_EMOJIS=['🤔','💪','😅','🌈'];
const CC=['#FF6B6B','#4ECDC4','#45B7D1','#FFA07A','#FFD700','#DDA0DD','#87CEEB','#98FF98'];
