// @ts-nocheck


export const APPS={
  'not-found':{t:'Page not found',i:'folder',w:560,h:320},
  'game/traffic':{t:'Traffic Run',i:'gamepad',w:480,h:650},
  'event/eid-ul-adha':{t:'Eid al-Adha Countdown',i:'i-cal',w:900,h:680,src:'/events/eid-ul-adha.html'},
  about:{t:'About',i:'user',w:680,h:640},
  works:{t:'Works',i:'brief',w:720,h:580},
  servers:{t:'Discord servers',i:'chat',w:720,h:500},
  projects:{t:'Projects',i:'folder',w:760,h:680},
  tools:{t:'Tools',i:'code',w:740,h:460},
  contact:{t:'Contact',i:'mail',w:560,h:340},
  settings:{t:'Settings',i:'gear',w:640,h:620},
  links:{t:'Links',i:'link',w:580,h:540},
  events:{t:'Events',i:'i-cal',w:640,h:400},
  welcome:{t:'Welcome',i:'home',w:600,h:470},
  time:{t:'My Time',i:'i-clock',w:600,h:400},
  games:{t:'Games',i:'gamepad',w:560,h:340},
  'game/snake':{t:'Snake',i:'gamepad',w:460,h:640},
  'game/dino':{t:'Dino Run',i:'gamepad',w:720,h:390},
  featured:{t:'Featured Projects',i:'star',w:840,h:660},
  'event/ramadan':{t:'Ramadan Countdown',i:'i-cal',w:900,h:620,src:'/events/ramadan.html'}
};
export const TOOLS=[['discord-embed-builder','Discord Embed Builder',0,'ti-embed'],['gemini-api-tester','Gemini API Tester',0,'ti-api'],['color-picker','Color Picker',0,'ti-color'],['timestamp-generator','Timestamp Generator',0,'ti-time'],['ansi-text-colorizer','ANSI Text Colorizer',0,'ti-ansi'],['password-generator','Password Generator',0,'ti-pass']];
TOOLS.forEach(([s,t,u,i])=>APPS['tool/'+s]={t,i:i||'code',w:980,h:660,online:s==='gemini-api-tester'||s==='discord-embed-builder',src:u||'/tools/'+s+'.html'});
