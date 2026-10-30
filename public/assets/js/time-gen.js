        const timestampFormats = [
            { code: 'f', name: 'Default', order: 1 },
            { code: 'R', name: 'Relative', order: 2 },
            { code: 'F', name: 'Long date/time', order: 3 },
            { code: 'd', name: 'Short date', order: 4 },
            { code: 'D', name: 'Long date', order: 5 },
            { code: 't', name: 'Short time', order: 6 },
            { code: 'T', name: 'Long time', order: 7 }
        ];

        let updateInterval;

        function displayUserTimezone() {
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const timezoneDisplay = document.getElementById('timezoneDisplay');
                timezoneDisplay.textContent = `Your timezone: ${timezone}`;
            } catch (error) {
                console.error('Error getting timezone:', error);
                document.getElementById('timezoneDisplay').textContent = 'Timezone: Unable to detect';
            }
        }

        function setNow() {
            const now = new Date();
            document.getElementById('dateInput').value = formatDate(now);
            document.getElementById('timeInput').value = formatTime(now);
            updateTimestamps();
            startRealTimeUpdate();
        }

        function setTomorrow() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(12, 0, 0, 0); // Set to noon
            document.getElementById('dateInput').value = formatDate(tomorrow);
            document.getElementById('timeInput').value = formatTime(tomorrow);
            updateTimestamps();
            stopRealTimeUpdate();
        }

        function setNext3Days() {
            const next3Days = new Date();
            next3Days.setDate(next3Days.getDate() + 3);
            next3Days.setHours(12, 0, 0, 0); // Set to noon
            document.getElementById('dateInput').value = formatDate(next3Days);
            document.getElementById('timeInput').value = formatTime(next3Days);
            updateTimestamps();
            stopRealTimeUpdate();
        }

        function setNextWeek() {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            nextWeek.setHours(12, 0, 0, 0); // Set to noon
            document.getElementById('dateInput').value = formatDate(nextWeek);
            document.getElementById('timeInput').value = formatTime(nextWeek);
            updateTimestamps();
            stopRealTimeUpdate();
        }

        function setNextMonth() {
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1); // Proper month addition
            nextMonth.setHours(12, 0, 0, 0); // Set to noon
            document.getElementById('dateInput').value = formatDate(nextMonth);
            document.getElementById('timeInput').value = formatTime(nextMonth);
            updateTimestamps();
            stopRealTimeUpdate();
        }

        function startRealTimeUpdate() {
            stopRealTimeUpdate(); // Clear any existing interval
            updateInterval = setInterval(() => {
                const now = new Date();
                document.getElementById('dateInput').value = formatDate(now);
                document.getElementById('timeInput').value = formatTime(now);
                updateTimestamps();
            }, 1000); // Update every second
        }

        function stopRealTimeUpdate() {
            if (updateInterval) {
                clearInterval(updateInterval);
                updateInterval = null;
            }
        }

        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        function formatTime(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }

        function formatTimestamp(date, format) {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                weekday: 'long',
                hour12: true
            };

            switch(format) {
                case 'f': // Default / Short date/time
                    return date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });
                case 'F': // Long date/time
                    return date.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });
                case 'd': // Short date
                    return date.toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: 'numeric',
                        day: 'numeric'
                    });
                case 'D': // Long date
                    return date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                case 't': // Short time
                    return date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });
                case 'T': // Long time
                    return date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    });
                case 'R': // Relative time
                    const now = new Date();
                    const diff = Math.floor((date - now) / 1000);
                    
                    if (Math.abs(diff) < 60) {
                        return diff > 0 ? 'in a few seconds' : 'a few seconds ago';
                    } else if (Math.abs(diff) < 3600) {
                        const minutes = Math.floor(Math.abs(diff) / 60);
                        return diff > 0 ? `in ${minutes} minute${minutes > 1 ? 's' : ''}` : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                    } else if (Math.abs(diff) < 86400) {
                        const hours = Math.floor(Math.abs(diff) / 3600);
                        return diff > 0 ? `in ${hours} hour${hours > 1 ? 's' : ''}` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
                    } else {
                        const days = Math.floor(Math.abs(diff) / 86400);
                        return diff > 0 ? `in ${days} day${days > 1 ? 's' : ''}` : `${days} day${days > 1 ? 's' : ''} ago`;
                    }
                default:
                    return date.toString();
            }
        }

        function updateTimestamps() {
            const dateInput = document.getElementById('dateInput').value;
            const timeInput = document.getElementById('timeInput').value;
            
            if (!dateInput || !timeInput) return;

            // Parse the inputs properly to avoid timezone issues
            const [year, month, day] = dateInput.split('-').map(Number);
            const timeParts = timeInput.split(':').map(Number);
            const hours = timeParts[0] || 0;
            const minutes = timeParts[1] || 0;
            const seconds = timeParts[2] || 0;
            
            // Create date using the Date constructor with individual parameters
            // This ensures we're working in the user's local timezone
            const selectedDate = new Date(year, month - 1, day, hours, minutes, seconds);
            
            // Validate the date
            if (isNaN(selectedDate.getTime())) {
                console.error('Invalid date created');
                return;
            }
            
            const unixTimestamp = Math.floor(selectedDate.getTime() / 1000);
            
            document.getElementById('unixValue').textContent = unixTimestamp;

            const resultsContainer = document.getElementById('timestampResults');
            resultsContainer.innerHTML = '';

            timestampFormats.forEach(format => {
                const timestampCode = `&lt;t:${unixTimestamp}:${format.code}&gt;`;
                const formattedTime = formatTimestamp(selectedDate, format.code);
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'timestamp-item';
                
                itemDiv.innerHTML = `
                    <div class="timestamp-header">
                        <div class="timestamp-type"><strong>${format.name}</strong></div>
                        <button class="copy-btn" onclick="copyToClipboard('<t:${unixTimestamp}:${format.code}>', this)">
                            Copy
                        </button>
                    </div>
                    <div class="timestamp-display">${formattedTime}</div>
                    <div class="timestamp-code">${timestampCode}</div>
                `;
                
                resultsContainer.appendChild(itemDiv);
            });
        }

        async function copyToClipboard(text, button) {
            try {
                await navigator.clipboard.writeText(text);
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                } catch (copyErr) {
                    console.error('Fallback copy failed: ', copyErr);
                    button.textContent = 'Copy Failed';
                }
                
                document.body.removeChild(textArea);
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            }
        }

        // Initialize with current time
        document.addEventListener('DOMContentLoaded', function() {
            displayUserTimezone();
            setNow();
            
            // Update timestamps when date or time input changes
            document.getElementById('dateInput').addEventListener('change', () => {
                stopRealTimeUpdate();
                updateTimestamps();
            });
            document.getElementById('timeInput').addEventListener('input', () => {
                stopRealTimeUpdate();
                updateTimestamps();
            });
        });
