// @ts-nocheck
import {$, lk} from './util';
import {timeUI} from '../pages/pages';
import {close, open, resetWins, showDesk, wins} from './windows';
import {closeMenu} from './menu';
import {S, applySet} from './settings';
import {arrange, desk, icons, pick, pos, relayout, sortIcons} from './icons';
import {cal, tick} from './calendar';

const ctx=document.createElement('div');
ctx.id='ctx';
ctx.hidden=true;
ctx.setAttribute('role','menu');
document.body.append(ctx);
export const hideCtx=()=>{ctx.hidden=true};
export function showCtx(x,y,items){
  ctx.innerHTML=items.map((it,n)=>it==='-'?'<hr>':`<button role="menuitem" data-n="${n}">${it[0]}</button>`).join('');
  ctx.hidden=false;ctx.style.left=Math.max(4,Math.min(x,innerWidth-ctx.offsetWidth-4))+'px';ctx.style.top=Math.max(4,Math.min(y,innerHeight-ctx.offsetHeight-48))+'px';
  ctx.onclick=e=>{const b=e.target.closest('button');if(!b)return;const f=items[b.dataset.n][1];hideCtx();f()};
}
desk.addEventListener('contextmenu',e=>{
  e.preventDefault();closeMenu();cal.hidden=true;
  const ic=e.target.closest('.icon'),items=[
    ['Select all shortcuts',()=>icons().forEach(i=>i.classList.add('sel'))],['Arrange icons',()=>arrange()],['Sort by name',sortIcons],['Refresh',refreshDesk],'-',
    ['Show desktop',showDesk],['Close all windows',()=>Object.keys(wins).forEach(close)],['Reset window layout',resetWins],'-',
    [document.fullscreenElement?'Exit full screen':'Full screen',()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()],
    ['Copy page link',()=>navigator.clipboard?.writeText(location.origin+location.pathname)],'-',['Settings',()=>open('settings')]];
  if(ic){pick(ic,e);items.unshift(['Open',()=>ic.click()],'-')}
  showCtx(e.clientX,e.clientY,items);
});
document.addEventListener('pointerdown',e=>{
  if(!e.target.closest('#ctx'))hideCtx();
  if(!e.target.closest('#cal,#clock')){cal.hidden=true;$('#clock').setAttribute('aria-expanded','false')}
});
function refreshDesk(){
  desk.classList.add('rf');setTimeout(()=>desk.classList.remove('rf'),320);
  document.querySelectorAll('.icon.sel').forEach(i=>i.classList.remove('sel'));
  relayout();
  $('#card').dispatchEvent(new Event('card-refresh'));
  document.querySelectorAll('iframe').forEach(f=>{try{f.contentWindow.location.reload()}catch{f.src=f.src}});
  if(wins.time)$('.body',wins.time.el).replaceChildren(timeUI());
  applySet();tick()}
