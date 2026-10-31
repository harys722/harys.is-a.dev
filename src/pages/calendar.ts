// @ts-nocheck
// Independent of the small taskbar calendar. All dates are calculated locally.
const hijriFormat=(()=>{try{const format=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'});return format.resolvedOptions().calendar==='islamic-umalqura'?format:null}catch{return null}})();
export function hijriDate(date){
 if(!hijriFormat)return null;
 const parts=Object.fromEntries(hijriFormat.formatToParts(date).filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
 return {day:Number(parts.day),month:parts.month,year:Number(parts.year),full:hijriFormat.format(date)};
}
const dateKey=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
export function monthDates(year,month,mondayFirst=false){
 const first=new Date(year,month,1,12),lead=(first.getDay()-(mondayFirst?1:0)+7)%7,count=new Date(year,month+1,0,12).getDate();
 return Array.from({length:Math.ceil((lead+count)/7)*7},(_,index)=>new Date(year,month,index-lead+1,12));
}
export function calendarUI(mondayFirst=false){
 const root=document.createElement('div');root.className='pad dual-calendar';
 let selected=new Date(),view=new Date(selected.getFullYear(),selected.getMonth(),1,12),lastToday=dateKey(selected);
 root.innerHTML=`<div class="dual-toolbar"><div aria-live="polite"><h1 data-calendar-month></h1><p data-hijri-range></p></div><div class="dual-actions"><button class="btn ghost sm" data-calendar-today>Today</button><button class="btn ghost sm" data-calendar-move="-1" aria-label="Previous month">‹</button><button class="btn ghost sm" data-calendar-move="1" aria-label="Next month">›</button></div></div>
 <p class="dual-legend">Gregorian dates <span>Hijri dates underneath</span></p>
 <table class="dual-grid"><caption class="sr-only">Gregorian month with the corresponding Hijri date on each day</caption><thead><tr></tr></thead><tbody></tbody></table>
 <details class="dual-options"><summary>Options</summary><div class="dual-options-body"><label>Jump to month <input type="month" aria-label="Jump to month"></label><div><small>Today</small><span data-full-today></span><small>Selected day</small><span data-full-selected aria-live="polite"></span></div></div></details>
 <p class="dual-calendar-note">Hijri dates follow Umm al-Qura. Local moon sightings may differ.</p>`;
 const get=selector=>root.querySelector(selector),full=date=>date.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),tbody=get('tbody'),jump=get('input');
 const weekdays=Array.from({length:7},(_,index)=>new Date(2023,0,1+index+(mondayFirst?1:0),12).toLocaleDateString('en',{weekday:'short'}));
 get('thead tr').innerHTML=weekdays.map(day=>`<th scope="col">${day}</th>`).join('');
 const select=(date,focus=false)=>{selected=date;view=new Date(date.getFullYear(),date.getMonth(),1,12);draw();if(focus)get('[data-calendar-date="'+dateKey(date)+'"]')?.focus()};
 const draw=()=>{
  const now=new Date(),today=dateKey(now),year=view.getFullYear(),month=view.getMonth(),dates=monthDates(year,month,mondayFirst),firstHijri=hijriDate(view),lastHijri=hijriDate(new Date(year,month+1,0,12));
  get('[data-calendar-month]').textContent=view.toLocaleDateString('en',{month:'long',year:'numeric'});
  get('[data-hijri-range]').textContent=firstHijri&&lastHijri?firstHijri.month+' '+firstHijri.year+(firstHijri.month===lastHijri.month&&firstHijri.year===lastHijri.year?'':' / '+lastHijri.month+' '+lastHijri.year)+' AH':'';
  jump.value=year+'-'+String(month+1).padStart(2,'0');
  get('[data-full-today]').textContent=full(now)+(hijriDate(now)?' · '+hijriDate(now).full:'');
  get('[data-full-selected]').textContent=full(selected)+(hijriDate(selected)?' · '+hijriDate(selected).full:'');
  let cells='';for(let index=0;index<dates.length;index++){
   const date=dates[index],key=dateKey(date),hijri=hijriDate(date),isToday=key===today,isSelected=key===dateKey(selected);
   if(index%7===0)cells+='<tr>';
   cells+=`<td${date.getMonth()!==month?' class="dual-outside"':''}><button type="button" data-calendar-date="${key}" aria-label="${full(date)}${hijri?', '+hijri.full:''}" title="${full(date)}${hijri?', '+hijri.full:''}" aria-pressed="${isSelected}"${isToday?' aria-current="date"':''}><strong>${date.getDate()}</strong><small>${hijri?hijri.day:'?'}</small>${isToday?'<i aria-hidden="true"></i>':''}</button></td>`;
   if(index%7===6)cells+='</tr>';
  }
  tbody.innerHTML=cells;
 };
 root.addEventListener('click',event=>{
  const move=event.target.closest('[data-calendar-move]');if(move){view=new Date(view.getFullYear(),view.getMonth()+Number(move.dataset.calendarMove),1,12);draw();return}
  if(event.target.closest('[data-calendar-today]'))return select(new Date());
  const day=event.target.closest('[data-calendar-date]');if(day){const [year,month,date]=day.dataset.calendarDate.split('-').map(Number);select(new Date(year,month-1,date,12),true)}
 });
 jump.addEventListener('change',()=>{const match=jump.value.match(/^(\d{4,})-(\d{2})$/);if(match&&Number(match[2])>=1&&Number(match[2])<=12){view=new Date(Number(match[1]),Number(match[2])-1,1,12);draw()}});
 tbody.addEventListener('keydown',event=>{
  const day=event.target.closest('[data-calendar-date]'),offset={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[event.key];if(!day||!offset)return;
  event.preventDefault();const [year,month,date]=day.dataset.calendarDate.split('-').map(Number);select(new Date(year,month-1,date+offset,12),true);
 });
 draw();const timer=setInterval(()=>{if(!root.isConnected){clearInterval(timer);return}const today=dateKey(new Date());if(today!==lastToday){lastToday=today;draw()}},30000);
 return root;
}
