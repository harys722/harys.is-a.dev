// @ts-nocheck
import {lk, sv} from '../core/util';
import {trafficUI} from './traffic';

export const dinoGap=(speed,random=Math.random)=>speed*48+60+random()*100;
export const dinoSpeed=seconds=>Math.min(7.6,3.6+Math.max(0,seconds-8)*.04);
export const snakeInterval=seconds=>Math.max(140,240-Math.max(0,seconds-8)*.8);
export function dinoHitsObstacle(obstacle,jumpY,crouching=false){
  const low=crouching&&jumpY===0;
  if(obstacle.x>=(low?94:74)||obstacle.x+obstacle.w<=44)return false;
  if(obstacle.k===3)return jumpY-4>-obstacle.yo-23&&jumpY-(low?25:44)<-obstacle.yo;
  return jumpY>-obstacle.h+6;
}
export function advanceSnake(snake,direction,food,size=20){
  const head=[snake[0][0]+direction[0],snake[0][1]+direction[1]];
  const ate=!!food&&head[0]===food[0]&&head[1]===food[1];
  const body=ate?snake:snake.slice(0,-1);
  if(head[0]<0||head[1]<0||head[0]>=size||head[1]>=size||body.some(p=>p[0]===head[0]&&p[1]===head[1]))return null;
  return {snake:[head,...body],ate,won:ate&&body.length+1===size*size};
}

