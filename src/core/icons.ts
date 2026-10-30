// @ts-nocheck
import {$, lk, sv} from './util';

// Resolve each viewport from the saved intention, never from a previous resize.
// Right-side shortcuts use the right edge rather than a stale grid column.
export function desktopLayout(items,width,height,card,preferences={}){
  const px=14,cw=96,ch=100,size=92,bottom=height-44-px;
  const rows=Math.max(1,Math.floor((bottom-px-size)/ch)+1);
  const columns=Math.max(1,Math.floor((width-px*2-size)/cw)+1);
  const result={},occupied=[];
  const overlaps=(a,b)=>a[0]<b[0]+b[2]&&a[0]+a[2]>b[0]&&a[1]<b[1]+b[3]&&a[1]+a[3]>b[1];
  const point=(side,col,row)=>[side==='right'?width-px-size-col*cw:px+col*cw,px+row*ch];
  const counts={left:0,right:0};
  for(const item of items){
    const side=item.right?'right':'left',n=counts[side]++;
    const pref=preferences[item.key];
    const target=pref?point(pref.side,Math.min(columns-1,Math.max(0,pref.col||0)),Math.min(rows-1,Math.max(0,pref.row||0))):point(side,Math.floor(n/rows),n%rows);
    let best=null,distance=Infinity;
    for(const edge of [side,side==='right'?'left':'right'])for(let col=0;col<columns;col++)for(let row=0;row<rows;row++){
      const p=point(edge,col,row),box=[...p,size,size];
      if(p[0]<px||p[0]+size>width-px||p[1]+size>bottom||occupied.some(b=>overlaps(box,b))||(card&&overlaps(box,card)))continue;
      const d=(p[0]-target[0])**2+(p[1]-target[1])**2;
      if(d<distance){best=p;distance=d;}
    }
    if(best){result[item.key]=best;occupied.push([...best,size,size])}
  }
  return result;
}

export const desk=$('#desk'),CW=96,CH=100,PX=14;
const saved=lk('hs.layout',{});
let preferences=saved.custom||{},sorted=!!saved.sorted;
export let pos={v:{}},dragged=false,dg=null;
export const icons=()=>[...desk.querySelectorAll('.icon')];
const save=()=>sv('hs.layout',{custom:preferences,sorted});
function put(ic){const p=pos.v[ic.dataset.k];if(p){ic.style.left=p[0]+'px';ic.style.top=p[1]+'px'}}
export function arrange(order){
  preferences={};sorted=!!order;save();
  dispatchEvent(new Event('desktop-arrange'));relayout();
}
export function relayout(){
  if(innerWidth<=820||innerHeight<=520)return;
  const all=icons();if(sorted)all.sort((a,b)=>a.textContent.trim().localeCompare(b.textContent.trim()));
  const card=$('#card'),b=card.getBoundingClientRect();
  pos.v=desktopLayout(all.map(ic=>({key:ic.dataset.k,right:!sorted&&!!ic.dataset.r})),innerWidth,innerHeight,!card.hidden&&b.width&&b.height?[b.left-8,b.top-8,b.width+16,b.height+16]:null,preferences);
  all.forEach(put);
}
export const sortIcons=()=>arrange(icons().sort((a,b)=>a.textContent.trim().localeCompare(b.textContent.trim())));
export function pick(b,e){const m=e.ctrlKey||e.metaKey||e.shiftKey;
  if(!m)document.querySelectorAll('.icon.sel').forEach(i=>i!==b&&i.classList.remove('sel'));
  b.classList.toggle('sel',m?!b.classList.contains('sel'):true)}
document.addEventListener('click',e=>{const a=e.target.closest('a.icon');if(a)pick(a,e)});
document.addEventListener('click',e=>{if(dragged){e.stopImmediatePropagation();e.preventDefault()}},true);
desk.addEventListener('dragstart',e=>e.preventDefault());
desk.addEventListener('pointerdown',e=>{const ic=e.target.closest('.icon');if(!ic||e.button||(innerWidth<820||innerHeight<520))return;
  const g=(ic.classList.contains('sel')?icons().filter(i=>i.classList.contains('sel')):[ic]).map(i=>({i,ox:i.offsetLeft,oy:i.offsetTop}));
  dg={ic,sx:e.clientX,sy:e.clientY,g,on:false};ic.setPointerCapture(e.pointerId)});
desk.addEventListener('pointermove',e=>{if(!dg)return;const dx=e.clientX-dg.sx,dy=e.clientY-dg.sy;
  if(!dg.on&&Math.hypot(dx,dy)<6)return;dg.on=true;
  dg.g.forEach(({i,ox,oy})=>{i.classList.add('drag');i.style.left=Math.max(0,Math.min(ox+dx,innerWidth-92))+'px';i.style.top=Math.max(0,Math.min(oy+dy,innerHeight-44-92))+'px'})});
const drop=()=>{if(!dg)return;const {g,on}=dg;dg=null;if(!on)return;
  g.forEach(({i})=>{i.classList.remove('drag');const right=i.offsetLeft+46>innerWidth/2;
    preferences[i.dataset.k]={side:right?'right':'left',col:Math.max(0,Math.round((right?innerWidth-PX-92-i.offsetLeft:i.offsetLeft-PX)/CW)),row:Math.max(0,Math.round((i.offsetTop-PX)/CH))};
  });
  save();relayout();dragged=true;setTimeout(()=>dragged=false,60)};
desk.addEventListener('pointerup',drop);
desk.addEventListener('pointercancel',drop);
const band=document.createElement('div');
band.id='band';
band.hidden=true;
document.body.append(band);
let bd=null;
desk.addEventListener('pointerdown',e=>{if(e.target!==desk||e.button||(innerWidth<820||innerHeight<520))return;
  bd={x:e.clientX,y:e.clientY,on:false,add:e.ctrlKey||e.metaKey||e.shiftKey,base:icons().filter(i=>i.classList.contains('sel'))};desk.setPointerCapture(e.pointerId)});
desk.addEventListener('pointermove',e=>{if(!bd)return;
  const x=Math.min(bd.x,e.clientX),y=Math.min(bd.y,e.clientY),w=Math.abs(e.clientX-bd.x),h=Math.abs(e.clientY-bd.y);
  if(!bd.on&&w+h<6)return;bd.on=true;band.hidden=false;Object.assign(band.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
  icons().forEach(i=>{const r=i.getBoundingClientRect(),hit=r.left<x+w&&r.right>x&&r.top<y+h&&r.bottom>y;i.classList.toggle('sel',hit||(bd.add&&bd.base.includes(i)))})});
const endBand=()=>{if(!bd)return;const on=bd.on;bd=null;band.hidden=true;if(on){dragged=true;setTimeout(()=>dragged=false,60)}};
desk.addEventListener('pointerup',endBand);
desk.addEventListener('pointercancel',endBand);
