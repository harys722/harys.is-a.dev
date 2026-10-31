// @ts-nocheck
import {$, lk, sv} from './util';
import {relayout} from './icons';
import {open} from './windows';

export function presenceView(data){
 if(data?.discord_user?.id!=='1203357768610746385'||!['online','idle','dnd','offline'].includes(data.discord_status))return null;
 const state=data.discord_status;
 const text=state==='offline'?"I'm offline, leave a message!":state==='dnd'?"I might be busy, leave a message!":"I'm online, say hi!";
 let activity='';
 if(state!=='offline'){
  if(data.listening_to_spotify&&typeof data.spotify?.song==='string')activity='Listening to '+data.spotify.song+(typeof data.spotify.artist==='string'?' by '+data.spotify.artist:'');
  else {const activities=Array.isArray(data.activities)?data.activities:[],custom=activities.find(item=>item.type===4&&typeof item.state==='string'),playing=activities.find(item=>item.type===0&&typeof item.name==='string');activity=custom?.state||(playing?'Playing '+playing.name:'')}
 }
 const asset=value=>typeof value==='string'&&/^(a_)?[a-f0-9]{32}$/.test(value);
 const avatarHash=data.discord_user.avatar,decorationHash=data.discord_user.avatar_decoration_data?.asset;
 return {status:state,text,activity:activity.slice(0,180),avatar:asset(avatarHash)?'https://cdn.discordapp.com/avatars/1203357768610746385/'+avatarHash+(avatarHash.startsWith('a_')?'.gif':'.webp')+'?size=128':'/images/harys722.png',decoration:asset(decorationHash)?'https://cdn.discordapp.com/avatar-decoration-presets/'+decorationHash+'.png?size=128':''};
}
let cardPosition=null;
export function resetCard(){cardPosition=null;const c=$('#card');c.style.left=c.style.top=c.style.right=c.style.bottom='';try{localStorage.removeItem('hs.card');localStorage.removeItem('hs.card-anchor')}catch{}}
export function initCard(){const c=$('#card'),h=c,fit=(x,y)=>{c.style.left=Math.max(14,Math.min(x,innerWidth-(c.offsetWidth||330)-14))+'px';c.style.top=Math.max(14,Math.min(y,innerHeight-44-(c.offsetHeight||220)-14))+'px';c.style.right=c.style.bottom='auto'};
 const place=()=>{if(cardPosition&&innerWidth>820&&innerHeight>520)fit(14+cardPosition[0]*Math.max(0,innerWidth-c.offsetWidth-28),14+cardPosition[1]*Math.max(0,innerHeight-44-c.offsetHeight-28));};
 const status=$('.card-status',c),dot=$('.discord-dot',c),activity=$('.discord-activity',c),photo=$('.discord-photo',c),decoration=$('.discord-decoration',c);
 photo.onerror=()=>{if(photo.getAttribute('src')!=='/images/harys722.png')photo.src='/images/harys722.png'};decoration.onload=()=>decoration.hidden=false;decoration.onerror=()=>decoration.hidden=true;
 const screen=matchMedia('(min-width:821px) and (min-height:521px)');
 let socket=null,retry=null,heartbeat=null,watchdog=null,hiddenTimer=null,attempt=0,moved=false;
 const unavailable=()=>{dot.dataset.status='unknown';status.textContent=navigator.onLine?"My Discord status is unavailable, you can still say hi!":"You're offline, my Discord status is unavailable.";activity.hidden=true;activity.textContent=''};
 const enabled=()=>!c.hidden&&navigator.onLine&&screen.matches;
 const stop=()=>{clearTimeout(retry);clearTimeout(watchdog);clearTimeout(hiddenTimer);clearInterval(heartbeat);retry=heartbeat=watchdog=hiddenTimer=null;const old=socket;socket=null;if(old){old.onclose=old.onmessage=old.onerror=null;old.close()}};
 const connect=()=>{
  if(!enabled()){stop();unavailable();return}if(socket||document.hidden)return;
  dot.dataset.status='unknown';status.textContent='Checking my Discord status…';activity.hidden=true;activity.textContent='';
  let current;try{current=new WebSocket('wss://api.lanyard.rest/socket')}catch{unavailable();retry=setTimeout(connect,30000);return}socket=current;
  const failed=()=>{if(socket!==current)return;stop();unavailable();if(enabled()&&!document.hidden)retry=setTimeout(connect,Math.min(60000,2000*2**Math.min(attempt++,5))+Math.random()*1000)};
  watchdog=setTimeout(failed,10000);
  current.onerror=failed;current.onclose=failed;
  current.onmessage=event=>{
   if(socket!==current)return;
   try{
    const message=JSON.parse(event.data);
    if(message.op===1){
     const interval=message.d?.heartbeat_interval;if(!Number.isFinite(interval)||interval<1000||interval>120000)return failed();
     clearInterval(heartbeat);heartbeat=setInterval(()=>{if(current.readyState===1)current.send(JSON.stringify({op:3}))},interval);
     current.send(JSON.stringify({op:2,d:{subscribe_to_id:'1203357768610746385'}}));
    }else if(message.op===0&&['INIT_STATE','PRESENCE_UPDATE'].includes(message.t)){
     const data=message.d?.['1203357768610746385']||message.d,view=presenceView(data);
     if(!view)return failed();clearTimeout(watchdog);attempt=0;
     dot.dataset.status=view.status;status.textContent=view.text;activity.textContent=view.activity;activity.hidden=!view.activity;
     if(photo.getAttribute('src')!==view.avatar)photo.src=view.avatar;
     if(!view.decoration){decoration.hidden=true;decoration.removeAttribute('src')}
     else if(decoration.getAttribute('src')!==view.decoration){decoration.hidden=true;decoration.src=view.decoration}
    }
   }catch{failed()}
  };
 };
 const sync=()=>{
  if(!enabled()){stop();unavailable();return}
  if(document.hidden){clearTimeout(retry);retry=null;if(socket&&!hiddenTimer)hiddenTimer=setTimeout(stop,60000);return}
  clearTimeout(hiddenTimer);hiddenTimer=null;connect();
 };
 c.addEventListener('card-load',sync);c.addEventListener('card-refresh',()=>{stop();sync()});
 addEventListener('online',sync);addEventListener('offline',sync);document.addEventListener('visibilitychange',sync);screen.addEventListener('change',sync);addEventListener('pagehide',stop);addEventListener('pageshow',sync);sync();
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
