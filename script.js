        // Snowfall effect
        const canvas = document.getElementById('snowfall');
        const ctx = canvas.getContext('2d');
        let snowflakes = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function createSnowflake() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 4 + 1;
            snowflakes.push({ x, y, radius });
        }

        function updateSnowflakes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 204, 0, 0.8)';
            ctx.beginPath();
            for (let flake of snowflakes) {
                ctx.moveTo(flake.x, flake.y);
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            }
            ctx.fill();
            for (let flake of snowflakes) {
                flake.y += flake.radius / 2; // Fall speed
                if (flake.y > canvas.height) {
                    flake.y = -flake.radius;
                    flake.x = Math.random() * canvas.width; // Random x position
                }
            }
        }

        function animate() {
            updateSnowflakes();
            requestAnimationFrame(animate);
        }

        for (let i = 0; i < 100; i++) {
            createSnowflake();
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Dark/light mode toggle
        const toggleButton = document.getElementById('toggle-mode');
        toggleButton.addEventListener('click', () => {
            const body = document.body;
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');

            // Change the icon based on the current mode
            toggleButton.innerHTML = body.classList.contains('dark-mode') ? '🌖' : '🌘';

            // Update content colors based on the mode
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                if (body.classList.contains('dark-mode')) {
                    content.classList.add('dark-mode');
                    content.style.backgroundColor = '#262626'; // Dark background
                    content.style.color = '#f5f5f5'; // Light text
                } else {
                    content.classList.remove('dark-mode');
                    content.style.backgroundColor = '#fff8e1'; // Light background
                    content.style.color = '#333333'; // Dark text
                }
            });

            // Update project class for dark mode
            const projects = document.querySelectorAll('.project');
            projects.forEach(project => {
                if (body.classList.contains('dark-mode')) {
                    project.classList.add('dark-mode');
                } else {
                    project.classList.remove('dark-mode');
                }
            });

            // Update contact card class for dark mode
            const contactCards = document.querySelectorAll('.contact-card div');
            contactCards.forEach(card => {
                if (body.classList.contains('dark-mode')) {
                    card.style.backgroundColor = '#333333'; // Dark contact card
                    card.style.color = '#f5f5f5'; // Light text on cards
                } else {
                    card.style.backgroundColor = '#f7f7f7'; // Light contact card
                    card.style.color = '#333333'; // Dark text on cards
                }
            });
        });
