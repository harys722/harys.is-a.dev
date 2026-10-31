// @ts-nocheck
// Readiness is separate from the optional startup animation and remote services.
export function waitForWallpaper(image,timeout=8000){
 return new Promise(resolve=>{
  let settled=false;
  const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);image.removeEventListener('load',loaded);image.removeEventListener('error',failed);resolve(ok)};
  const loaded=()=>{if(!image.naturalWidth)return finish(false);Promise.resolve(image.decode?.()).then(()=>finish(true),()=>finish(false))};
  const failed=()=>finish(false),timer=setTimeout(()=>finish(false),timeout);
  image.addEventListener('load',loaded);image.addEventListener('error',failed);
  if(image.complete)loaded();
 });
}
export const STARTUP_MIN_MS=900;
export async function initStartup(showAnimation,layout){
 const boot=document.getElementById('boot'),wall=document.getElementById('wall');
 if(!showAnimation&&boot)boot.hidden=true;
 // Preserve the familiar startup on fast/cached visits, while still waiting for
 // essential assets. The setting can disable this intentional minimum.
 const minimum=showAnimation?new Promise(resolve=>setTimeout(resolve,STARTUP_MIN_MS)):Promise.resolve();
 const [loaded]=await Promise.all([waitForWallpaper(wall),minimum]);
 document.documentElement.classList.toggle('wallpaper-ready',!!loaded);
 // A timed-out image may recover later without holding the startup screen.
 if(!loaded)wall.addEventListener('load',()=>{Promise.resolve(wall.decode?.()).then(()=>document.documentElement.classList.add('wallpaper-ready')).catch(()=>{})},{once:true});
 // Background tabs may suspend animation frames entirely.
 const frame=()=>new Promise(resolve=>{const timer=setTimeout(resolve,120);requestAnimationFrame(()=>{clearTimeout(timer);resolve()})});
 await frame();layout();await frame();
 document.documentElement.classList.remove('desktop-loading');
 document.documentElement.classList.add('desktop-ready');
 if(boot){boot.classList.add('boot-finished');setTimeout(()=>boot.remove(),showAnimation?520:0)}
 dispatchEvent(new Event('desktop-ready'));
}
