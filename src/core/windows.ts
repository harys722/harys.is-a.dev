// @ts-nocheck
import {PAGE_HTML} from '../pages/html';
import {navigate} from './navigation';
import {frameUI} from './offline';
import {$} from './util';
import {APPS, TOOLS} from '../data/apps';
import {S, sbFrame, settingsUI} from './settings';
import {calendarUI} from '../pages/calendar';
import {PAGES, pageUI, timeUI, welcomeUI} from '../pages/pages';
import {gameUI} from '../pages/games';
import {showCtx} from './contextmenu';

let tbMoved=false;
function tbDrag(b){
  b.addEventListener('pointerdown',e=>{if(e.button)return;const x0=e.clientX;let on=false;
    const mv=ev=>{if(!on){if(Math.abs(ev.clientX-x0)<6)return;on=true;b.classList.add('drag')}
      const o=[...b.parentNode.children].find(c=>{if(c===b)return false;const r=c.getBoundingClientRect();return ev.clientX>r.left&&ev.clientX<r.right});
      if(o){const r=o.getBoundingClientRect(),fol=b.compareDocumentPosition(o)&4;
        if(fol&&ev.clientX>r.left+r.width/2)o.after(b);else if(!fol&&ev.clientX<r.left+r.width/2)o.before(b)}};
    const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);b.classList.remove('drag');
      if(on){tbMoved=true;setTimeout(()=>tbMoved=false,60)}};
    addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up)});
}
export const wins={};
export let z=10,count=0,sel=null,deskOn={v:true};
function place(el){el.style.left=Math.max(0,(innerWidth-el.offsetWidth)/2)+'px';el.style.top=Math.max(0,(innerHeight-44-el.offsetHeight)/2)+'px'}
function setHash(id){navigate(id);document.title=id&&APPS[id]?APPS[id].t+' - Harys':'Harys'}
export function open(id){
  const a=APPS[id];if(!a)return;
  let w=wins[id];
  if(w){if(id==='not-found')w.el.querySelector('.missing-path').textContent=location.pathname;w.el.hidden=false;focus(id);return}
  const el=document.createElement('section');
  el.className='win';el.setAttribute('role','dialog');el.setAttribute('aria-label',a.t);
  el.style.width=Math.min(a.w,innerWidth-16)+'px';el.style.height=Math.min(a.h,innerHeight-80)+'px';
  el.innerHTML=`<header class="bar"><svg class="ic"><use href="#${a.i}"/></svg><b>${a.t}</b><span class="btns"><button data-a="min" aria-label="Minimize">_</button><button data-a="max" aria-label="Maximize">&#9633;</button><button data-a="x" aria-label="Close">&times;</button></span></header><div class="body"></div>${['n','s','e','w','ne','nw','se','sw'].map(d=>`<i class="rz" data-d="${d}"></i>`).join('')}`;
  const body=$('.body',el);
  if(a.src)body.append(frameUI(a, sbFrame));
  else if(id==='not-found'){
    body.innerHTML='<div class="pad"><h1>404 · Page not found</h1><p>This address does not lead to a page on my desktop.</p><p class="missing-path"></p><button class="btn" data-home>Back to desktop</button> <button class="btn ghost" data-open="contact">Contact me</button></div>';
    body.querySelector('.missing-path').textContent=location.pathname;
    body.querySelector('[data-home]').onclick=()=>{close(id);if(Object.values(wins).some(w=>!w.el.hidden))showDesk()};
  }
  else if(id==='settings')body.append(settingsUI());
  else if(id==='welcome')body.append(welcomeUI());
  else if(id==='time')body.append(timeUI());
  else if(id==='calendar')body.append(calendarUI(S.mon));
  else if(id.startsWith('game/'))body.append(gameUI(id));
  else if(PAGES[id])body.append(pageUI(id));
  else{{const t=document.createElement('template');t.innerHTML=PAGE_HTML[id];body.append(t.content)}
    if(id==='tools')$('#toolgrid',body).innerHTML=TOOLS.map(([s,t,u,i])=>`<button data-open="tool/${s}"><svg class="ic"><use href="#${i}"/></svg>${t}</button>`).join('')}
  document.body.append(el);place(el);
  const tb=document.createElement('button');tb.innerHTML=`<svg class="ic"><use href="#${a.i}"/></svg><span>${a.t}</span>`;tb.onauxclick=e=>{if(e.button===1)close(id)};tb.oncontextmenu=e=>{e.preventDefault();showCtx(e.clientX,e.clientY,[[el.hidden?'Restore':'Minimize',()=>tb.click()],['Maximize',()=>{el.hidden=false;el.classList.toggle('max');focus(id)}],['Close',()=>close(id)]])};tbDrag(tb);tb.onclick=()=>{if(tbMoved)return;
    if(el.hidden){el.hidden=false;focus(id)}else if(w.el.classList.contains('on'))minimize(id);else focus(id)};
  $('#tasks').append(tb);
  w=wins[id]={el,tb};
  el.addEventListener('pointerdown',()=>focus(id),true);
  $('.btns',el).onclick=e=>{const b=e.target.closest('button');if(!b)return;
    ({min:()=>minimize(id),max:()=>el.classList.toggle('max'),x:()=>close(id)})[b.dataset.a]()};
  $('.bar',el).ondblclick=e=>{if(!e.target.closest('button'))el.classList.toggle('max')};
  drag(el);resize(el);focus(id);
}
function focus(id){
  const w=wins[id];if(!w)return;
  w.el.style.zIndex=++z;deskOn.v=false;
  Object.entries(wins).forEach(([k,v])=>{const on=k===id;v.el.classList.toggle('on',on);v.tb.classList.toggle('on',on);v.tb.classList.toggle('min',v.el.hidden)});
  setHash(id);
}
function minimize(id){const w=wins[id];w.el.hidden=true;w.tb.classList.remove('on');w.tb.classList.add('min');
  const next=Object.keys(wins).filter(k=>!wins[k].el.hidden).pop();next?focus(next):setHash('')}
