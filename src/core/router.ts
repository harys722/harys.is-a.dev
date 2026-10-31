// @ts-nocheck
import {$} from './util';
import {APPS} from '../data/apps';
import {open, showDesk, wins} from './windows';
import {restoreRoute, routePath} from './navigation';

function route(){
  let id;
  try { id=decodeURIComponent(location.hash ? location.hash.slice(1) : location.pathname.replace(/^\/|\/$/g,'')); }
  catch { id='not-found'; }
  if(location.hash && APPS[id]) history.replaceState(null,'',routePath(id));
  restoreRoute(()=>{
    if(!id){if(Object.values(wins).some(w=>!w.el.hidden))showDesk();document.title='Harys';return}
    open(APPS[id]?id:'not-found');
  });
}
addEventListener('popstate',route);
addEventListener('hashchange',route);
// Remote fonts or Discord images must not delay opening a local window.
queueMicrotask(route);
