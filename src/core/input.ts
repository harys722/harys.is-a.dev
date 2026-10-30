// @ts-nocheck
import {open} from './windows';
import {closeMenu} from './menu';
import {pick} from './icons';

const coarse=matchMedia('(pointer:coarse)').matches;
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-open]');
  if(b){const isIcon=b.classList.contains('icon');
    if(isIcon)pick(b,e);
    if(!isIcon||coarse||e.detail===0){open(b.dataset.open);closeMenu()}return}
  if(!e.target.closest('#menu,#start'))closeMenu();
  if(!e.target.closest('.icon,#ctx,#cal,#menu,.win'))document.querySelectorAll('.icon.sel').forEach(i=>i.classList.remove('sel'));
});
document.addEventListener('dblclick',e=>{const b=e.target.closest('.icon[data-open]');if(b)open(b.dataset.open)});
