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

// Generate stars
    function createStars() {
      const sky = document.getElementById('sky');
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        sky.appendChild(star);
      }
    }

    // Generate clouds
    function createClouds() {
      const sky = document.getElementById('sky');
      const cloudCount = 5;

      for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        cloud.style.width = (Math.random() * 200 + 100) + 'px';
        cloud.style.height = (Math.random() * 50 + 30) + 'px';
        cloud.style.top = (Math.random() * 60 + 10) + '%';
        cloud.style.left = -200 + 'px';
        cloud.style.animationDelay = (Math.random() * 20) + 's';
        cloud.style.animationDuration = (Math.random() * 40 + 40) + 's';
        
        sky.appendChild(cloud);
      }
    }

    let cycle, checkedDay='', dismissedYear=null;
    document.getElementById('dismiss-celebration').onclick=()=>{
      dismissedYear=cycle?.year;
      document.getElementById('celebration').classList.remove('active');
    };
    
    // Update countdown
    function updateCountdown() {
      const now = new Date();
      try {
        if(checkedDay!==now.toDateString()){
          cycle=eventCycle(9,1,30,now);checkedDay=now.toDateString();
          document.getElementById('expected-date').textContent=dateLabel(cycle.start)+' · '+cycle.year+' AH';
        }
        document.querySelector('.countdown-label').textContent=cycle.active?'Ramadan is here · Estimated time until Eid ul Fitr':'Ramadan Begins In...';
        document.getElementById('celebration').classList.toggle('active',cycle.active&&dismissedYear!==cycle.year);
        countdownValues(cycle.active?cycle.end:cycle.start,now).forEach((value,i)=>{
          document.getElementById(['days','hours','minutes','seconds'][i]).textContent=String(value).padStart(2,'0');
        });
      } catch(error) {
        document.getElementById('expected-date').textContent=error.message;
      }
    }

    // Add glow effect on countdown numbers when they change
    function addGlowEffect(elementId) {
      const element = document.getElementById(elementId);
      element.style.textShadow = '0 0 30px rgba(255, 215, 0, 1)';
      setTimeout(() => {
        element.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
      }, 300);
    }

    // Enhanced countdown with glow effects
    let lastSeconds = -1;
    function updateCountdownWithEffects() {
      updateCountdown();
      const currentSeconds = parseInt(document.getElementById('seconds').textContent);
      if (currentSeconds !== lastSeconds && lastSeconds !== -1) {
        addGlowEffect('seconds');
        if (currentSeconds === 59) addGlowEffect('minutes');
      }
      lastSeconds = currentSeconds;
    }

    // Initialize
    createStars();
    createClouds();
    updateCountdownWithEffects();
    setInterval(updateCountdownWithEffects, 1000);

    // Optional: Play subtle sound when Ramadan begins
    function playNotificationSound() {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 528; // Healing frequency
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 3);
    }
