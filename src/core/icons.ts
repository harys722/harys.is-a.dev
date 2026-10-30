// @ts-nocheck
import {$, lk, sv} from './util';

export const desk=$('#desk'),CW=96,CH=100,PX=14;
export let pos={v:lk('hs.icons',{})},dragged=false,dg=null;
export const icons=()=>[...desk.querySelectorAll('.icon')];
const hitCard=(x,y)=>{const c=$('#card');if(c.hidden)return false;const b=c.getBoundingClientRect(),l=PX+x*CW,t=PX+y*CH;return l<b.right&&l+92>b.left&&t<b.bottom&&t+92>b.top};
const grid=()=>({c:Math.max(1,Math.floor((innerWidth-PX)/CW)),r:Math.max(1,Math.floor((innerHeight-44-PX)/CH))});
function put(ic){const p=pos.v[ic.dataset.k];if(p){ic.style.left=PX+p[0]*CW+'px';ic.style.top=PX+p[1]*CH+'px'}}
function settle(k,t){
  const {c,r}=grid(),used=new Set(Object.keys(pos.v).filter(j=>j!==k).map(j=>pos.v[j].join()));let best=[0,0],bd=1e9;
  for(let x=0;x<c;x++)for(let y=0;y<r;y++){if(used.has(x+','+y)||hitCard(x,y))continue;const d=(x-t[0])**2+(y-t[1])**2;if(d<bd){bd=d;best=[x,y]}}
  pos.v[k]=best;
}
export function arrange(order){
  const {c,r}=grid(),all=icons(),L=order||all.filter(i=>!i.dataset.r),R=order?[]:all.filter(i=>i.dataset.r);pos.v={};
  L.forEach((ic,n)=>pos.v[ic.dataset.k]=[Math.floor(n/r),n%r]);
  R.forEach((ic,n)=>pos.v[ic.dataset.k]=[c-1-Math.floor(n/r),n%r]);
  all.forEach(ic=>settle(ic.dataset.k,pos.v[ic.dataset.k]));all.forEach(put);sv('hs.icons',pos.v);
}
export function relayout(){icons().forEach(ic=>{settle(ic.dataset.k,pos.v[ic.dataset.k]||[0,0]);put(ic)});sv('hs.icons',pos.v)}
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
  g.forEach(({i})=>{delete pos.v[i.dataset.k]});
  g.forEach(({i})=>{i.classList.remove('drag');settle(i.dataset.k,[Math.round((i.offsetLeft-PX)/CW),Math.round((i.offsetTop-PX)/CH)]);put(i)});
  sv('hs.icons',pos.v);dragged=true;setTimeout(()=>dragged=false,60)};
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
