// @ts-nocheck


export function initCursors(){const mk=(draw,hx,hy,f)=>{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.lineJoin=x.lineCap='round';draw(x);return `url("${c.toDataURL('image/png')}") ${hx} ${hy},${f}`};
 const line=p=>x=>{const P=new Path2D(p);x.strokeStyle='#15110c';x.lineWidth=4;x.stroke(P);x.strokeStyle='#c69a4b';x.lineWidth=1.8;x.stroke(P)};
 const solid=(p,col)=>x=>{const P=new Path2D(p);x.fillStyle=col;x.strokeStyle='#15110c';x.lineWidth=1.3;x.fill(P);x.stroke(P)};
 const MV='M12 2v20M2 12h20M8 6l4-4 4 4M8 18l4 4 4-4M6 8l-4 4 4 4M18 8l4 4-4 4';
 const K={arrow:mk(solid('M3 2l15 8.5-6.5 2L8.5 19z','#c69a4b'),3,2,'default'),
  hand:mk(solid('M8.5 3.2a1.6 1.6 0 0 1 3.2 0V9.5h.6V8.3a1.5 1.5 0 0 1 3 0v1.300h.5V9.100a1.500 1.500 0 0 1 3 0v1.200h.4a1.400 1.400 0 0 1 2.800 0v5.200c0 3.600-2.300 6.200-5.900 6.200h-2.600c-2 0-3.500-.9-4.800-2.600L3.800 15.600a1.600 1.600 0 0 1 2.500-1.900l2.200 1.900z','#eee2ce'),10,2,'pointer'),
  text:mk(line('M8 3h8M12 3v18M8 21h8'),12,12,'text'),
  move:mk(line(MV),12,12,'move'),grabbing:mk(line(MV+'M12 10v4'),12,12,'grabbing'),
  ns:mk(line('M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4'),12,12,'ns-resize'),
  ew:mk(line('M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4'),12,12,'ew-resize'),
  nwse:mk(line('M5 5l14 14M5 10V5h5M19 14v5h-5'),12,12,'nwse-resize'),
  nesw:mk(line('M19 5L5 19M14 5h5v5M5 14v5h5'),12,12,'nesw-resize'),
  no:mk(line('M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M6 6l12 12'),12,12,'not-allowed')};
 Object.values(K).forEach(v=>{const m=/url\("([^"]+)"\)/.exec(v);if(m)new Image().src=m[1]});
 const sy=document.createElement('style');
 sy.textContent=`html.cur *{cursor:${K.arrow}}
html.cur a,html.cur a *,html.cur button,html.cur button *,html.cur summary,html.cur summary *,html.cur label,html.cur label *,html.cur .icon,html.cur .icon *{cursor:${K.hand}}
html.cur .pad p,html.cur .pad li,html.cur .pad h1,html.cur .pad h2,html.cur .pad .big,html.cur input[type=text],html.cur textarea{cursor:${K.text}}
html.cur .rz[data-d=n],html.cur .rz[data-d=s]{cursor:${K.ns}}
html.cur .rz[data-d=e],html.cur .rz[data-d=w]{cursor:${K.ew}}
html.cur .rz[data-d=ne],html.cur .rz[data-d=sw]{cursor:${K.nesw}}
html.cur .rz[data-d=nw],html.cur .rz[data-d=se]{cursor:${K.nwse}}
html.cur .bar,html.cur .bar *,html.cur #card,html.cur #card *{cursor:${K.move}}
html.cur .bar button,html.cur .bar button *{cursor:${K.hand}}
html.cur .bar.gr,html.cur .bar.gr *,html.cur .icon.drag,html.cur .icon.drag *,html.cur #card.gr,html.cur #card.gr *,html.cur #tasks button.drag,html.cur #tasks button.drag *{cursor:${K.grabbing}}
html.cur button:disabled,html.cur button:disabled *{cursor:${K.no}}`;
 document.head.append(sy)}
