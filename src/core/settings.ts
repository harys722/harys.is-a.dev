// @ts-nocheck
import {$, lk, sv} from './util';
import {arrange, relayout} from './icons';
import {resetWins} from './windows';
import {cal, drawCal, tick} from './calendar';
import {resetCard} from './card';

const SB='*{scrollbar-width:thin;scrollbar-color:#95703a #15110c}::-webkit-scrollbar{width:12px;height:12px}::-webkit-scrollbar-track{background:#15110c}::-webkit-scrollbar-thumb{background:#95703a;border:2px solid #15110c;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#c69a4b}::-webkit-scrollbar-corner{background:#15110c}';
export function sbFrame(f){try{const d=f.contentDocument;let st=d.getElementById('hs-sb');if(S.sb&&!st){st=d.createElement('style');st.id='hs-sb';st.textContent=SB;d.head.append(st)}else if(!S.sb&&st)st.remove()}catch{}}
const mondayFirst=(()=>{try{const l=new Intl.Locale(navigator.language),i=l.getWeekInfo?l.getWeekInfo():l.weekInfo;return !!i&&i.firstDay===1}catch{return false}})();
export const S=Object.assign({cursor:true,sb:true,motion:!matchMedia('(prefers-reduced-motion:reduce)').matches,card:true,boot:true,h24:false,secs:false,mon:mondayFirst},lk('hs.set',{}));
const ROWS=[
 ['Appearance',[['cursor','Custom cursor','Use the honey cursor instead of your system one.'],['sb','Custom scrollbars','Thin gold scrollbars instead of the browser default.'],['motion','Animations','Hover and window effects. Turn off for a calmer page.'],['card','Discord status card','Loads a small image from lanyard.cnrad.dev.']]],
 ['Clock',[['h24','24-hour time'],['secs','Show seconds'],['mon','Week starts on Monday']]],
 ['Startup',[['boot','Show the startup screen']]]
];
export function applySet(){
  const h=document.documentElement;
  h.classList.toggle('cur',S.cursor&&matchMedia('(pointer:fine)').matches);
  h.classList.toggle('calm',!S.motion);h.classList.toggle('sb',S.sb);document.querySelectorAll('iframe').forEach(sbFrame);
  const c=$('#card'),im=$('img',c);c.hidden=!S.card;if(S.card&&!im.getAttribute('src'))c.dispatchEvent(new Event('card-load'));
  tick();if(!cal.hidden)drawCal();
}
export function settingsUI(){
  const d=document.createElement('div');d.className='pad';
  d.innerHTML=`<div class="hero"><span class="logo"><svg class="ic"><use href="#gear"/></svg></span><div><h1>Settings</h1><p>Make the site work the way you like. Saved in this browser only.</p></div></div>`+ROWS.map(([h,rs])=>`<h2>${h}</h2>`+rs.map(([k,t,x])=>`<label class="row"><span>${t}${x?`<small>${x}</small>`:''}</span><input type="checkbox" role="switch" data-set="${k}"${S[k]?' checked':''}></label>`).join('')).join('')+
  `<h2>Desktop</h2><div class="acts"><button class="btn ghost" data-act="icons">Reset icon positions</button><button class="btn ghost" data-act="wins">Reset window layout</button><button class="btn ghost" data-act="all">Reset all settings</button></div><p class="mono" style="margin-top:18px;color:var(--mute)">Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}</p><h2>About this site</h2><p style="color:var(--mute);font-size:13px">I designed this portfolio and chose everything on it. AI was used to help me with the code, the layout and some of the writing.</p>`;
  d.addEventListener('change',e=>{const k=e.target.dataset.set;if(k){S[k]=e.target.checked;sv('hs.set',S);applySet();if(k==='card')relayout()}});
  d.addEventListener('click',e=>{const a=e.target.dataset.act;if(!a)return;
    if(a==='icons'){arrange();resetCard()}else if(a==='wins')resetWins();
    else{try{localStorage.removeItem('hs.set');localStorage.removeItem('hs.icons');localStorage.removeItem('hs.layout');resetCard()}catch{}location.reload()}});
  return d;
}
