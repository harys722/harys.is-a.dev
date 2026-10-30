// Calendar helpers: kept here so this page works independently.
// Calculated civil dates, not predictions of local moon sightings. No network required.
function hijriFormatter() {
  const formatter = new Intl.DateTimeFormat('en-US-u-nu-latn', {
    calendar: 'islamic-umalqura', year: 'numeric', month: 'numeric', day: 'numeric'
  });
  if (formatter.resolvedOptions().calendar !== 'islamic-umalqura') {
    throw new Error('This browser does not support the Umm al-Qura calendar.');
  }
  return formatter;
}

function eventCycle(month, firstDay, lastDay, now = new Date(), formatter = hijriFormatter()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const parts = date => Object.fromEntries(formatter.formatToParts(date)
    .filter(p => ['year', 'month', 'day'].includes(p.type)).map(p => [p.type, Number(p.value)]));
  // Start before today so the whole current observance remains active. Search beyond
  // one lunar year; Date handles leap years, DST and Gregorian year boundaries.
  let start = null, year;
  for (let offset = -35; offset <= 400; offset++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const h = parts(date);
    if (h.month === month && h.day === firstDay) { start = date; year = h.year; }
    if (start && (h.month !== month || h.day > lastDay)) {
      if (date > now) return { start, end: date, year, active: start <= now };
      start = null;
    }
  }
  throw new Error('Unable to calculate the next observance in this browser.');
}

function countdownValues(target, now = new Date()) {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
}

const dateLabel = date => date.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });

// Page code
let checkedDay='',cycle;
function update(){
  const now=new Date();
  try{
    if(checkedDay!==now.toDateString()){
      cycle=eventCycle(12,10,12,now);checkedDay=now.toDateString();
      document.getElementById('expected-date').textContent=dateLabel(cycle.start)+' · '+cycle.year+' AH';
      document.getElementById('status').textContent=cycle.active?'Eid Mubarak!':'A little closer to Eid';
      document.getElementById('countdown-label').textContent=cycle.active?'Time remaining in the estimated celebration':'The celebration begins in';
      document.getElementById('message').textContent=cycle.active?'May your home be filled with love, your table with company, and your heart with gratitude.':'A season of gratitude, giving, and gathering with the people we love.';
    }
    countdownValues(cycle.active?cycle.end:cycle.start,now).forEach((value,i)=>document.getElementById(['days','hours','minutes','seconds'][i]).textContent=String(value).padStart(2,'0'));
  }catch(error){document.getElementById('expected-date').textContent=error.message}
}
update();setInterval(update,1000);
