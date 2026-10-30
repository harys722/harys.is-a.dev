import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';

function geminiHarness(replies){
  class Element {
    constructor(tag='div'){this.tag=tag;this.value='';this.children=[];this.style={};this.listeners={};this._text='';}
    set textContent(value){this._text=String(value);this.children=[]}
    get textContent(){return this._text+this.children.map(child=>child.textContent).join('')}
    set innerHTML(value){throw new Error('Untrusted HTML rendering is forbidden in chat')}
    append(...children){this.children.push(...children)}
    appendChild(child){this.append(child)}
    replaceChildren(...children){this.children=children;this._text='';if(this.tag==='select')this.value=children[0]?.value||''}
    addEventListener(name,fn){this.listeners[name]=fn}
    focus(){}
  }
  const elements=new Map(),hooks={},calls=[],copied=[];
  const get=id=>{if(!elements.has(id))elements.set(id,new Element(id==='modelSelect'?'select':'div'));return elements.get(id)};
  const context=vm.createContext({
    document:{getElementById:get,createElement:tag=>new Element(tag),createTextNode:text=>{const node=new Element('text');node.textContent=text;return node}},
    addEventListener:(name,fn)=>hooks[name]=fn,AbortController,URLSearchParams,TypeError,setTimeout,clearTimeout,
    navigator:{clipboard:{writeText:async text=>copied.push(text)}},
    localStorage:new Proxy({},{get(){throw new Error('Keys must not be stored')}}),
    sessionStorage:new Proxy({},{get(){throw new Error('Keys must not be stored')}}),
    fetch:async(url,options)=>{
      assert(url.startsWith('https://generativelanguage.googleapis.com/v1beta/'));
      assert(!url.includes('test-key-not-real'));assert(!new URL(url).searchParams.has('key'));
      assert.equal(options.headers['x-goog-api-key'],'test-key-not-real');
      assert.equal(options.cache,'no-store');assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');
      calls.push({url,options});assert(replies.length,'Unexpected API call');const reply=replies.shift();
      return typeof reply==='function'?reply():{ok:!(reply.status>=400),status:reply.status||200,json:async()=>reply.data};
    }
  });
  vm.runInContext(readFileSync('public/assets/js/gat.js','utf8'),context);
  return {get,hooks,calls,copied,context,state:()=>vm.runInContext('({apiKey,availableModels,selectedModel,chatHistory,busy})',context)};
}
const listModels=[
  {data:{models:[{name:'models/gemini-test-flash',supportedGenerationMethods:['generateContent']},{name:'models/gemini-test-image',supportedGenerationMethods:['generateContent']}],nextPageToken:'next'}},
  {data:{models:[{name:'models/gemini-test-flash-lite',supportedGenerationMethods:['generateContent']},{name:'models/text-embedding-test',supportedGenerationMethods:['embedContent']}]}}
];
const answer=parts=>({data:{candidates:[{content:{role:'model',parts}}]}});
const gemini=geminiHarness([...listModels,answer([{text:'OK'}]),answer([{thought:true,text:'Private reasoning'},{text:'First',thoughtSignature:'opaque-signature'},{text:'Second'}]),{status:429,data:{error:{message:'Quota exceeded'}}},answer([{text:'Done'}])]);
gemini.get('apiKey').value='test-key-not-real';await gemini.context.testApiKey();
assert.equal(gemini.get('modelSelect').children.length,2);assert(gemini.calls[1].url.includes('pageToken=next'));
assert.equal(gemini.get('modelSelect').value,'models/gemini-test-flash-lite');
await gemini.context.testApiKey();assert.equal(gemini.get('chatContainer').style.display,'flex');assert.equal(gemini.get('apiKey').value,'');
gemini.get('chatInput').value='<img src=x onerror=alert(1)>';await gemini.context.sendMessage();
assert(gemini.get('chatMessages').textContent.includes('<img src=x onerror=alert(1)>'));
assert(gemini.get('chatMessages').textContent.includes('First\nSecond'));assert(!gemini.get('chatMessages').textContent.includes('Private reasoning'));
assert.equal(gemini.state().chatHistory[1].parts[1].thoughtSignature,'opaque-signature');
gemini.get('chatInput').value='Retry this';await gemini.context.sendMessage();
assert(gemini.get('chatMessages').textContent.includes('quota'));assert.equal(gemini.state().chatHistory.length,2);assert.equal(gemini.get('chatInput').value,'Retry this');
await gemini.context.sendMessage();
assert.equal(JSON.parse(gemini.calls.at(-1).options.body).contents.length,3);assert.equal(gemini.state().chatHistory.length,4);
gemini.context.newChat();assert.equal(gemini.state().chatHistory.length,0);assert.equal(gemini.state().selectedModel,'models/gemini-test-flash-lite');
const example='Example:\n```js\nconst html = "<img src=x>";\n```';
gemini.context.addMessage(example,'ai');
const find=(node,test)=>test(node)?node:node.children.map(child=>find(child,test)).find(Boolean);
const codeBlock=find(gemini.get('chatMessages'),node=>node.className==='code-block');assert(codeBlock);
const copyCode=find(codeBlock,node=>node.tag==='button');await copyCode.onclick();assert.equal(gemini.copied[0],'const html = "<img src=x>";\n');
let prevented=false;gemini.context.handleKeyPress({key:'Enter',shiftKey:true,preventDefault(){prevented=true}});assert.equal(prevented,false);
gemini.context.goBack();assert.equal(gemini.state().selectedModel,'');assert.equal(gemini.state().chatHistory.length,0);assert.equal(gemini.get('apiKey').value,'test-key-not-real');
gemini.context.clearSession();assert.equal(gemini.state().apiKey,'');assert.equal(gemini.state().chatHistory.length,0);assert.equal(gemini.get('apiKey').value,'');
const denied=geminiHarness([{status:400,data:{error:{message:'API key not valid: test-key-not-real'}}}]);
denied.get('apiKey').value='test-key-not-real';await denied.context.testApiKey();
assert(denied.get('status').textContent.includes('rejected'));assert(!denied.get('status').textContent.includes('test-key-not-real'));assert.equal(denied.state().busy,false);
const retired=geminiHarness([...listModels,{status:404,data:{error:{message:'Model not found'}}}]);
retired.get('apiKey').value='test-key-not-real';await retired.context.testApiKey();await retired.context.testApiKey();
assert(retired.get('status').textContent.includes('model is unavailable'));assert(!retired.get('status').textContent.includes('rejected'));
const longQuota='Quota exceeded for metric: generativelanguage.googleapis.com/'+('generate_content_free_tier_input_token_count_'.repeat(45))+', limit: 0. See https://ai.google.dev/gemini-api/docs/rate-limits. END_OF_DETAILS';
const quota=gemini.context.readableError(429,{error:{message:longQuota}},'test-key-not-real');
assert(quota.message.length<200);assert(quota.message.includes('zero quota'));assert.equal(quota.providerDetails,longQuota);
gemini.context.showStatus(quota);const detailBox=find(gemini.get('status'),node=>node.tag==='details');assert(detailBox);assert.notEqual(detailBox.open,true);assert(detailBox.textContent.includes('END_OF_DETAILS'));
gemini.context.addMessage(quota,'error');assert(find(gemini.get('chatMessages'),node=>node.className==='message error'));
const stopping=geminiHarness([...listModels,answer([{text:'OK'}]),()=>new Promise((resolve,reject)=>stopping.calls.at(-1).options.signal.addEventListener('abort',()=>{const error=new Error('aborted');error.name='AbortError';reject(error)}))]);
stopping.get('apiKey').value='test-key-not-real';await stopping.context.testApiKey();await stopping.context.testApiKey();
stopping.get('chatInput').value='Stop this request';const pendingChat=stopping.context.sendMessage();assert.equal(stopping.get('stopBtn').hidden,false);stopping.context.stopRequest();await pendingChat;
assert.equal(stopping.state().busy,false);assert.equal(stopping.state().chatHistory.length,0);assert.equal(stopping.get('chatInput').value,'Stop this request');assert(stopping.get('chatMessages').textContent.includes('Response stopped'));
let finishRequest;
const clearing=geminiHarness([()=>new Promise(resolve=>finishRequest=resolve)]);
clearing.get('apiKey').value='test-key-not-real';const pendingLoad=clearing.context.testApiKey();clearing.context.clearSession();
finishRequest({ok:true,status:200,json:async()=>listModels[0].data});await pendingLoad;
assert.equal(clearing.state().apiKey,'');assert.equal(clearing.state().availableModels.length,0);assert.equal(clearing.get('modelGroup').hidden,true);
gemini.hooks.pagehide();assert.equal(gemini.state().apiKey,'');
console.log('Gemini: model/chat flow, long quota details, code copying, multiline input, stop/new chat, retries, key clearing and safe rendering passed with mocked Google responses.');

