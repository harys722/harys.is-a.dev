// @ts-nocheck
import {$, lk, sv} from './util';
import {relayout} from './icons';
import {open} from './windows';

let cardPosition=null;
export function resetCard(){cardPosition=null;const c=$('#card');c.style.left=c.style.top=c.style.right=c.style.bottom='';try{localStorage.removeItem('hs.card');localStorage.removeItem('hs.card-anchor')}catch{}}
export function initCard(){const c=$('#card'),h=c,fit=(x,y)=>{c.style.left=Math.max(14,Math.min(x,innerWidth-(c.offsetWidth||330)-14))+'px';c.style.top=Math.max(14,Math.min(y,innerHeight-44-(c.offsetHeight||220)-14))+'px';c.style.right=c.style.bottom='auto'};
 const place=()=>{if(cardPosition&&innerWidth>820&&innerHeight>520)fit(14+cardPosition[0]*Math.max(0,innerWidth-c.offsetWidth-28),14+cardPosition[1]*Math.max(0,innerHeight-44-c.offsetHeight-28));};
 const im=$('img',c),status=$('.card-status',c);let timer,moved=false;
 const failed=()=>{clearTimeout(timer);im.hidden=true;status.hidden=false;status.textContent=navigator.onLine?"Can't show the Discord card right now. The service may be busy. Open Contact to find me.":"You are offline. Discord activity is unavailable. Open Contact for my details.";relayout()};
 im.addEventListener('error',failed);
 im.addEventListener('load',()=>{clearTimeout(timer);if(im.naturalWidth<40||im.naturalHeight<40)return failed();im.hidden=false;status.hidden=true;relayout()});
 const load=()=>{if(!navigator.onLine)return failed();if(c.hidden)return;status.hidden=false;status.textContent='Loading Discord activity…';timer=setTimeout(failed,12000);im.src=im.dataset.src};
 c.addEventListener('card-load',load);addEventListener('offline',failed);addEventListener('online',load);load();
 c.addEventListener('click',()=>{if(!moved)open('contact')});
 c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open('contact')}});
 const sp=lk('hs.card-anchor',null);let d=null;if(Array.isArray(sp)&&sp.length===2&&sp.every(n=>Number.isFinite(n)&&n>=0&&n<=1))cardPosition=sp;
 place();relayout();
 h.addEventListener('pointerdown',e=>{if(e.button)return;moved=false;const r=c.getBoundingClientRect();d={x:e.clientX-r.left,y:e.clientY-r.top};h.setPointerCapture(e.pointerId);h.classList.add('gr')});
 h.addEventListener('pointermove',e=>{if(d){if(Math.abs(e.clientX-d.x-c.offsetLeft)+Math.abs(e.clientY-d.y-c.offsetTop)>5)moved=true;if(moved)fit(e.clientX-d.x,e.clientY-d.y)}});
 const end=()=>{if(!d)return;d=null;h.classList.remove('gr');if(moved){cardPosition=[Math.max(0,Math.min(1,(c.offsetLeft-14)/Math.max(1,innerWidth-c.offsetWidth-28))),Math.max(0,Math.min(1,(c.offsetTop-14)/Math.max(1,innerHeight-44-c.offsetHeight-28)))];sv('hs.card-anchor',cardPosition)}relayout()};
 h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);
 addEventListener('resize',()=>{place();relayout()});
 addEventListener('desktop-arrange',resetCard);
 new ResizeObserver(()=>{place();relayout()}).observe(c);
}
