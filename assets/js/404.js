    // Show the error message with fade-in
    document.getElementById('errorCard').style.opacity = 1;

    // Elements
    const dinoContainer = document.getElementById('dino-container');
    const buttonContainer = document.getElementById('buttonContainer');
    const startPrompt = document.getElementById('startPrompt');

    let gameLoopId;
    let gameOver = false; // Track game over state
    let gameStarted = false; // Track if game is active

    // Initialize game variables
    let ctx, canvas, groundY, dinoX, dinoY, isJumping, jumpVelocity, obstacles, frameCount, score, highScore, gravity;

    function initGame() {
        canvas = document.getElementById('dino-canvas');
        ctx = canvas.getContext('2d');
        groundY = 120;
        dinoX = 50;
        dinoY = groundY;
        isJumping = false;
        jumpVelocity = 0;
        gravity = 0.6;
        obstacles = [];
        frameCount = 0;
        score = 0;
        highScore = localStorage.getItem('dinoHighScore') || 0;
    }

    function startDinoGame() {
        // Reset all game state
        initGame();
        gameOver = false;
        gameStarted = true;
        // Show game container
        dinoContainer.style.display = 'block';
        // Hide button container and prompt
        buttonContainer.style.display = 'none';
        startPrompt.style.display = 'none';
        // Start the game loop
        gameLoop();
    }

    // Handle key events
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === ' ') {
            if (!gameStarted) {
                startDinoGame();
            } else {
                if (gameOver) {
                    startDinoGame(); // Restart game on space if game over
                } else {
                    // During game, jump if not already jumping
                    if (!isJumping) {
                        isJumping = true;
                        jumpVelocity = -12;
                    }
                }
            }
        }
    });

    function spawnObstacle() {
        const height = Math.random() > 0.5 ? 30 : 50;
        obstacles.push({ x: 600, y: groundY + 40 - height, width: 20, height: height });
    }

    function updateScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('dinoHighScore', highScore);
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#222'; // background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw ground
        ctx.fillStyle = '#555';
        ctx.fillRect(0, groundY + 40 - 10, canvas.width, 10);
        // Draw Dino
        ctx.fillStyle = '#4CAF50'; // green
        ctx.fillRect(dinoX, dinoY - 40, 40, 40);
        ctx.fillStyle = '#fff';
        ctx.fillRect(dinoX + 10, dinoY - 40 + 10, 5, 5);
        ctx.fillRect(dinoX + 25, dinoY - 40 + 10, 5, 5);
        // Jump physics
        if (isJumping) {
            jumpVelocity += gravity;
            dinoY += jumpVelocity;
            if (dinoY >= groundY) {
                dinoY = groundY;
                isJumping = false;
            }
        }
        // Spawn obstacles
        if (frameCount % 90 === 0) {
            spawnObstacle();
        }
        // Draw obstacles
        obstacles.forEach((ob, index) => {
            ob.x -= 6;
            ctx.fillStyle = '#F44336';
            ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
            // Collision detection
            if (
                dinoX < ob.x + ob.width &&
                dinoX + 40 > ob.x &&
                dinoY - 40 < ob.y + ob.height &&
                dinoY > ob.y
            ) {
                gameOver = true;
            }
            // Remove off-screen obstacles
            if (ob.x + ob.width < 0) {
                obstacles.splice(index, 1);
                if (!gameOver) {
                    score++;
                    updateScore();
                }
            }
        });
        // Show score
        ctx.fillStyle = '#ffff00';
        ctx.font = '14px Arial';
        ctx.fillText(`Score: ${score} | Highest: ${highScore}`, 10, 20);
        // Check game over
        if (gameOver) {
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText('Game Over! Press [spacebar] to restart.', 150, 75);
            cancelAnimationFrame(gameLoopId);
            gameStarted = false; // stop active game
        } else {
            frameCount++;
            gameLoopId = requestAnimationFrame(gameLoop);
        }
    }
