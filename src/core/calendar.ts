// @ts-nocheck
import {$} from './util';
import {closeMenu} from './menu';
import {S} from './settings';
import {hideCtx} from './contextmenu';

export const cal=document.createElement('div');
cal.id='cal';
cal.hidden=true;
cal.setAttribute('role','dialog');
cal.setAttribute('aria-label','Calendar');
document.body.append(cal);
let cv=new Date();
cv.setDate(1);
export const fmt=(d,s,tz)=>d.toLocaleTimeString([],{timeZone:tz,hour:'2-digit',minute:'2-digit',second:s?'2-digit':undefined,...(S.h24?{hourCycle:'h23'}:{hour12:true})});
export function tick(){const n=new Date();$('#clock').innerHTML=fmt(n,S.secs)+'<small>'+n.toLocaleDateString([],{day:'numeric',month:'short',year:'numeric'})+'</small>';
  const t=$('.ct',cal);if(t)t.textContent=fmt(n,true);document.querySelectorAll('[data-tz]').forEach(e=>e.textContent=fmt(n,true,e.dataset.tz||undefined))}
export function drawCal(){
  const now=new Date(),y=cv.getFullYear(),m=cv.getMonth(),f=S.mon?1:0,lead=(new Date(y,m,1).getDay()-f+7)%7,days=new Date(y,m+1,0).getDate();
  const wd=[0,1,2,3,4,5,6].map(i=>new Date(2023,0,1+i+f).toLocaleDateString([],{weekday:'short'}).slice(0,2));
  let cells='<i></i>'.repeat(lead);
  for(let d=1;d<=days;d++)cells+=`<b${y===now.getFullYear()&&m===now.getMonth()&&d===now.getDate()?' class="today"':''}>${d}</b>`;
  cal.innerHTML=`<div class="ct">${fmt(now,true)}</div><div class="cd">${now.toLocaleDateString([],{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div><div class="ch"><button data-m="-1" aria-label="Previous month">&lsaquo;</button><span>${cv.toLocaleDateString([],{month:'long',year:'numeric'})}</span><button data-m="1" aria-label="Next month">&rsaquo;</button></div><div class="cg">${wd.map(w=>`<em>${w}</em>`).join('')}${cells}</div><div class="cf"><button data-m="0">Today</button><span class="mono">${Intl.DateTimeFormat().resolvedOptions().timeZone}</span></div>`;
}
$('#clock').onclick=()=>{const o=cal.hidden;cal.hidden=!o;$('#clock').setAttribute('aria-expanded',String(o));closeMenu();hideCtx();if(o){cv=new Date();cv.setDate(1);drawCal()}};
cal.onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;
  if(b.dataset.m==='0'){cv=new Date();cv.setDate(1)}else cv.setMonth(cv.getMonth()+ +b.dataset.m);drawCal()};
setInterval(tick,1000);
