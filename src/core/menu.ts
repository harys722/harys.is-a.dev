// @ts-nocheck
import {$} from './util';
import {APPS} from '../data/apps';
import {resetWins} from './windows';

const menu=$('#menu'),start=$('#start');
menu.innerHTML='<h3 class="mh"><img src="/images/harys722.png" alt="" width="34" height="34"><span>Harys</span></h3><input id="msearch" type="text" placeholder="Type to open..." aria-label="Search pages and tools" autocomplete="off"><div id="mres" hidden></div><div id="mlist">'+(()=>{const b=k=>`<button data-open="${k}"><svg class="ic"><use href="#${APPS[k].i}"/></svg>${APPS[k].t}</button>`;return ['welcome','about','featured','projects','works','servers','contact'].map(b).join('')+'<p class="mg">More</p>'+['tools','links','events','games','time'].map(b).join('')})()+
 '<hr><button data-open="settings"><svg class="ic"><use href="#gear"/></svg>Settings</button><a href="https://github.com/harys722/" target="_blank" rel="noopener"><svg class="ic"><use href="#b-github"/></svg>GitHub</a><hr><button id="reset"><svg class="ic"><use href="#folder"/></svg>Reset window layout</button></div>';
export function closeMenu(){menu.hidden=true;start.setAttribute('aria-expanded','false')}
start.onclick=()=>{const o=menu.hidden;menu.hidden=!o;start.setAttribute('aria-expanded',String(o));if(o){ms.value='';ms.oninput();ms.focus()}};
$('#reset').onclick=()=>{resetWins();closeMenu()};
const ms=$('#msearch'),mres=$('#mres'),mlist=$('#mlist');
ms.oninput=()=>{const q=ms.value.trim().toLowerCase();mlist.hidden=!!q;mres.hidden=!q;
  mres.innerHTML=q?(Object.keys(APPS).filter(k=>APPS[k].t.toLowerCase().includes(q)).map(k=>`<button data-open="${k}"><svg class="ic"><use href="#${APPS[k].i}"/></svg>${APPS[k].t}</button>`).join('')||'<p class="nores">No match</p>'):''};
ms.onkeydown=e=>{if(e.key==='Enter'){const b=$('#mres button');if(b)b.click()}};