export function close(id){const w=wins[id];w.el.remove();w.tb.remove();delete wins[id];
  const next=Object.keys(wins).filter(k=>!wins[k].el.hidden).pop();next?focus(next):setHash('')}
function drag(el){
  const bar=$('.bar',el);let sx,sy,ox,oy,on=false;
  bar.addEventListener('pointerdown',e=>{if(e.target.closest('button')||el.classList.contains('max')||(innerWidth<820||innerHeight<520))return;
    on=true;sx=e.clientX;sy=e.clientY;ox=el.offsetLeft;oy=el.offsetTop;bar.setPointerCapture(e.pointerId);bar.classList.add('gr')});
  bar.addEventListener('pointermove',e=>{if(!on)return;
    el.style.left=Math.max(-el.offsetWidth+80,Math.min(ox+e.clientX-sx,innerWidth-80))+'px';
    el.style.top=Math.max(0,Math.min(oy+e.clientY-sy,innerHeight-80))+'px'});
  const end=()=>{on=false;bar.classList.remove('gr')};
  bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);
}
function resize(el){
  let g=null;
  el.querySelectorAll('.rz').forEach(hd=>{
    hd.addEventListener('pointerdown',e=>{if(el.classList.contains('max'))return;e.stopPropagation();
      g={d:hd.dataset.d,x:e.clientX,y:e.clientY,l:el.offsetLeft,t:el.offsetTop,w:el.offsetWidth,h:el.offsetHeight};hd.setPointerCapture(e.pointerId)});
    hd.addEventListener('pointermove',e=>{if(!g)return;const dx=e.clientX-g.x,dy=e.clientY-g.y,d=g.d;let l=g.l,t=g.t,w=g.w,h=g.h;
      if(d.includes('e'))w=Math.max(300,g.w+dx);
      if(d.includes('s'))h=Math.max(180,g.h+dy);
      if(d.includes('w')){w=Math.max(300,g.w-dx);l=g.l+g.w-w}
      if(d.includes('n')){t=Math.max(0,Math.min(g.t+dy,g.t+g.h-180));h=g.t+g.h-t}
      Object.assign(el.style,{left:l+'px',top:t+'px',width:w+'px',height:h+'px'})});
    hd.addEventListener('pointerup',()=>g=null);hd.addEventListener('pointercancel',()=>g=null)});
}
export function resetWins(){Object.values(wins).forEach((w,i)=>{w.el.classList.remove('max');w.el.hidden=false;place(w.el,i)})}
let hid=[];
export function showDesk(){const vis=Object.keys(wins).filter(k=>!wins[k].el.hidden);
  if(vis.length){hid=vis;vis.forEach(k=>{wins[k].el.hidden=true;wins[k].tb.classList.remove('on');wins[k].tb.classList.add('min')});setHash('')}
  else{const back=hid.filter(k=>wins[k]);back.forEach(k=>wins[k].el.hidden=false);if(back.length)focus(back[back.length-1])}}
addEventListener('resize',()=>Object.values(wins).forEach(w=>{const e=w.el;if(e.classList.contains('max'))return;
  if(e.offsetWidth>innerWidth)e.style.width=innerWidth+'px';
  e.style.left=Math.max(0,Math.min(e.offsetLeft,innerWidth-e.offsetWidth))+'px';e.style.top=Math.max(0,Math.min(e.offsetTop,innerHeight-44-e.offsetHeight))+'px'}));
