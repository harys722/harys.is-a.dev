const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You are offline - No internet connection</title>
  <link rel="icon" href="images/no-signal.png" type="image/png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      min-height: 100vh;
      overflow-x: hidden;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      font-family: 'Inter', sans-serif;
      color: #e5e7eb;
      display: flex;
      flex-direction: column;
    }

    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes signalPulse {
      0%, 100% { transform: scale(1);   opacity: 1; }
      50%       { transform: scale(1.2); opacity: 0.6; }
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @keyframes toastOut {
      from { opacity: 1; transform: translateX(-50%) translateY(0); }
      to   { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }

    /* ── Toast ── */
    .toast {
      display: none;
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #1a1a1a;
      border: 1px solid #22c55e;
      color: #e5e7eb;
      padding: 12px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(34,197,94,0.25);
      z-index: 9999;
      animation: toastIn 0.4s ease forwards;
    }

    .toast-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #22c55e;
      flex-shrink: 0;
    }

    .toast-btn {
      background: linear-gradient(90deg, #FFD700, #FFA500);
      color: #1a1a1a;
      border: none;
      padding: 5px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      margin-left: 6px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .toast-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 3px 10px rgba(255,215,0,0.4);
    }

    /* ── Layout ── */
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      background: linear-gradient(90deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-weight: 800;
      padding: 20px;
      animation: fadeIn 1s ease-in;
    }

    .header img {
      width: 60px; height: 60px;
      border-radius: 50%;
      border: 2px solid #FFD700;
      object-fit: cover;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .header img:hover {
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(255,215,0,0.5);
    }

    .error-card {
      background-color: #2d2d2d;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #FFD700;
      text-align: center;
      max-width: 600px;
      width: 100%;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s ease-out forwards;
      position: relative;
      overflow: hidden;
      margin-top: 20px;
    }

    .error-card::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent);
      transition: 0.5s;
    }

    .error-card:hover::before { left: 100%; }

    .error-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(255,215,0,0.4);
    }

    .gradient-text {
      background: linear-gradient(90deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* ── Signal SVG icon ── */
    #signal-icon {
      width: 40px; height: 40px;
      margin: 10px auto;
      animation: signalPulse 1.5s ease-in-out infinite;
    }

    /* ── Spacebar prompt ── */
    #startPrompt {
      margin-top: 15px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      font-weight: 600;
    }

    /* ── Buttons ── */
    #buttonContainer {
      margin-top: 10px;
    }

    button {
      background: linear-gradient(90deg, #FFD700, #FFA500);
      color: #1a1a1a;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      margin-top: 20px;
    }

    button:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(255,215,0,0.6);
    }

    /* ── Dino game ── */
    #dino-container {
      margin-top: 30px;
      width: 600px;
      max-width: 100%;
      background-color: #222;
      border-radius: 12px;
      border: 1px solid #000;
      padding: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.7);
      display: none;
      text-align: center;
    }

    #dino-canvas {
      width: 100%;
      height: 150px;
      display: block;
    }

    /* ── Footer ── */
    footer {
      text-align: center;
      padding: 30px;
      color: #B9BBBE;
      border-top: 1px solid #FFD700;
      margin-top: 10px;
      animation: fadeIn 1s ease-in;
    }
  </style>
</head>
<body>

  <!-- Toast: shown only when connection is restored, user clicks Reload themselves -->
  <div class="toast" id="toast">
    <div class="toast-dot"></div>
    <span>Connection restored!</span>
    <button class="toast-btn" onclick="location.reload()">Reload</button>
  </div>

  <div class="container">

    <div class="header">
	<div id="signal-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="40" height="40">
      <line x1="2" y1="2" x2="22" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      <circle cx="12" cy="20" r="1" fill="#FFD700"/>
    </svg>
  </div>
  <span>You are offline!</span>