export function gameUI(id){
  if(id==='game/traffic')return trafficUI();
  const d=document.createElement('div');d.className='pad gm';const cv=document.createElement('canvas'),hs=document.createElement('p');hs.className='gh';d.append(cv,hs);
  const dino=id==='game/dino',W=dino?640:360,H=dino?180:360,dpr=Math.min(2,Math.max(1,devicePixelRatio||1));
  d.classList.add(dino?'dino-game':'snake-game');cv.width=W*dpr;cv.height=H*dpr;cv.style.width=(dino?W:340)+'px';cv.tabIndex=0;
  cv.setAttribute('aria-label',dino?'Dino Run. Space, Up or tap to jump. Hold Down or S to duck.':'Snake. Arrow keys, WASD or swipe to turn.');
  const controls=document.createElement('div');controls.className='traffic-controls';controls.innerHTML='<button class="btn ghost">Pause</button><button class="btn ghost">Restart</button>';d.append(controls);
  const hint=document.createElement('small');hint.textContent=dino?'Hold Down / S or Duck to crouch. Space / Up jumps. P pauses.':'P to pause. Games also pause when hidden.';d.append(hint);
  const pauseButton=controls.querySelector('button');let paused=false,releaseAction=()=>{},releaseKey=()=>{};
  const togglePause=()=>{paused=!paused;pauseButton.textContent=paused?'Resume':'Pause'};pauseButton.onclick=togglePause;
  const x=cv.getContext('2d'),hk='hs.hi.'+id,live=()=>cv.isConnected,act=()=>live()&&!cv.closest('.win').hidden&&cv.closest('.win').classList.contains('on')&&!document.hidden;
  x.scale(dpr,dpr);
  let hi=lk(hk,0),sc=0,state='ready',jump=()=>{},rate=dino?16.67:snakeInterval(0),reset,step,draw,key,renderClock=0,playTime=0;
  const info=()=>{hs.textContent='Score '+sc+'  ·  Best '+hi};
  const msg=t=>{x.save();const width=Math.min(W-24,330),top=dino?30:16;x.fillStyle='#130f08ed';x.strokeStyle='#54431d';x.beginPath();x.roundRect((W-width)/2,top,width,38,8);x.fill();x.stroke();x.fillStyle='#f4ecd6';x.font='500 13px system-ui,sans-serif';x.textAlign='center';x.fillText(t,W/2,top+24);x.restore()};
  const over=(won=false)=>{releaseAction();state=won?'won':'over';if(sc>hi){hi=sc;sv(hk,hi)}info()};
  if(dino){
    const gy=H-30;let y=0,vy=0,sp=dinoSpeed(0),ob=[],t=0,bumps=[],clouds=[],nextGap=0,buffer=0,travel=0,dust=[];
    const duckInputs=new Set(),duckButton=document.createElement('button');
    duckButton.className='btn ghost';duckButton.textContent='Duck (hold)';duckButton.setAttribute('aria-label','Hold to duck');duckButton.setAttribute('aria-pressed','false');duckButton.style.touchAction='none';controls.append(duckButton);
    const setDuck=(source,held)=>{if(held){if(state==='over')return;duckInputs.add(source);if(state==='ready')state='run'}else duckInputs.delete(source);duckButton.setAttribute('aria-pressed',String(duckInputs.size>0))};
    const ducking=()=>duckInputs.size>0&&y===0&&state==='run';
    releaseAction=()=>{if(duckInputs.size){duckInputs.clear();duckButton.setAttribute('aria-pressed','false')}};
    releaseKey=k=>{if(k==='ArrowDown'||k==='s')setDuck(k,false)};
    duckButton.addEventListener('pointerdown',e=>{if(e.button)return;e.preventDefault();duckButton.setPointerCapture(e.pointerId);cv.focus();if(!paused)setDuck('pointer',true)});
    for(const name of ['pointerup','pointercancel','lostpointercapture'])duckButton.addEventListener(name,()=>setDuck('pointer',false));
    duckButton.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!paused)setDuck('button-'+e.key,true)}});
    duckButton.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();setDuck('button-'+e.key,false)}});
    const puff=()=>{for(let i=0;i<5;i++)dust.push({x:51+Math.random()*15,y:gy-2,life:20+Math.random()*10,r:1+Math.random()*2,v:.3+Math.random()*.5})};
    reset=()=>{releaseAction();y=0;vy=0;buffer=0;playTime=0;sp=dinoSpeed(0);ob=[];nextGap=dinoGap(sp);t=0;sc=0;travel=0;dust=[];renderClock=0;state='ready';bumps=Array.from({length:14},(_,i)=>({x:i*48+Math.random()*30,w:2+Math.random()*6|0}));clouds=[{x:120,y:34},{x:380,y:58},{x:560,y:26}];info()};
    jump=()=>{if(state==='over')reset();state='run';buffer=6;if(y===0){vy=-12;buffer=0;puff()}};
    step=()=>{const airborne=y<0;if(buffer>0){if(y===0){vy=-12;buffer=0;puff()}else buffer--}vy+=.7;y=Math.min(0,y+vy);if(y===0){vy=0;if(airborne)puff()}t++;sp=dinoSpeed(playTime);travel+=sp;sc=t/6|0;if(t%6===0)info();
      const last=ob[ob.length-1];
      if(!last||last.x+last.w<W-nextGap){if(playTime>18&&Math.random()<.3)ob.push({k:3,x:W,w:36,yo:playTime>45&&Math.random()<.25?62:28});else{const k=playTime>12&&Math.random()<.35?2:1;ob.push({k,x:W,w:k===2?36:14+(Math.random()*8|0),h:30+(Math.random()*20|0)})}nextGap=dinoGap(sp)}
      ob.forEach(o=>o.x-=sp);ob=ob.filter(o=>o.x>-60);bumps.forEach(b=>{b.x-=sp;if(b.x<-10)b.x=W+Math.random()*40});clouds.forEach(c=>{c.x-=.4;if(c.x<-60)c.x=W+20});
      dust.forEach(p=>{p.x-=sp*.35;p.y-=p.v;p.life--});dust=dust.filter(p=>p.life>0);
      if(ob.some(o=>dinoHitsObstacle(o,y,ducking())))over()};
    const cactus=(cx,width,height)=>{
      const stem=Math.max(5,width*.3),center=cx+width/2;
      x.save();x.lineCap=x.lineJoin='round';
      const shape=()=>{x.beginPath();x.moveTo(center,gy-1);x.lineTo(center,gy-height+4);x.moveTo(center,gy-height*.47);x.lineTo(cx+2,gy-height*.47);x.lineTo(cx+2,gy-height*.7);x.moveTo(center,gy-height*.3);x.lineTo(cx+width-2,gy-height*.3);x.lineTo(cx+width-2,gy-height*.55)};
      shape();x.strokeStyle='#4f421e';x.lineWidth=stem+3;x.stroke();shape();x.strokeStyle='#987d32';x.lineWidth=stem;x.stroke();
      x.strokeStyle='#cbb061';x.lineWidth=1;x.beginPath();x.moveTo(center-1,gy-4);x.lineTo(center-1,gy-height+6);x.stroke();
      x.fillStyle='#d7bc7155';for(let n=0;n<3;n++)x.fillRect(center+1,gy-height+12+n*8,1,2);x.restore();
    };
    const dinosaur=()=>{
      const dead=state==='over',phase=state==='run'?travel*.08:renderClock*.004,run=state==='run'&&y===0;
      x.save();x.translate(33,gy+y+(run?-Math.abs(Math.sin(phase))*1.2:Math.sin(renderClock*.002)*.5));
      // The rear leg sits behind the body; the front leg has a separate running cycle.
      const leg=(px,angle,color)=>{x.save();x.translate(px,-12);x.rotate(angle);x.fillStyle=color;x.strokeStyle='#765923';x.lineWidth=1;x.beginPath();x.moveTo(-4,0);x.quadraticCurveTo(-6,8,-1,11);x.lineTo(8,11);x.quadraticCurveTo(10,9,7,8);x.lineTo(2,7);x.lineTo(4,1);x.closePath();x.fill();x.stroke();x.fillStyle='#f5e2a5';x.fillRect(6,8,2,2);x.restore()};
      const skin=x.createLinearGradient(15,-48,34,-4);skin.addColorStop(0,dead?'#b18d3b':'#f0cf72');skin.addColorStop(.45,dead?'#a48235':'#e6b422');skin.addColorStop(1,'#ac7c20');
      if(ducking()){
        leg(33,Math.sin(phase+Math.PI)*.35,'#a47f27');x.fillStyle=skin;x.strokeStyle='#775923';x.lineWidth=1.2;
        x.beginPath();x.moveTo(20,-17);x.quadraticCurveTo(8,-12,0,-19);x.quadraticCurveTo(4,-7,22,-7);x.quadraticCurveTo(32,-2,44,-9);x.lineTo(49,-12);x.lineTo(62,-12);x.quadraticCurveTo(68,-12,68,-17);x.lineTo(68,-22);x.quadraticCurveTo(68,-27,62,-27);x.lineTo(48,-27);x.quadraticCurveTo(42,-27,40,-21);x.lineTo(34,-17);x.closePath();x.fill();x.stroke();
        x.fillStyle='#f8dfa0';x.beginPath();x.moveTo(26,-12);x.quadraticCurveTo(37,-9,47,-14);x.lineTo(51,-10);x.quadraticCurveTo(34,-3,24,-8);x.fill();
        x.strokeStyle='#ffe9ad88';x.lineWidth=1.4;x.beginPath();x.moveTo(8,-14);x.quadraticCurveTo(27,-10,41,-21);x.stroke();leg(26,Math.sin(phase)*.35,'#dfad2e');
        x.strokeStyle='#8c6526';x.lineWidth=2;x.beginPath();x.moveTo(43,-12);x.lineTo(49,-10);x.lineTo(51,-12);x.stroke();
        x.fillStyle='#fff1c2';x.beginPath();x.ellipse(59,-21,3.4,3.2,0,0,7);x.fill();x.fillStyle='#251c0e';x.beginPath();x.arc(60,-20.5,1.8,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(60.5,-21.5,.6,0,7);x.fill();
        x.fillStyle='#775923';x.beginPath();x.arc(65,-18,.8,0,7);x.fill();x.strokeStyle='#8c6427';x.lineWidth=1;x.beginPath();x.moveTo(58,-15);x.lineTo(66,-15);x.stroke();x.fillStyle='#fff0c4';x.beginPath();x.moveTo(61,-15);x.lineTo(63,-15);x.lineTo(62,-13);x.fill();x.restore();return;
      }
      leg(32,run?Math.sin(phase+Math.PI)*.65:y<0?.55:.05,'#a47f27');
      x.fillStyle=skin;x.strokeStyle='#775923';x.lineWidth=1.2;x.lineJoin='round';
      x.beginPath();x.moveTo(20,-25);x.quadraticCurveTo(8,-20,Math.sin(phase*.4)*2,-29);x.quadraticCurveTo(1,-15,14,-12);x.quadraticCurveTo(21,-3,32,-5);x.quadraticCurveTo(44,-8,40,-20);x.lineTo(40,-29);x.lineTo(47,-29);x.quadraticCurveTo(53,-29,53,-34);x.lineTo(53,-42);x.quadraticCurveTo(53,-48,47,-48);x.lineTo(34,-48);x.quadraticCurveTo(27,-48,27,-42);x.lineTo(25,-33);x.closePath();x.fill();x.stroke();
      // Soft belly, ridge highlights and small scales give the silhouette depth.
      x.fillStyle='#f8dfa0';x.beginPath();x.moveTo(37,-29);x.quadraticCurveTo(34,-16,36,-8);x.quadraticCurveTo(29,-4,25,-10);x.quadraticCurveTo(30,-17,31,-29);x.closePath();x.fill();
      x.strokeStyle='#ffe9ad88';x.lineWidth=1.5;x.beginPath();x.moveTo(8,-22);x.quadraticCurveTo(19,-17,24,-27);x.lineTo(29,-39);x.stroke();
      x.fillStyle='#936d2e66';[[24,-24],[29,-19],[26,-14]].forEach(([a,b])=>{x.beginPath();x.ellipse(a,b,1.4,2,-.5,0,7);x.fill()});
      leg(25,run?Math.sin(phase)*.65:y<0?-.7:0,dead?'#b08a34':'#dfad2e');
      x.strokeStyle='#8c6526';x.lineWidth=3;x.lineCap='round';x.beginPath();x.moveTo(37,-24);x.lineTo(43,-22);x.lineTo(46,-24);x.stroke();x.strokeStyle='#f7df96';x.lineWidth=1;x.beginPath();x.moveTo(44,-23);x.lineTo(46,-21);x.stroke();
      const blink=!dead&&renderClock%4300>4150;
      if(dead){x.strokeStyle='#6d3528';x.lineWidth=1.7;x.beginPath();x.moveTo(40,-43);x.lineTo(45,-38);x.moveTo(45,-43);x.lineTo(40,-38);x.stroke()}
      else if(blink){x.strokeStyle='#523d1b';x.lineWidth=1.4;x.beginPath();x.moveTo(40,-40);x.lineTo(45,-40);x.stroke()}
      else{x.fillStyle='#fff1c2';x.beginPath();x.ellipse(43,-41,3.5,3.8,0,0,7);x.fill();x.fillStyle='#251c0e';x.beginPath();x.arc(44,-40.5,1.9,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(44.5,-41.5,.7,0,7);x.fill()}
      x.fillStyle='#775923';x.beginPath();x.arc(50,-37,.8,0,7);x.fill();x.strokeStyle='#8c6427';x.lineWidth=1;x.beginPath();x.moveTo(42,-33);x.lineTo(51,-33);x.stroke();
      x.fillStyle='#fff0c4';x.beginPath();x.moveTo(45,-33);x.lineTo(47,-33);x.lineTo(46,-30.5);x.closePath();x.fill();x.restore();
    };
    draw=()=>{
      const sky=x.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#130f08');sky.addColorStop(1,'#21180c');x.fillStyle=sky;x.fillRect(0,0,W,H);
      x.fillStyle='#bba66b44';[[42,24],[216,17],[327,39],[446,19],[568,43]].forEach(([a,b])=>x.fillRect(a,b,1,1));
      x.fillStyle='#5a49232b';x.beginPath();x.arc(106,35,11,0,7);x.fill();x.fillStyle='#cbb57866';x.beginPath();x.arc(106,35,7,0,7);x.fill();
      x.fillStyle='#30230f';for(let j=-1;j<4;j++){const off=j*270-(travel*.075%270);x.beginPath();x.moveTo(off,gy);x.quadraticCurveTo(off+75,gy-70,off+135,gy-24);x.quadraticCurveTo(off+210,gy-65,off+290,gy);x.fill()}
      x.fillStyle='#2b2113';clouds.forEach(c=>{x.beginPath();x.roundRect(c.x,c.y,44,7,4);x.fill();x.beginPath();x.ellipse(c.x+23,c.y-1,12,6,0,0,7);x.fill()});
      x.fillStyle='#21190e';x.fillRect(0,gy,W,H-gy);x.fillStyle='#766035';x.fillRect(0,gy,W,1);x.fillStyle='#6a522c';bumps.forEach(b=>{x.fillRect(b.x,gy+7,b.w,1);x.fillStyle='#49371d';x.fillRect(b.x+12,gy+17,b.w*.6,1);x.fillStyle='#6a522c'});
      ob.forEach(o=>{if(o.k===3){const by=gy-o.yo-12,flap=Math.sin(renderClock*.02+o.x*.01)*12;x.fillStyle='#a6883c';x.beginPath();x.moveTo(o.x+17,by);x.quadraticCurveTo(o.x+13,by+flap-9,o.x+4,by+flap-7);x.lineTo(o.x+12,by+4);x.lineTo(o.x+26,by+4);x.quadraticCurveTo(o.x+33,by+flap,o.x+32,by+flap-7);x.lineTo(o.x+23,by);x.closePath();x.fill();x.fillStyle='#e2c16c';x.beginPath();x.ellipse(o.x+20,by+1,8,4,0,0,7);x.fill();x.beginPath();x.moveTo(o.x+12,by);x.lineTo(o.x+2,by+3);x.lineTo(o.x+14,by+4);x.fill();x.fillStyle='#251b0d';x.fillRect(o.x+13,by,1.5,1.5);return}
        o.k===2?(cactus(o.x,17,o.h),cactus(o.x+19,17,o.h-8)):cactus(o.x,o.w,o.h)});
      x.save();x.globalAlpha=.2*Math.max(.3,1+y/150);x.fillStyle='#000';x.beginPath();x.ellipse(59,gy+2,19*Math.max(.5,1+y/180),3,0,0,7);x.fill();x.restore();
      x.save();dust.forEach(p=>{x.globalAlpha=p.life/45;x.fillStyle='#c5a966';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});x.restore();dinosaur();
      x.fillStyle='#b8aa80';x.font='14px "DM Mono",monospace';x.textAlign='right';x.fillText('HI '+String(hi).padStart(5,'0')+'  '+String(sc).padStart(5,'0'),W-12,22);
      if(state==='ready')msg('Press Space or tap to start');if(state==='over')msg('Game over. Press Space to retry')};
    key=(k,e)=>{if(k==='ArrowDown'||k==='s'){e.preventDefault();setDuck(k,true)}else if(k===' '||k==='ArrowUp'||k==='w'){e.preventDefault();if(!e.repeat)jump()}};cv.onclick=()=>{if(!paused)jump()};
  }else{
    const N=20,C=18;let sn,previousSnake,dr,turns,fd,sparkles=[];
    const food=()=>{const empty=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(!sn.some(q=>q[0]===x&&q[1]===y))empty.push([x,y]);fd=empty.length?empty[Math.random()*empty.length|0]:null};
    reset=()=>{sn=[[10,10],[9,10],[8,10]];previousSnake=sn.map(p=>[...p]);dr=[1,0];turns=[];sparkles=[];renderClock=0;playTime=0;sc=0;rate=snakeInterval(0);state='ready';food();info()};
    step=()=>{dr=turns.shift()||dr;const next=advanceSnake(sn,dr,fd,N);if(!next)return over();previousSnake=sn;sn=next.snake;
      if(next.ate){for(let i=0;i<9;i++)sparkles.push({x:fd[0]*C+C/2,y:fd[1]*C+C/2,a:i*Math.PI*2/9,born:renderClock});sc++;info();if(next.won){fd=null;return over(true)}food()}};
    draw=(alpha=1)=>{
      for(let i=0;i<N;i++)for(let j=0;j<N;j++){x.fillStyle=(i+j)%2?'#19150d':'#1d180f';x.fillRect(i*C,j*C,C,C)}
      x.strokeStyle='#6b552018';x.lineWidth=.6;for(let n=1;n<N;n++){x.beginPath();x.moveTo(n*C,0);x.lineTo(n*C,H);x.moveTo(0,n*C);x.lineTo(W,n*C);x.stroke()}
      if(fd){
        const fx=fd[0]*C+C/2,fy=fd[1]*C+C/2;
        const glow=x.createRadialGradient(fx,fy,2,fx,fy,21);glow.addColorStop(0,'#ca9a2428');glow.addColorStop(1,'#ca9a2400');x.fillStyle=glow;x.fillRect(fx-21,fy-21,42,42);
        x.fillStyle='#0005';x.beginPath();x.ellipse(fx,fy+8,7,2.5,0,0,7);x.fill();
        x.save();x.translate(fx,fy);x.scale(.78+Math.sin(renderClock*.003)*.025,.78+Math.sin(renderClock*.003)*.025);
        const fruit=x.createRadialGradient(-4,-4,1,1,2,13);fruit.addColorStop(0,'#ef9a70');fruit.addColorStop(.4,'#d4654d');fruit.addColorStop(1,'#8d382b');x.fillStyle=fruit;x.strokeStyle='#733327';x.lineWidth=1;
        x.beginPath();x.moveTo(0,-5);x.bezierCurveTo(-10,-12,-13,0,-6,8);x.quadraticCurveTo(-2,12,1,9);x.quadraticCurveTo(6,12,10,3);x.bezierCurveTo(14,-8,6,-12,0,-5);x.fill();x.stroke();
        x.strokeStyle='#907042';x.lineWidth=2;x.lineCap='round';x.beginPath();x.moveTo(0,-5);x.quadraticCurveTo(2,-9,1,-12);x.stroke();
        x.fillStyle='#91a95c';x.beginPath();x.moveTo(1,-10);x.quadraticCurveTo(5,-17,10,-12);x.quadraticCurveTo(7,-6,1,-10);x.fill();
        x.strokeStyle='#ffdbb988';x.lineWidth=1.8;x.beginPath();x.moveTo(-6,-4);x.quadraticCurveTo(-9,-1,-6,3);x.stroke();x.restore();
      }
      const blend=state==='run'?Math.min(1,alpha):1;
      const points=sn.map((cell,i)=>{const from=previousSnake[Math.min(i,previousSnake.length-1)]||cell;return [(from[0]+(cell[0]-from[0])*blend)*C+C/2,(from[1]+(cell[1]-from[1])*blend)*C+C/2]});
      const head=points[0],body=points.slice(0,-1),base=points[points.length-2],tip=points[points.length-1];
      const tube=()=>{x.beginPath();x.moveTo(body[0][0],body[0][1]);for(let i=1;i<body.length-1;i++){const mid=[(body[i][0]+body[i+1][0])/2,(body[i][1]+body[i+1][1])/2];x.quadraticCurveTo(body[i][0],body[i][1],mid[0],mid[1])}x.lineTo(body[body.length-1][0],body[body.length-1][1])};
      // A tapered tail joins a smooth, shaded tube rather than square segments.
      x.save();x.translate(base[0],base[1]);x.rotate(Math.atan2(tip[1]-base[1],tip[0]-base[0]));const length=Math.hypot(tip[0]-base[0],tip[1]-base[1]);x.fillStyle='#bd9430';x.strokeStyle='#71551f';x.lineWidth=1.5;x.beginPath();x.moveTo(0,-6.5);x.quadraticCurveTo(length*.7,-5,length+5,0);x.quadraticCurveTo(length*.7,5,0,6.5);x.closePath();x.fill();x.stroke();x.restore();
      x.lineCap=x.lineJoin='round';tube();x.strokeStyle='#76591f';x.lineWidth=16;x.stroke();
      const skin=x.createLinearGradient(head[0]-10,head[1]-10,base[0]+10,base[1]+12);skin.addColorStop(0,'#f1cc67');skin.addColorStop(.45,'#dfb33b');skin.addColorStop(1,'#bd8c26');tube();x.strokeStyle=skin;x.lineWidth=12;x.stroke();
      x.save();x.translate(-1.5,-2);tube();x.strokeStyle='#ffe8a455';x.lineWidth=3;x.stroke();x.restore();
      for(let i=1;i<points.length-1;i++){
        const p=points[i],prev=points[i-1],next=points[i+1];x.save();x.translate(p[0],p[1]);x.rotate(Math.atan2(prev[1]-next[1],prev[0]-next[0]));x.strokeStyle='#87671d55';x.lineWidth=.8;x.beginPath();x.moveTo(-2,-4);x.lineTo(1,0);x.lineTo(-2,4);x.stroke();x.restore();
      }
      const angle=Math.atan2(head[1]-points[1][1],head[0]-points[1][0]);
      x.save();x.translate(head[0],head[1]);x.rotate(angle);
      if(state==='run'&&Math.sin(renderClock*.011)>.72){x.strokeStyle='#d97b59';x.lineWidth=1.4;x.beginPath();x.moveTo(8,0);x.lineTo(18,0);x.moveTo(18,0);x.lineTo(21,-2);x.moveTo(18,0);x.lineTo(21,2);x.stroke()}
      const face=x.createLinearGradient(0,-10,0,10);face.addColorStop(0,'#f8dc88');face.addColorStop(.55,'#e5bb48');face.addColorStop(1,'#bd8e2e');x.fillStyle=face;x.strokeStyle='#7d5d20';x.lineWidth=1.2;x.beginPath();x.ellipse(0,0,10.5,8.8,0,0,7);x.fill();x.stroke();
      const blink=renderClock%4700>4560;
      for(const sign of [-1,1]){
        const ey=sign*6;x.fillStyle='#fff0ba';x.beginPath();x.ellipse(2.5,ey,3.8,3.1,0,0,7);x.fill();
        if(state==='over'){x.strokeStyle='#6d3528';x.lineWidth=1.4;x.beginPath();x.moveTo(1,ey-1.5);x.lineTo(4,ey+1.5);x.moveTo(4,ey-1.5);x.lineTo(1,ey+1.5);x.stroke()}
        else if(blink){x.strokeStyle='#624b1e';x.lineWidth=1.2;x.beginPath();x.moveTo(0,ey);x.lineTo(5,ey);x.stroke()}
        else{x.fillStyle='#251d0d';x.beginPath();x.arc(3.7,ey,1.9,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(4.2,ey-.7,.65,0,7);x.fill()}
      }
      x.fillStyle='#8e6c26';for(const yy of [-2,2]){x.beginPath();x.arc(8,yy,.65,0,7);x.fill()}
      x.strokeStyle='#bc8f2e';x.lineWidth=.8;x.beginPath();x.moveTo(-5,-3);x.lineTo(-2,0);x.lineTo(-5,3);x.stroke();x.restore();
      sparkles=sparkles.filter(p=>renderClock-p.born<380);sparkles.forEach(p=>{const age=(renderClock-p.born)/380;x.save();x.globalAlpha=1-age;x.fillStyle='#edc76a';x.beginPath();x.arc(p.x+Math.cos(p.a)*age*22,p.y+Math.sin(p.a)*age*22,1.6*(1-age),0,7);x.fill();x.restore()});
      x.strokeStyle='#54431d';x.lineWidth=1;x.strokeRect(.5,.5,W-1,H-1);
      if(state==='ready')msg('Press an arrow key or swipe to start');if(state==='over')msg('Game over. Press Space to retry');if(state==='won')msg('Board complete! Space to play again')};
    const M={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
    key=(k,e)=>{const v=M[k];if(v){e.preventDefault();if(state==='over'||state==='won')return;state='run';const basis=turns[turns.length-1]||dr;if(turns.length<2&&(v[0]!==basis[0]||v[1]!==basis[1])&&(v[0]!==-basis[0]||v[1]!==-basis[1]))turns.push(v)}else if(k===' '&&(state==='over'||state==='won')){e.preventDefault();reset()}};
    let sx=0,sy=0;cv.style.touchAction='none';cv.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY});
    cv.addEventListener('pointerup',e=>{if(paused)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.hypot(dx,dy)<20){if(state==='over'||state==='won')reset();return}key(Math.abs(dx)>Math.abs(dy)?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp'),{preventDefault(){}})});
  }
  controls.querySelectorAll('button')[1].onclick=()=>{paused=false;pauseButton.textContent='Pause';reset();if(dino)jump();cv.focus()};
  cv.addEventListener('pointerdown',()=>cv.focus());
  const onKey=e=>{if(!live()){removeEventListener('keydown',onKey);return}if(!act()||e.target?.matches('input,textarea,[contenteditable="true"]'))return;if(e.target?.closest('button')&&(e.key===' '||e.key==='Enter'))return;const k=e.key.length===1?e.key.toLowerCase():e.key;if(k==='p'){e.preventDefault();if(!e.repeat)togglePause();return}if(!paused)key(k,e)};
  const onUp=e=>releaseKey(e.key.length===1?e.key.toLowerCase():e.key),onBlur=()=>releaseAction();
  const cleanup=()=>{removeEventListener('keydown',onKey);removeEventListener('keyup',onUp);removeEventListener('blur',onBlur)};
  let prev=0,acc=0,mix=1;const loop=ts=>{if(!live()){cleanup();return}requestAnimationFrame(loop);const dt=Math.min(ts-prev,100);prev=ts;
    if(!act())releaseAction();if(act()&&!paused)renderClock+=dt;if(state==='run'&&act()&&!paused){playTime+=dt/1000;if(!dino)rate=snakeInterval(playTime);acc+=dt;while(acc>=rate&&state==='run'){acc-=rate;step()}mix=acc/rate}else if(state!=='run'){acc=0;mix=1}draw(mix);if(paused)msg('Paused. Press P or Resume')};
  reset();addEventListener('keydown',onKey);addEventListener('keyup',onUp);addEventListener('blur',onBlur);requestAnimationFrame(loop);return d}