const calendars=['ramadan','eid'].map(name=>{
  const source=readFileSync('public/assets/js/'+name+'.js','utf8').split('// Page code')[0];
  return vm.runInNewContext(source+';({eventCycle,countdownValues,hijriFormatter})',{Intl,Date});
});
const {eventCycle,countdownValues,hijriFormatter}=calendars[0];

const formatter=hijriFormatter();
const parts=date=>Object.fromEntries(formatter.formatToParts(date).filter(p=>['year','month','day'].includes(p.type)).map(p=>[p.type,Number(p.value)]));
for(let year=2026;year<=2060;year++)for(let month=0;month<12;month++)for(const [hm,first,last] of [[9,1,30],[12,10,12]]){
  const now=new Date(year,month,15,12),cycle=eventCycle(hm,first,last,now);
  const independent=calendars[1].eventCycle(hm,first,last,now);
  assert.equal(+cycle.start,+independent.start);assert.equal(+cycle.end,+independent.end);
  assert(cycle.end>now);assert(cycle.end>cycle.start);
  assert.equal(parts(cycle.start).month,hm);assert.equal(parts(cycle.start).day,first);
  assert.equal(cycle.active,cycle.start<=now);
}
for(const spec of [[9,1,30],[12,10,12]]){
  const cycle=eventCycle(...spec,new Date(2026,0,1));
  const before=new Date(cycle.start.getTime()-1);
  assert.equal(eventCycle(...spec,before).active,false);
  assert.equal(eventCycle(...spec,cycle.start).active,true);
  assert.equal(eventCycle(...spec,new Date(cycle.end.getTime()-1)).active,true);
  const next=eventCycle(...spec,cycle.end);
  assert.equal(next.active,false);assert(next.year>cycle.year);
}
assert.deepEqual(Array.from(countdownValues(new Date(90061000),new Date(0))),[1,1,1,1]);
assert.deepEqual(Array.from(countdownValues(new Date(0),new Date(1))),[0,0,0,0]);
assert.equal(formatter.resolvedOptions().calendar,'islamic-umalqura');
console.log('Calendar: 840 monthly samples through 2060 and exact observance boundaries passed.');

