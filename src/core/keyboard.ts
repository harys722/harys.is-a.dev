// @ts-nocheck
import {$} from './util';
import {deskOn, open} from './windows';
import {closeMenu} from './menu';
import {icons} from './icons';
import {hideCtx} from './contextmenu';
import {cal} from './calendar';

addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.icon.sel').forEach(i=>i.classList.remove('sel'));closeMenu();hideCtx();cal.hidden=true;$('#clock').setAttribute('aria-expanded','false')}});
addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.target.closest('input,textarea,button,a,summary')){const q=document.querySelectorAll('.icon.sel[data-open]');if(q.length&&q.length<=3)q.forEach(i=>open(i.dataset.open))}});
document.addEventListener('pointerdown',e=>{deskOn.v=!!e.target.closest('#desk')||!e.target.closest('.win,#bar,#menu,#cal,#ctx')},true);
addEventListener('keydown',e=>{
  const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
  if(!k||!deskOn.v||e.ctrlKey||e.altKey||e.metaKey||(innerWidth<820||innerHeight<520))return;
  if(e.target.closest('input,textarea,select,summary,iframe')||(e.target.closest('button,a')&&!e.target.classList.contains('icon')))return;
  e.preventDefault();const all=icons(),cur=all.filter(i=>i.classList.contains('sel')).pop(),mid=r=>({x:r.left+r.width/2,y:r.top+r.height/2});let nx;
  if(!cur)nx=all.slice().sort((a,b)=>(a.offsetLeft+a.offsetTop)-(b.offsetLeft+b.offsetTop))[0];
  else{const a=mid(cur.getBoundingClientRect());let best=1e9;
    all.forEach(o=>{if(o===cur)return;const b=mid(o.getBoundingClientRect()),dx=b.x-a.x,dy=b.y-a.y,along=dx*k[0]+dy*k[1];if(along<=8)return;
      const sc=along+(Math.abs(dx*k[1])+Math.abs(dy*k[0]))*2;if(sc<best){best=sc;nx=o}})}
  if(!nx)return;if(!e.shiftKey)all.forEach(i=>i.classList.remove('sel'));nx.classList.add('sel');nx.focus({preventScroll:true})});
