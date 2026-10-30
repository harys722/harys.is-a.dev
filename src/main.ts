// @ts-nocheck
import './ui/mount';
import './styles/01-base.css';
import './styles/02-desktop.css';
import './styles/03-windows.css';
import './styles/04-taskbar.css';
import './styles/05-popups.css';
import './styles/06-cursors-scrollbars.css';
import './styles/07-pages.css';
import './styles/08-polish-and-responsive.css';
import './styles/09-next.css';
import './core/input';
import './core/menu';
import './core/contextmenu';
import './core/calendar';
import './core/keyboard';
import './core/router';
import {initOffline} from './core/offline';
import {initCard} from './core/card';
import {initCursors} from './core/cursors';
import {$, lk, sv} from './core/util';
import {APPS} from './data/apps';
import {open, showDesk} from './core/windows';
import {S, applySet} from './core/settings';
import {arrange, pos, relayout} from './core/icons';

applySet();
if(!S.boot)$('#boot')?.remove();
relayout();
addEventListener('resize',relayout);
$('#sd').onclick=showDesk;
{const e=$('#sd2');e.addEventListener('pointerenter',ev=>{if(ev.pointerType!=='touch')document.body.classList.add('peek')});
 e.addEventListener('pointerleave',()=>document.body.classList.remove('peek'));
 e.addEventListener('click',()=>{document.body.classList.remove('peek');showDesk()})}
$('#pins').innerHTML=['about','projects','links','time'].map(k=>`<button data-open="${k}" title="${APPS[k].t}" aria-label="${APPS[k].t}"><svg class="ic"><use href="#${APPS[k].i}"/></svg></button>`).join('');
document.getElementById('page-content')?.remove();
if(location.pathname==='/'&&!location.hash&&!lk('hs.seen',false)){sv('hs.seen',true);setTimeout(()=>{if(location.pathname==='/')open('welcome')},2100)}
initCard();
initOffline();
initCursors();
