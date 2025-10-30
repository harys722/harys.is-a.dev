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

    // Ramadan date - Expected start date for Ramadan 2026 (adjust as needed)
    const ramadanDate = new Date('2026-02-17T00:00:00');
    
    // Update countdown
    function updateCountdown() {
      const now = new Date();
      const diff = ramadanDate - now;

      if (diff <= 0) {
        document.getElementById('celebration').classList.add('active');
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
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