// Execute the complete script referenced by each built page as a classic browser
// script. Checking only the calendar helper did not catch HTML/script mismatches.
for(const name of ['ramadan','eid-ul-adha']){
  const page=readFileSync('dist/events/'+name+'.html','utf8');
  const scriptPath=new URL(page.match(/<script src="([^"]+)"/)[1],'https://harys.is-a.dev/events/'+name+'.html').pathname;
  assert(/\.[a-f0-9]{12}\.js$/.test(scriptPath),'Standalone scripts must bypass older offline-cache filenames');
  let now=Date.UTC(2026,9,30,5),interval;
  class Clock extends Date { constructor(...args){super(...(args.length?args:[now]))} static now(){return now} }
  const element=()=>({textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},appendChild(){}});
  const elements=new Map();const get=id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id)};
  const document={getElementById:get,querySelector:()=>get('countdown-label'),createElement:element};
  const script=new vm.Script(readFileSync('dist'+scriptPath,'utf8'),{filename:scriptPath});
  script.runInNewContext({document,Date:Clock,Intl,Math,String,Number,Object,Error,parseInt,setTimeout:()=>0,setInterval:fn=>interval=fn});
  assert(Number(get('days').textContent)>0,`${name} renders a countdown`);
  assert(get('expected-date').textContent.includes('2027'),`${name} renders the expected date`);
  const before=get('seconds').textContent;now+=2000;interval();assert.notEqual(get('seconds').textContent,before,`${name} ticks`);
}
console.log('Events: complete versioned page scripts render dates and ticking countdowns.');

