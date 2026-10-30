import {lk, sv} from '../core/util';
export const ROAD={width:360,height:450,centers:[80,180,280],carWidth:34,carHeight:62,playerY:350,laneSpeed:680,rowGap:340,maxSpeed:230};
export const trafficSpeed=(seconds:number)=>Math.min(ROAD.maxSpeed,85+Math.max(0,seconds-8));
export function trafficRow(score:number,random=Math.random):number[]{
  const safe=Math.min(2,Math.floor(random()*3));
  const occupied=[0,1,2].filter(lane=>lane!==safe);
  return score>=6&&random()<.35?occupied:[occupied[Math.min(1,Math.floor(random()*2))]];
}
export function hitsCar(playerX:number,carX:number,carY:number){
  // Body-only collision, with a small margin for mirrors and visual edges.
  return Math.abs(playerX-carX)<ROAD.carWidth-10&&carY+ROAD.carHeight-7>ROAD.playerY+7&&carY+7<ROAD.playerY+ROAD.carHeight-7;
}


export function trafficUI() {
  const panel=document.createElement('div');panel.className='pad gm traffic';
  panel.innerHTML='<p class="traffic-help">Find the open lane. Use Left / Right, A / D or the buttons below.</p><canvas width="360" height="450" tabindex="0" aria-label="Traffic Run, three lane driving game"></canvas><p class="gh" role="status"></p><div class="traffic-controls"><button class="btn" aria-label="Move left">&#8592; Left</button><button class="btn ghost" aria-label="Start or restart game">Start</button><button class="btn" aria-label="Move right">Right &#8594;</button></div>';
  const canvas=panel.querySelector('canvas')!,ctx=canvas.getContext('2d')!,scoreLabel=panel.querySelector('.gh')!;
  const buttons=panel.querySelectorAll('button');
  let lane=1,playerX=180,score=0,best=lk('hs.hi.game/traffic',0),running=false,crashed=false;
  let cars:{lane:number;y:number;color:string}[]=[],distance=0,toRow=0,previous=0,elapsed=0;
  const colors=['#9dbdc7','#bd867d','#a6b190','#b9a2c9'];
  const info=()=>{scoreLabel.textContent='Passed '+score+' · Best '+best;buttons[1].textContent=running?'Restart':crashed?'Retry':'Start'};
  const reset=()=>{lane=1;playerX=180;score=0;cars=[];distance=0;toRow=0;elapsed=0;crashed=false;running=true;info();canvas.focus()};
  const move=(direction:number)=>{if(!running)reset();lane=Math.max(0,Math.min(2,lane+direction))};
  buttons[0].onclick=()=>move(-1);buttons[1].onclick=reset;buttons[2].onclick=()=>move(1);
  canvas.onclick=event=>{if(!running)reset();else move(event.offsetX<canvas.clientWidth/2?-1:1)};
  const onKey=(event:KeyboardEvent)=>{
    const win=panel.closest<HTMLElement>('.win');
    if(!panel.isConnected||!win?.classList.contains('on')||win.hidden)return;
    if((event.target as HTMLElement)?.matches('input,textarea,[contenteditable="true"]'))return;
    const key=event.key.toLowerCase();
    if(['arrowleft','arrowright','a','d',' '].includes(key)){
      event.preventDefault();if(event.repeat)return;
      if(key===' '){if(!running)reset()}else move(['arrowleft','a'].includes(key)?-1:1);
    }
  };
  addEventListener('keydown',onKey);
  function rounded(x:number,y:number,w:number,h:number,r:number,color:string){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
  function car(center:number,y:number,color:string,player=false){
    const x=center-17;
    rounded(x+1,y+4,36,64,9,'#0007');
    for(const side of [-3,31]){rounded(x+side,y+10,6,13,2,'#0b0d10');rounded(x+side,y+43,6,13,2,'#0b0d10')}
    rounded(x,y,34,62,8,color);
    const paint=ctx.createLinearGradient(x,0,x+34,0);paint.addColorStop(0,'#0004');paint.addColorStop(.45,'#fff3');paint.addColorStop(1,'#0005');ctx.fillStyle=paint;ctx.beginPath();ctx.roundRect(x,y,34,62,8);ctx.fill();
    rounded(x+5,y+16,24,27,5,player?'#d7a937':color);
    rounded(x+5,y+13,24,11,3,'#233341');rounded(x+6,y+40,22,8,3,'#233341');
    ctx.fillStyle='#b9e7ef70';ctx.fillRect(x+8,y+15,17,2);ctx.fillRect(x+9,y+42,15,1);
    rounded(x-3,y+22,4,5,1,color);rounded(x+33,y+22,4,5,1,color);
    for(const dx of [4,24]){rounded(x+dx,y+4,6,4,1,'#fff1bc');rounded(x+dx,y+55,6,3,1,'#d24b45')}
    ctx.strokeStyle='#0003';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+4,y+29);ctx.lineTo(x+4,y+38);ctx.moveTo(x+30,y+29);ctx.lineTo(x+30,y+38);ctx.stroke();
  }
  function loop(time:number){
    if(!panel.isConnected){removeEventListener('keydown',onKey);return}
    const dt=Math.min((time-previous)/1000,.04);previous=time;
    const win=panel.closest<HTMLElement>('.win')!;
    if(running&&!document.hidden&&!win.hidden&&win.classList.contains('on')){
      elapsed+=dt;const speed=trafficSpeed(elapsed);distance+=speed*dt;toRow-=speed*dt;
      const target=ROAD.centers[lane],difference=target-playerX;
      playerX+=Math.sign(difference)*Math.min(Math.abs(difference),ROAD.laneSpeed*dt);
      if(toRow<=0){trafficRow(score).forEach(l=>cars.push({lane:l,y:-80,color:colors[Math.floor(Math.random()*colors.length)]}));toRow+=ROAD.rowGap}
      for(const other of cars){other.y+=speed*dt;if(hitsCar(playerX,ROAD.centers[other.lane],other.y)){running=false;crashed=true;best=Math.max(best,score);sv('hs.hi.game/traffic',best);info();break}}
      const passed=cars.filter(other=>other.y>ROAD.height+10).length;
      cars=cars.filter(other=>other.y<=ROAD.height+10);if(passed){score+=passed;info()}
    }
    ctx.fillStyle='#111916';ctx.fillRect(0,0,360,450);
    ctx.fillStyle='#242a2e';ctx.fillRect(30,0,300,450);
    ctx.fillStyle='#556059';ctx.fillRect(23,0,4,450);ctx.fillRect(333,0,4,450);
    for(let y=(distance%48)-48;y<450;y+=48){ctx.fillStyle='#c5be9b';ctx.fillRect(29,y,2,25);ctx.fillRect(329,y,2,25)}
    ctx.fillStyle='#929895';for(const x of [130,230])for(let y=(distance%80)-80;y<450;y+=80)ctx.fillRect(x-1,y,2,32);
    cars.forEach(other=>car(ROAD.centers[other.lane],other.y,other.color));car(playerX,ROAD.playerY,crashed?'#c36c52':'#e6b422',true);
    if(!running){rounded(35,167,290,94,12,'#101619f2');ctx.fillStyle='#f4ecd6';ctx.font='600 21px system-ui';ctx.textAlign='center';ctx.fillText(crashed?'Try another run':'Traffic Run',180,202);ctx.fillStyle='#b8c5c3';ctx.font='13px system-ui';ctx.fillText('Space or tap to '+(crashed?'retry':'start'),180,230)}
    requestAnimationFrame(loop);
  }
  info();requestAnimationFrame(loop);return panel;
}
