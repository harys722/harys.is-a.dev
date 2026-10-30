// @ts-nocheck
import {LINKS} from '../data/links';
import {EVENTS} from '../data/events';
import {PROJECTS} from '../data/projects';
import {WORKS} from '../data/works';
import {FEATURED} from '../data/featured';
import {close} from '../core/windows';
import {fmt} from '../core/calendar';

export const PAGES={
  links:{t:'Links',i:'link',d:'Find me elsewhere.',x:LINKS.map(([n,h,u,i])=>`<a class="item lk" href="${u}" target="_blank" rel="noopener"><svg class="ic"><use href="#${i}"/></svg><span>${n}<small>${h}</small></span></a>`).join(''),l:[]},
  events:{t:'Events',i:'i-cal',d:'Seasonal pages and countdowns.',x:EVENTS.map(([k,n,x])=>`<div class="item"><h2>${n}</h2><p>${x}</p><p style="margin-top:8px"><button class="btn" data-open="${k}">Open</button></p></div>`).join(''),l:[]}
};
export function welcomeUI(){const d=document.createElement('div');d.className='pad wel';
  d.innerHTML=`<img src="/images/harys722.png" alt="Harys"><h1>Hi, I'm Harys</h1><p class="wr">Beginner web developer</p><p>I love coding and web development. I build websites, free tools and open-source projects, and I'm always learning something new.</p><p class="wb"><button class="btn" data-open="projects">See my projects</button><button class="btn ghost" data-open="about">About me</button></p><p class="wh">I created this portfolio in a desktop style to show my work.</p>`;
  d.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>close('welcome')));return d}
const card=c=>`<article class="feat"><div class="fh"><span class="lg"><svg class="ic"><use href="#${c.ic}"/></svg></span><div><h2>${c.n}</h2><p class="ft">${c.tag}</p></div></div>${c.d.map(t=>`<p>${t}</p>`).join('')}${c.chips?`<ul class="chips">${c.chips.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<div class="fl">${c.l.map(([t,u],i)=>u[0]==='#'?`<button class="btn sm${i?' ghost':''}" data-open="${u.slice(1)}">${t}</button>`:`<a class="btn sm${i?' ghost':''}" href="${u}" target="_blank" rel="noopener">${t}</a>`).join('')}</div></article>`;
PAGES.projects={t:'Projects',i:'folder',d:'Things I have built and maintain.',x:PROJECTS.map(card).join(''),l:[['See all repositories on GitHub','https://github.com/harys722?tab=repositories']]};
PAGES.works={t:'Works',i:'brief',d:'Tools, templates and communities I work on.',x:WORKS.map(card).join(''),l:[]};
PAGES.games={t:'Games',i:'gamepad',d:'Three small games for a break.',x:[['game/snake','Snake','Eat, grow, do not hit yourself. Arrow keys or WASD.'],['game/dino','Dino Run','Jump the cacti. Space, Up arrow or a click.'],['game/traffic','Traffic Run','Dodge traffic across three lanes. Left / Right, A / D or touch controls.']].map(([k,n,x])=>`<div class="item"><h2>${n}</h2><p>${x}</p><p style="margin-top:8px"><button class="btn" data-open="${k}">Play</button></p></div>`).join(''),l:[]};
PAGES.featured={t:"Featured Projects",i:"star",d:"My brother's projects, shared because they deserve a closer look.",
  x:'<p class="note">These are my brother\'s projects. I contributed to Darzi Pro and Paper Days, and I am sharing Muhasaba too because it deserves a closer look. Here is what each one does.</p>'+
  FEATURED.map(f=>`<article class="feat"><div class="fh"><span class="lg"><svg class="ic"><use href="#${f.ic}"/></svg></span><div><h2>${f.n}</h2><p class="ft">${f.tag}</p></div><a class="btn sm" href="${f.url}" target="_blank" rel="noopener">${f.cta} &#8599;</a></div>${f.d.map(t=>`<p>${t}</p>`).join('')}<div class="facts">${f.facts.map(([a,b])=>`<div class="fx"><b>${a}</b><span>${b}</span></div>`).join('')}</div><ul class="chips">${f.chips.map(c=>`<li>${c}</li>`).join('')}</ul><p class="role">${f.role}</p></article>`).join(''),l:[]};
export function timeUI(){const d=document.createElement('div');d.className='pad';
  const tz=Intl.DateTimeFormat().resolvedOptions().timeZone,now=new Date(),kar=new Date(now.toLocaleString('en-US',{timeZone:'Asia/Karachi'})),df=Math.round((kar-new Date(now.toLocaleString('en-US')))/18e5)/2,ad=Math.abs(df);
  const note=df===0?'We are in the same time zone.':`I am ${ad} hour${ad===1?'':'s'} ${df>0?'ahead of':'behind'} you.`;
  const dt=z=>now.toLocaleDateString([],{timeZone:z,weekday:'long',day:'numeric',month:'long'});
  d.innerHTML=`<div class="hero"><span class="logo"><svg class="ic"><use href="#i-clock"/></svg></span><div><h1>My Time</h1><p>Handy for knowing when I'm likely to reply.</p></div></div><div class="clks"><div class="item clk"><small>My time</small><div class="big" data-tz="Asia/Karachi">${fmt(now,true,'Asia/Karachi')}</div><p>${dt('Asia/Karachi')}</p><p>Karachi, Pakistan (UTC+5)</p></div><div class="item clk"><small>Your time</small><div class="big" data-tz="">${fmt(now,true)}</div><p>${dt(undefined)}</p><p>${tz}</p></div></div><p style="margin-top:14px">${note}</p>`;return d}
export function pageUI(id){const p=PAGES[id],d=document.createElement('div');d.className='pad';
  d.innerHTML=`<div class="hero"><span class="logo"><svg class="ic"><use href="#${p.i}"/></svg></span><div><h1>${p.t}</h1><p>${p.d}</p></div></div>${p.x}`+(p.l.length?`<p style="margin-top:14px">${p.l.map(([t,u],n)=>`<a class="btn${n?' ghost':''}" href="${u}" target="_blank" rel="noopener">${t}</a>`).join(' ')}</p>`:'');return d}
