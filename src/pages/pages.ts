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
const preview=project=>`<button class="portfolio-preview" data-preview="${project.id}" aria-label="Enlarge screenshot of ${project.n}"><img src="${project.image}" alt="${project.imageAlt}" width="1120" height="700" loading="lazy" decoding="async"><span class="preview-label">View screenshot <span aria-hidden="true">↗</span></span></button>`;
const projectCard=project=>`<article class="portfolio-card">${preview(project)}<div class="portfolio-copy"><p class="portfolio-kind">${project.kind}</p><h2>${project.n}</h2><p class="portfolio-tag">${project.tag}</p><p class="portfolio-summary">${project.summary}</p><ul class="chips">${project.chips.map(chip=>`<li>${chip}</li>`).join('')}</ul><div class="fl">${project.l.map(([title,url],index)=>`<a class="btn sm${index?' ghost':''}" href="${url}" target="_blank" rel="noopener">${title}<span class="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>`).join('')}</div></div></article>`;
PAGES.projects={t:'Projects',i:'folder',d:'Websites, tools and open-source projects I build and maintain.',x:'<section class="portfolio-section" aria-label="My projects"><div class="portfolio-grid">'+PROJECTS.map(projectCard).join('')+'</div></section>',l:[['All my repositories on GitHub','https://github.com/harys722?tab=repositories']]};
PAGES.works={t:'Works',i:'brief',d:'Tools, templates and communities I work on.',x:WORKS.map(card).join(''),l:[]};
PAGES.games={t:'Games',i:'gamepad',d:'Three small games for a break.',x:[['game/snake','Snake','Eat, grow, do not hit yourself. Arrow keys or WASD.'],['game/dino','Dino Run','Jump the cacti. Space, Up arrow or a click.'],['game/traffic','Traffic Run','Dodge traffic across three lanes. Left / Right, A / D or touch controls.']].map(([k,n,x])=>`<div class="item"><h2>${n}</h2><p>${x}</p><p style="margin-top:8px"><button class="btn" data-open="${k}">Play</button></p></div>`).join(''),l:[]};
PAGES.featured={t:'Featured Projects',i:'star',d:"A closer look at my brother's projects, including two I contributed to.",
 x:'<section class="portfolio-section" aria-label="Featured projects"><div class="featured-list">'+FEATURED.map(project=>`<article class="portfolio-card featured-card"><div class="featured-overview">${preview(project)}<div class="portfolio-copy"><p class="portfolio-kind">${project.kind}</p><h2>${project.n}</h2><p class="portfolio-tag">${project.tag}</p><p class="portfolio-summary">${project.summary}</p><p class="portfolio-credit">${project.role}</p><a class="btn sm" href="${project.url}" target="_blank" rel="noopener">${project.cta}<span class="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></div></div><div class="featured-extra"><div class="facts">${project.facts.map(([value,label])=>`<div class="fx"><b>${value}</b><span>${label}</span></div>`).join('')}</div><details class="portfolio-details"><summary>More about ${project.n}</summary><div>${project.d.map(paragraph=>`<p>${paragraph}</p>`).join('')}<ul class="chips">${project.chips.map(chip=>`<li>${chip}</li>`).join('')}</ul></div></details></div></article>`).join('')+'</div></section>',l:[]};
export function showProjectPreview(project,host){
 const dialog=document.createElement('dialog');dialog.className='portfolio-viewer';dialog.setAttribute('aria-label',project.n+' screenshot');
 dialog.innerHTML='<header><h2></h2><button class="btn ghost sm" autofocus aria-label="Close screenshot">Close ×</button></header><img><footer><span>Screenshot of the public website</span><a class="btn ghost sm" target="_blank" rel="noopener">Visit site ↗</a></footer>';
 dialog.querySelector('h2').textContent=project.n;
 const image=dialog.querySelector('img');image.src=project.image;image.alt=project.imageAlt;
 const link=dialog.querySelector('a');link.href=project.url||project.l[0][1];if(project.cta)link.textContent=project.cta+' ↗';
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>dialog.remove());host.append(dialog);dialog.showModal();
}
export function timeUI(){const d=document.createElement('div');d.className='pad';
  const tz=Intl.DateTimeFormat().resolvedOptions().timeZone,now=new Date(),kar=new Date(now.toLocaleString('en-US',{timeZone:'Asia/Karachi'})),df=Math.round((kar-new Date(now.toLocaleString('en-US')))/18e5)/2,ad=Math.abs(df);
  const note=df===0?'We are in the same time zone.':`I am ${ad} hour${ad===1?'':'s'} ${df>0?'ahead of':'behind'} you.`;
  const dt=z=>now.toLocaleDateString([],{timeZone:z,weekday:'long',day:'numeric',month:'long'});
  d.innerHTML=`<div class="hero"><span class="logo"><svg class="ic"><use href="#i-clock"/></svg></span><div><h1>My Time</h1><p>Handy for knowing when I'm likely to reply.</p></div></div><div class="clks"><div class="item clk"><small>My time</small><div class="big" data-tz="Asia/Karachi">${fmt(now,true,'Asia/Karachi')}</div><p>${dt('Asia/Karachi')}</p><p>Karachi, Pakistan (UTC+5)</p></div><div class="item clk"><small>Your time</small><div class="big" data-tz="">${fmt(now,true)}</div><p>${dt(undefined)}</p><p>${tz}</p></div></div><p style="margin-top:14px">${note}</p>`;return d}
export function pageUI(id){const p=PAGES[id],d=document.createElement('div');d.className='pad'+(['projects','featured'].includes(id)?' portfolio-page':'');
 d.addEventListener('click',event=>{const button=event.target.closest('[data-preview]');if(!button)return;const project=[...PROJECTS,...FEATURED].find(project=>project.id===button.dataset.preview);if(project)showProjectPreview(project,d)});
  d.innerHTML=`<div class="hero"><span class="logo"><svg class="ic"><use href="#${p.i}"/></svg></span><div><h1>${p.t}</h1><p>${p.d}</p></div></div>${p.x}`+(p.l.length?`<p style="margin-top:14px">${p.l.map(([t,u],n)=>`<a class="btn${n?' ghost':''}" href="${u}" target="_blank" rel="noopener">${t}</a>`).join(' ')}</p>`:'');return d}
