// @ts-nocheck
export function initOffline(){
  const badge=document.createElement('div');badge.id='offline-badge';badge.setAttribute('role','status');
  badge.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M2 8a17 17 0 0 1 3-2m4-2a17 17 0 0 1 13 4M5 12a11 11 0 0 1 3-2m5-1a11 11 0 0 1 6 3M8 16a6 6 0 0 1 5-1m-1 5h.01"/></svg><span>Offline</span>';
  badge.title='Offline · Your desktop is still here';badge.setAttribute('aria-label',badge.title);
  document.getElementById('clock').before(badge);
  const update=()=>badge.hidden=navigator.onLine;update();addEventListener('online',update);addEventListener('offline',update);
  if(import.meta.env.PROD&&'serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(console.warn);
}
export function frameUI(app, styleFrame){
  const wrap=document.createElement('div');wrap.className='frame-wrap';let frame;
  const render=()=>{
    if(!navigator.onLine&&app.online){
      wrap.innerHTML='<div class="pad"><h1>You are offline</h1><p>This tool needs an internet connection. Your desktop, games and event countdowns still work.</p><button class="btn">Try again</button></div>';
      wrap.querySelector('button').onclick=render;frame=null;return;
    }
    if(frame)return;
    wrap.replaceChildren();frame=document.createElement('iframe');frame.src=app.src;frame.title=app.t;
    frame.onload=()=>styleFrame(frame);wrap.append(frame);
  };
  render();
  const change=()=>{
    if(!wrap.isConnected){removeEventListener('online',change);removeEventListener('offline',change);return}
    render();
  };
  addEventListener('online',change);addEventListener('offline',change);return wrap;
}