const compile=path=>ts.transpileModule(readFileSync(path,'utf8').replace(/^import[^\n]+\r?\n/gm,''),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const trafficCode=compile('src/pages/traffic.ts');
const {ROAD,trafficRow,hitsCar,trafficSpeed}=await import('data:text/javascript;base64,'+Buffer.from(trafficCode).toString('base64'));
assert(trafficSpeed(30)>trafficSpeed(0));assert(trafficSpeed(60)>trafficSpeed(30));assert.equal(trafficSpeed(10000),ROAD.maxSpeed);
assert.equal(trafficSpeed(0),85);assert.equal(trafficSpeed(8),85);assert(ROAD.maxSpeed<300);
let seed=28;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
for(let score=0;score<100;score++)for(let i=0;i<100;i++){
  const row=trafficRow(score,random);assert(row.length>=1&&row.length<=2);assert.equal(new Set(row).size,row.length);
  if(score<6)assert.equal(row.length,1);
  assert(ROAD.centers.some((_,lane)=>!row.includes(lane)),'Every traffic row must leave an open lane');
}
const clearTime=(ROAD.rowGap-2*ROAD.carHeight)/ROAD.maxSpeed;
assert(clearTime>200/ROAD.laneSpeed+.35,'Allow a two-lane change plus reaction time between rows at maximum speed');
assert(hitsCar(180,180,ROAD.playerY));assert(!hitsCar(80,180,ROAD.playerY));
assert(!hitsCar(180,180,ROAD.playerY-ROAD.carHeight));
console.log('Traffic: 10,000 row patterns leave an open lane; maximum-speed clearance and collision margins passed.');

const gameCode=compile('src/pages/games.ts');
const {advanceSnake,dinoGap,dinoSpeed,snakeInterval,dinoHitsObstacle}=await import('data:text/javascript;base64,'+Buffer.from(gameCode).toString('base64'));
assert.equal(dinoSpeed(0),3.6);assert.equal(dinoSpeed(8),3.6);assert(dinoSpeed(60)>dinoSpeed(30));assert.equal(dinoSpeed(10000),7.6);
assert.equal(snakeInterval(0),240);assert.equal(snakeInterval(8),240);assert(snakeInterval(60)<snakeInterval(30));assert.equal(snakeInterval(10000),140);
const flying={k:3,x:50,w:36,yo:28},cactus={k:1,x:50,w:18,h:40};
assert(dinoHitsObstacle(flying,0,false),'Standing Dino collides with a mid-height bird');
assert(!dinoHitsObstacle(flying,0,true),'Crouching Dino fits beneath a mid-height bird');
assert(!dinoHitsObstacle(flying,-70,false),'A well-timed jump clears a mid-height bird');
assert(dinoHitsObstacle(cactus,0,true),'Crouching does not bypass ground obstacles');
assert(!dinoHitsObstacle(cactus,-60,false),'Jumping still clears cacti');
assert(!dinoHitsObstacle({...flying,x:180},0,false),'Distant birds do not collide');
assert(!dinoHitsObstacle({...flying,yo:62},0,false),'High birds pass above a standing Dino');
assert(dinoHitsObstacle({...flying,yo:62},-20,true),'Holding duck in the air does not shrink the jumping collision box');
console.log('Difficulty: all three games start gently, ramp with active play and reach fixed caps. Dino: duck/jump bird clearance and cactus collisions passed.');
assert(advanceSnake([[1,1],[1,2],[0,2],[0,1]],[-1,0],[3,3],4),'Snake can enter a tail cell that is being vacated');
assert.equal(advanceSnake([[1,1],[1,2],[0,2],[0,1]],[0,1],[3,3],4),null,'Snake still collides with its body');
assert.equal(advanceSnake([[0,0],[1,0]],[-1,0],[3,3],4),null);
const full=advanceSnake([[0,0],[0,1],[1,1]],[1,0],[1,0],2);assert(full.won);assert.equal(full.snake.length,4);
for(let speed=3.6;speed<=7.6;speed+=.5)assert(dinoGap(speed,()=>0)/speed>=48,'Dino obstacles allow jump and recovery time as speed increases');
console.log('Snake: tail clearance, body/wall collisions and a full-board win passed. Dino: speed-scaled obstacle spacing passed.');

const worker=readFileSync('dist/sw.js','utf8');
const paths=JSON.parse(worker.match(/const PRECACHE = (\[[^;]+\]);/)[1]);
for(const path of paths)assert(existsSync('dist'+path),`Missing precache file ${path}`);
for(const asset of paths.filter(path=>/^\/assets\/(css|js)\//.test(path)))assert(/\.[a-f0-9]{12}\.(css|js)$/.test(asset),'Version every standalone asset');
assert(paths.includes('/events/eid-ul-adha.html'));assert(!paths.some(path=>path.includes('hajj')));
assert(!existsSync('dist/events/hajj.html'));assert(!existsSync('dist/event/hajj.html'));
assert(!existsSync('dist/images/index.html'));assert(!existsSync('dist/tools/index.html'));
assert.equal(readFileSync('dist/index.html','utf8').match(/<title>(.*?)<\/title>/)[1],'Harys');
for(const slug of ['ansi-text-colorizer','color-picker','discord-embed-builder','gemini-api-tester','password-generator','timestamp-generator']){
  const page=readFileSync('dist/tools/'+slug+'.html','utf8');
  assert(page.includes('Tools by Harys'));assert(!/©|All rights reserved|2025/.test(page.match(/<footer[\s\S]*?<\/footer>/)[0]));
}
const html=readFileSync('dist/projects.html','utf8');
const walk=directory=>readdirSync(directory).flatMap(name=>{const file=directory+'/'+name;return statSync(file).isDirectory()?walk(file):[file]});
let references=0;
for(const file of walk('dist').filter(file=>file.endsWith('.html'))){
  for(const match of readFileSync(file,'utf8').matchAll(/(?:src|href)=["']([^"']+)["']/g)){
    if(/^(https?:|\/\/|data:|#|mailto:|javascript:)/.test(match[1]))continue;
    const url=new URL(match[1],'https://harys.is-a.dev/'+file.slice(5));
    if(/^\/(app|assets|images)\//.test(url.pathname)||url.pathname==='/favicon.ico'){
      assert(existsSync('dist'+decodeURIComponent(url.pathname)),`Missing dependency ${url.pathname} in ${file}`);references++;
    }
  }
}
console.log(`Pages: ${references} local asset references resolve; no deleted dependencies remain linked.`);
assert(html.includes('Free Domains'));assert(html.includes('<main id="page-content">'));
assert(html.includes('<link rel="canonical" href="https://harys.is-a.dev/projects">'));
assert(readFileSync('dist/sitemap.xml','utf8').includes('/game/traffic'));
assert(readFileSync('dist/404.html','utf8').includes('noindex,follow'));
assert(!JSON.parse(readFileSync('vercel.json','utf8')).rewrites?.some(rule=>rule.source==='/(.*)'));

const listeners={},store=new Map();let deleted=[],network=false;
const cache={addAll:async list=>{for(const path of list)store.set(path,new Response(readFileSync('dist'+path)))},match:async path=>{
  const response=store.get(path)?.clone();
  // Simulate Vercel following /index.html -> / and /about.html -> /about.
  if(response&&path.endsWith('.html'))Object.defineProperty(response,'redirected',{value:true});
  return response;
}};
vm.runInNewContext(worker,{
  self:{location:{origin:'https://harys.is-a.dev'},clients:{claim:async()=>{}},addEventListener:(name,listener)=>listeners[name]=listener},
  caches:{open:async()=>cache,keys:async()=>['harys-desktop-old','other-app-cache'],delete:async name=>deleted.push(name)},
  fetch:async()=>{if(!network)throw new Error('Offline');return new Response('Network response')},URL,Response,Set
});
let pending;listeners.install({waitUntil:promise=>pending=promise});await pending;
listeners.activate({waitUntil:promise=>pending=promise});await pending;
assert.deepEqual(deleted,['harys-desktop-old']);
async function request(path,mode='navigate',method='GET'){
  let result;listeners.fetch({request:{url:new URL(path,'https://harys.is-a.dev').href,mode,method},respondWith:promise=>result=promise});
  return result;
}
for(const path of ['/','/index.html','/about','/about/','/projects?test=1','/game/traffic','/events/ramadan.html','/events/eid-ul-adha','/tools/password-generator.html']){
  const response=await request(path);assert(response?.ok,`Offline route ${path}`);assert.equal(response.redirected,false,`Offline navigation must not return a redirected response: ${path}`);assert((await response.text()).includes('<html'));
}
const missing=await request('/random-missing-page');assert.equal(missing.redirected,false);assert((await missing.text()).includes('id="root"'));
assert.equal(await request('https://example.com/api','cors'),undefined);
assert.equal(await request('/api','cors','POST'),undefined);
assert.equal(await request('/unlisted-resource','cors'),undefined);
network=true;assert.equal(await (await request('/about')).text(),'Network response');
console.log(`Build: metadata, 404, sitemap and ${paths.length} offline assets passed. Worker: install, activation, offline navigation and network exclusions passed.`);
