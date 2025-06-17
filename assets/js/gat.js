        let apiKey = '';
        let chatHistory = [];
        
        async function testApiKey() {
            const keyInput = document.getElementById('apiKey');
            const testBtn = document.getElementById('testBtn');
            const btnText = document.getElementById('btnText');
            const status = document.getElementById('status');
            
            apiKey = keyInput.value.trim();
            
            if (!apiKey) {
                showStatus('Please enter your API key', 'error');
                return;
            }
            
            // Show loading state
            testBtn.disabled = true;
            btnText.innerHTML = '<span class="loading"></span> Testing...';
            status.style.display = 'none';
            
            try {
                // Test the API key with a simple request
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: "Hello, this is a test message. Please respond with 'API test successful!'"
                            }]
                        }]
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0]) {
                        showStatus('✅ API Key is valid! Redirecting to chat...', 'success');
                        setTimeout(() => {
                            showChatInterface();
                        }, 1500);
                    } else {
                        showStatus('❌ Invalid response from API. Please check your key.', 'error');
                    }
                } else {
                    const errorData = await response.json();
                    let errorMessage = '❌ Invalid API key or request failed.';
                    
                    if (errorData.error && errorData.error.message) {
                        errorMessage += ` ${errorData.error.message}`;
                    }
                    
                    showStatus(errorMessage, 'error');
                }
            } catch (error) {
                showStatus('❌ Network error or invalid API key. Please try again.', 'error');
                console.error('API test error:', error);
            }
            
            // Reset button state
            testBtn.disabled = false;
            btnText.textContent = 'Start Testing';
        }
        
        function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = `status ${type}`;
            status.style.display = 'block';
        }
        
        function showChatInterface() {
            document.getElementById('setupContainer').style.display = 'none';
            document.getElementById('chatContainer').style.display = 'flex';
            document.getElementById('chatInput').focus();
        }

        function goBack() {
            document.getElementById('setupContainer').style.display = 'block';
            document.getElementById('chatContainer').style.display = 'none';
            chatHistory = [];
            document.getElementById('chatMessages').innerHTML = `
                <div class="message ai">
                    <strong>Gemini:</strong> Hello! I'm Gemini AI. How can I help you today?
                </div>
            `;
        }
        
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        
        async function sendMessage() {
            const chatInput = document.getElementById('chatInput');
            const message = chatInput.value.trim();
            
            if (!message) return;
            
            // Add user message to chat
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Show loading indicator
            const sendBtn = document.querySelector('.send-btn');
            const sendIcon = document.getElementById('sendIcon');
            sendBtn.disabled = true;
            sendIcon.innerHTML = '<span class="loading"></span>';
            
            try {
                // Build conversation history
                chatHistory.push({
                    role: 'user',
                    parts: [{ text: message }]
                });
                
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: chatHistory
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                        const aiResponse = data.candidates[0].content.parts[0].text;
                        addMessage(aiResponse, 'ai');
                        
                        // Add AI response to history
                        chatHistory.push({
                            role: 'model',
                            parts: [{ text: aiResponse }]
                        });
                    } else {
                        addMessage('Sorry, I couldn\'t generate a response. Please try again.', 'ai');
                    }
                } else {
                    addMessage('Error: Failed to get response from Gemini API.', 'ai');
                }
            } catch (error) {
                addMessage('Error: Network issue or API problem. Please try again.', 'ai');
                console.error('Chat error:', error);
            }
            
            // Reset send button
            sendBtn.disabled = false;
            sendIcon.textContent = '→';
        }
        
        function addMessage(text, sender) {
            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            if (sender === 'user') {
                messageDiv.innerHTML = `<strong>You:</strong> ${text}`;
            } else {
                messageDiv.innerHTML = `<strong>Gemini:</strong> ${text}`;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