</div>

    <section class="section">
      <div class="container">

        <div class="error-card" id="errorCard">
          <h1 class="gradient-text" style="font-size:2rem; font-weight:800; margin-bottom:16px;">No Internet Connection?</h1>
          <p style="font-size:1.125rem; margin-bottom:24px;">
            Looks like you've lost your internet connection. The page you're trying to reach isn't available right now.
          </p>

          <!-- No-signal SVG icon with pulse animation -->
          <div id="signal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="40" height="40">
              <line x1="2" y1="2" x2="22" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <path d="M10.71 5.05A16 16 0 0 1 22.56 9" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <circle cx="12" cy="20" r="1" fill="#FFD700"/>
            </svg>
          </div>

          <div id="startPrompt">Press <strong>[spacebar]</strong> for a surprise while you wait! :D</div>
        </div>

        <!-- Reload button — reloads the current page to re-check connection -->
        <div id="buttonContainer">
          <button onclick="location.reload()">Reload the page</button>
        </div>

      </div>
    </section>

    <!-- Dino game — hidden until spacebar is pressed -->
    <div id="dino-container">
      <h1 class="gradient-text" style="font-size:2rem; font-weight:800; margin-bottom:8px;">Feeling bored as well?</h1>
      <p style="color:#9ca3af; margin-bottom:12px;">
        No internet? No problem. Play a game while you wait!
      </p>
      <canvas id="dino-canvas" width="600" height="150"></canvas>
      <hr style="border-color: rgba(255,215,0,0.2); margin: 10px 0;">
      <center>
        <button onclick="location.reload()">Reload the page</button>
      </center>
    </div>

  </div>

  <footer>
    <p>© 2025 harys722. All rights reserved.</p>
  </footer>

  <script>
    /* ── Connection restored toast (no auto-reload, user decides) ── */
    window.addEventListener('online', () => {
      const toast = document.getElementById('toast');
      toast.style.display = 'flex';
    });

    /* ── Dino game ── */
    let ctx, canvas;
    let groundY, dinoX, dinoY, isJumping, jumpVelocity, gravity;
    let obstacles, frameCount, score, highScore;
    let gameOver = false;
    let gameStarted = false;
    let gameLoopId;

    function initGame() {
      canvas       = document.getElementById('dino-canvas');
      ctx          = canvas.getContext('2d');
      groundY      = 120;
      dinoX        = 50;
      dinoY        = groundY;
      isJumping    = false;
      jumpVelocity = 0;
      gravity      = 0.6;
      obstacles    = [];
      frameCount   = 0;
      score        = 0;
      highScore    = localStorage.getItem('dinoHighScore') || 0;
    }

    function startDinoGame() {
      initGame();
      gameOver    = false;
      gameStarted = true;

      // Show game, hide prompt + reload button (same as 404 page)
      document.getElementById('dino-container').style.display = 'block';
      document.getElementById('buttonContainer').style.display = 'none';
      document.getElementById('startPrompt').style.display = 'none';

      // Scroll down so the game is visible
      document.getElementById('dino-container').scrollIntoView({ behavior: 'smooth', block: 'center' });

      gameLoop();
    }

    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!gameStarted) { startDinoGame(); return; }
        if (gameOver)     { startDinoGame(); return; }
        if (!isJumping) {
          isJumping    = true;
          jumpVelocity = -12;
        }
      }
    });

    // Touch support for mobile
    document.addEventListener('touchstart', () => {
      if (!gameStarted) { startDinoGame(); return; }
      if (gameOver)     { startDinoGame(); return; }
      if (!isJumping) {
        isJumping    = true;
        jumpVelocity = -12;
      }
    });

    function spawnObstacle() {
      const height = Math.random() > 0.5 ? 30 : 50;
      obstacles.push({ x: 600, y: groundY + 40 - height, width: 20, height });
    }

    function updateScore() {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('dinoHighScore', highScore);
      }
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#555';
      ctx.fillRect(0, groundY + 40 - 10, canvas.width, 10);

      // Dino
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(dinoX, dinoY - 40, 40, 40);
      ctx.fillStyle = '#fff';
      ctx.fillRect(dinoX + 10, dinoY - 40 + 10, 5, 5);
      ctx.fillRect(dinoX + 25, dinoY - 40 + 10, 5, 5);

      // Jump physics
      if (isJumping) {
        jumpVelocity += gravity;
        dinoY += jumpVelocity;
        if (dinoY >= groundY) {
          dinoY     = groundY;
          isJumping = false;
        }
      }

      // Spawn obstacles
      if (frameCount % 90 === 0) spawnObstacle();

      // Draw & update obstacles
      obstacles.forEach((ob, index) => {
        ob.x -= 6;
        ctx.fillStyle = '#F44336';
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);

        // Collision
        if (
          dinoX < ob.x + ob.width &&
          dinoX + 40 > ob.x &&
          dinoY - 40 < ob.y + ob.height &&
          dinoY > ob.y
        ) { gameOver = true; }

        // Off screen
        if (ob.x + ob.width < 0) {
          obstacles.splice(index, 1);
          if (!gameOver) { score++; updateScore(); }
        }
      });

      // Score
      ctx.fillStyle = '#ffff00';
      ctx.font = '14px Arial';
      ctx.fillText('Score: ' + score + ' | Highest: ' + highScore, 10, 20);

      if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '20px Arial';
        ctx.fillText('Game Over! Press [spacebar] to restart.', 150, 75);
        cancelAnimationFrame(gameLoopId);
        gameStarted = false;
      } else {
        frameCount++;
        gameLoopId = requestAnimationFrame(gameLoop);
      }
    }
  </script>

</body>
</html>`;

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	if (event.request.mode !== 'navigate') return;
	if (!event.request.url.startsWith('http')) return;

	event.respondWith(
		fetch(event.request).catch(() => {
			return new Response(OFFLINE_HTML, {
				headers: {
					'Content-Type': 'text/html'
				}
			});
		})
	);
});
