import {readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, renameSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {APPS, TOOLS} from '../src/data/apps';
import {PROJECTS} from '../src/data/projects';
import {WORKS} from '../src/data/works';
import {FEATURED} from '../src/data/featured';
import {EVENTS} from '../src/data/events';
import {LINKS} from '../src/data/links';

const origin='https://harys.is-a.dev';
const escape=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const link=(text:string,url:string)=>`<a href="${escape(url.startsWith('#')?'/'+url.slice(1):url)}">${escape(text)}</a>`;
const article=(card:any)=>`<article><h2>${escape(card.n)}</h2><p>${escape(card.tag||'')}</p>${card.image?`<img src="${escape(card.image)}" alt="${escape(card.imageAlt)}" width="1120" height="700" loading="lazy" style="max-width:100%;height:auto">`:''}${card.d.map((p:string)=>`<p>${escape(p)}</p>`).join('')}${card.role?`<p>${escape(card.role)}</p>`:''}${(card.chips||[]).length?`<p>${card.chips.map(escape).join(' · ')}</p>`:''}<p>${(card.l||[[card.cta,card.url]]).map(([text,url]:string[])=>link(text,url)).join(' · ')}</p></article>`;
const raw=(page:string)=>readFileSync(`src/pages/html/${page}.html`,'utf8').replace(/<button\b[^>]*data-open="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g,'<a href="/$1">$2</a>');
const tools=TOOLS.map(([slug,title])=>`<article><h2>${link(String(title),'/tool/'+slug)}</h2><p>${escape(title)} — a free browser tool by Harys.</p></article>`).join('');
const events=EVENTS.map(([id,title,description])=>`<article><h2>${link(title,'/'+id)}</h2><p>${escape(description)}</p></article>`).join('');
const games='<h1>Games</h1><p>Three small games for a break. Play with keyboard or touch.</p>'+[['snake','Snake'],['dino','Dino Run'],['traffic','Traffic Run']].map(([id,title])=>`<p>${link(title,'/game/'+id)}</p>`).join('');

export function prerender(){
  const shell=readFileSync('dist/index.html','utf8');
  const content:Record<string,string>={
    '':raw('about')+'<h2>Projects</h2>'+PROJECTS.map(article).join('')+'<h2>Free tools</h2>'+tools,
    about:raw('about'),contact:raw('contact'),servers:raw('servers'),tools:raw('tools')+tools,
    projects:'<h1>Projects</h1>'+PROJECTS.map(article).join(''),works:'<h1>Works</h1>'+WORKS.map(article).join(''),
    featured:'<h1>Featured Projects</h1>'+FEATURED.map(article).join(''),events:'<h1>Events</h1>'+events,
    links:'<h1>Find Harys elsewhere</h1>'+LINKS.map(([name,handle,url])=>`<p>${link(name+' '+handle,url)}</p>`).join(''),games,
    welcome:raw('about'),time:'<h1>My Time</h1><p>Harys is based in Karachi, Pakistan (UTC+5).</p>',
    settings:'<h1>Desktop settings</h1><p>Customize your cursor, animations, clock and Discord status card.</p>'
  };
  for(const [id,app] of Object.entries(APPS)){
    if(id.startsWith('tool/'))content[id]=`<h1>${escape(app.t)}</h1><p>A free browser tool by Harys.</p><p>${link('Open standalone tool',String(app.src))}</p>`;
    if(id.startsWith('event/'))content[id]=`<h1>${escape(app.t)}</h1><p>Automatic annual countdown using estimated Umm al-Qura calendar dates. Local moon sightings may differ.</p><p>${link('Open standalone tracker',String(app.src))}</p>`;
    if(id.startsWith('game/'))content[id]=`<h1>${escape(app.t)}</h1><p>A free offline-friendly game on Harys' desktop.</p>${games}`;
  }
  const nav='<nav aria-label="Portfolio">'+['about','projects','works','tools','events','games','contact','links'].map(id=>link(APPS[id].t,'/'+id)).join(' ')+'</nav>';
  function document(id:string,body:string,noindex=false){
    const title=id==='404'?'Page not found - Harys':id?APPS[id]?.t+' - Harys':'Harys';
    const description=id==='404'?'This page could not be found on Harys’ desktop.':id==='projects'?'Explore websites, open-source projects and free developer tools built by Harys.':id?`${APPS[id]?.t} on Harys’ desktop portfolio. Projects, free tools and open-source work.`:'Harys is a beginner web developer building websites, free tools and open-source projects. Explore the desktop portfolio.';
    const url=origin+(id&&id!=='404'?'/'+id:'/');
    return shell.replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/,`$1${escape(description)}`)
      .replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(title)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(description)}`)
      .replace(/(<meta property="og:url" content=")[^"]*/,`$1${url}`)
      .replace('</head>',`<link rel="canonical" href="${url}"><meta property="og:type" content="website">${noindex?'<meta name="robots" content="noindex,follow">':''}<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Harys',url:origin,sameAs:LINKS.map(l=>l[2])}).replace(/</g,'\\u003c')}</script></head>`)
      .replace(/<noscript>[\s\S]*?<\/noscript>/,'')
      .replace('<div id="root"></div>',`<main id="page-content">${nav}${body}<noscript><p>Enable JavaScript to use the desktop windows and interactive features.</p></noscript></main><div id="root"></div>`);
  }
  for(const [id,body] of Object.entries(content)){
    const file=id?'dist/'+id+'.html':'dist/index.html';mkdirSync(dirname(file),{recursive:true});
    writeFileSync(file,document(id,body,['settings','welcome','time'].includes(id)));
  }
  writeFileSync('dist/404.html',document('404','<h1>404 · Page not found</h1><p>This address does not lead to a page on my desktop.</p><p><a href="/">Back to desktop</a></p>',true));
  const urls=Object.keys(content).filter(id=>!['settings','welcome','time'].includes(id));
  writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(id=>`<url><loc>${origin}${id?'/'+id:'/'}</loc></url>`).join('')+'</urlset>');
  writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  // An older worker can still control an open tab. Give each standalone script
  // and stylesheet a content-based filename so it cannot return an older file
  // for newly served HTML. The source pages still own just HTML, CSS and JS.
  const assetNames=new Map<string,string>();
  for(const kind of ['css','js'])for(const name of readdirSync('dist/assets/'+kind)){
    if(!name.endsWith('.'+kind))continue;
    const file='dist/assets/'+kind+'/'+name;
    const hash=createHash('sha256').update(readFileSync(file)).digest('hex').slice(0,12);
    const original='/assets/'+kind+'/'+name;
    const versioned=original.replace(/\.(css|js)$/,'.'+hash+'.$1');
    renameSync(file,'dist'+versioned);assetNames.set(original,versioned);
  }
  const rewritePages=(directory:string)=>{
    for(const name of readdirSync(directory)){
      const file=join(directory,name);
      if(statSync(file).isDirectory()){rewritePages(file);continue}
      if(!name.endsWith('.html'))continue;
      const relative=file.replaceAll('\\','/').slice(5);
      const html=readFileSync(file,'utf8').replace(/((?:src|href)=["'])([^"']+)(["'])/g,(match,prefix,url,suffix)=>{
        const resolved=new URL(url,origin+'/'+relative),path=resolved.pathname;
        return resolved.origin===origin&&assetNames.has(path)?prefix+assetNames.get(path)+suffix:match;
      });
      writeFileSync(file,html);
    }
  };
  rewritePages('dist');
  // Every build gets an atomic, content-derived offline cache. Never cache API calls,
  // external responses, user input or credentials.
  const walk=(dir:string):string[]=>readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?walk(path):[path.replaceAll('\\','/')];});
  const files=walk('dist').filter(path=>!['dist/sw.js','dist/404.html'].includes(path));
  const workerSource=readFileSync('public/sw.js','utf8');
  const version=createHash('sha256').update(workerSource).update(files.map(path=>path+readFileSync(path)).join('')).digest('hex').slice(0,16);
  const worker=workerSource.replace("'desktop-dev'",JSON.stringify('harys-desktop-'+version)).replace('const PRECACHE = [];','const PRECACHE = '+JSON.stringify(files.map(path=>'/'+path.slice(5)))+';');
  writeFileSync('dist/sw.js',worker);
  console.log(`Prerendered ${Object.keys(content).length} desktop routes; offline cache ${version}.`);
}
