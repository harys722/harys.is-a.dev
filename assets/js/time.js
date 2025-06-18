        function formatTime(date) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }

        function updateTimes() {
            const now = new Date();
            
            // My time (UTC+5)
            const myTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Karachi"}));
            const visitorTime = now;
            
            // Format times using custom function to ensure proper 24-hour format
            const myTimeString = formatTime(myTime);
            
            const myDateString = myTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const visitorTimeString = formatTime(visitorTime);
            
            // Update display
            document.getElementById('myTime').textContent = myTimeString;
            document.getElementById('myDate').textContent = myDateString;

            // Visitor's local time
            document.getElementById('visitorTime').textContent = visitorTimeString;
            
            // Determine greeting based on Visitor's local time
            const visitorHour = visitorTime.getHours();
            let greeting;
            if (visitorHour >= 5 && visitorHour < 12) {
                greeting = "🌅 Good morning!";
            } else if (visitorHour >= 12 && visitorHour < 17) {
                greeting = "☀️ Good afternoon!";
            } else if (visitorHour >= 17 && visitorHour < 21) {
                greeting = "🌆 Good evening!";
            } else {
                greeting = "🌙 Good night!";
            }
            
            document.getElementById('greeting').textContent = greeting;
            
            // Calculate timezone difference
            const visitorOffset = -visitorTime.getTimezoneOffset() / 60; // Convert to hours
            const karachiOffset = 5; // UTC+5
            const difference = karachiOffset - visitorOffset;
            
            let timezoneMessage;
            if (difference === 0) {
                timezoneMessage = `You're in the same timezone as me! We're both at UTC+${karachiOffset}.`;
            } else if (difference > 0) {
                timezoneMessage = `Your timezone is UTC${visitorOffset >= 0 ? '+' : ''}${visitorOffset}, which is ${Math.abs(difference)} hour${Math.abs(difference) !== 1 ? 's' : ''} behind my timezone (UTC+5).`;
            } else {
                timezoneMessage = `Your timezone is UTC${visitorOffset >= 0 ? '+' : ''}${visitorOffset}, which is ${Math.abs(difference)} hour${Math.abs(difference) !== 1 ? 's' : ''} ahead of my timezone (UTC+5).`;
            }
            
            document.getElementById('timezoneInfo').textContent = timezoneMessage;
        }
        
        // Update immediately and then every second
        updateTimes();
        setInterval(updateTimes, 1000);
        
        // Add advanced interactivity
        const timeDisplay = document.querySelector('.time-display');
        
        timeDisplay.addEventListener('click', () => {
            // Create overlay for ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = ripple.style.height = '100px';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            timeDisplay.style.position = 'relative'; // ensure parent is positioned
            timeDisplay.appendChild(ripple);
            
            // Animate ripple
            requestAnimationFrame(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(4)';
                ripple.style.opacity = '0';
            });
            
            // Animate scale and background
            timeDisplay.style.transition = 'transform 0.2s ease, background-color 0.3s ease';
            timeDisplay.style.transform = 'scale(1.03)';
            timeDisplay.style.backgroundColor = '#555';
            
            setTimeout(() => {
                timeDisplay.style.transform = 'scale(1)';
                timeDisplay.style.backgroundColor = 'rgba(45, 45, 45, 0.95)';
            }, 200);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
