        let currentColor = { h: 43, s: 95, l: 50, a: 1 };

        const colorPresets = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
            '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#2C3E50'
        ];

        function initializeColorPicker() {
            setupEventListeners();
            createPresets();
            updateAllFormats();
            generateHarmony();
            updateGradient();
        }

        function setupEventListeners() {
            // Create a hidden color input for the color display click
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.style.position = 'absolute';
            colorInput.style.opacity = '0';
            colorInput.style.width = '0';
            colorInput.style.height = '0';
            document.body.appendChild(colorInput);

            const colorDisplay = document.getElementById('colorDisplay');
            colorDisplay.addEventListener('click', (e) => {
                // Position the color input near the click location
                const rect = colorDisplay.getBoundingClientRect();
                colorInput.style.left = `${rect.left + window.scrollX}px`;
                colorInput.style.top = `${rect.bottom + window.scrollY}px`;
                colorInput.click();
            });

            colorInput.addEventListener('input', handleColorInput);

            document.getElementById('hueSlider').addEventListener('input', handleHueChange);
            document.getElementById('satSlider').addEventListener('input', handleSatChange);
            document.getElementById('lightSlider').addEventListener('input', handleLightChange);
            document.getElementById('alphaSlider').addEventListener('input', handleAlphaChange);

            // Add click-to-copy for format values
            document.querySelectorAll('.format-value').forEach(element => {
                element.addEventListener('click', () => copyToClipboard(element.id));
            });

            // Tooltip handling for sliders
            const sliders = document.querySelectorAll('.slider');
            sliders.forEach(slider => {
                slider.addEventListener('mousemove', showTooltip);
                slider.addEventListener('mouseleave', hideTooltip);
            });
        }

        function showTooltip(e) {
            const tooltip = document.getElementById('tooltip');
            const value = e.target.value;
            let label = '';
            if (e.target.id === 'hueSlider') label = `Hue: ${value}`;
            else if (e.target.id === 'satSlider') label = `Saturation: ${value}%`;
            else if (e.target.id === 'lightSlider') label = `Lightness: ${value}%`;
            else if (e.target.id === 'alphaSlider') label = `Alpha: ${value}%`;

            tooltip.textContent = label;
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY - 30}px`;
            tooltip.classList.add('show');
        }

        function hideTooltip() {
            document.getElementById('tooltip').classList.remove('show');
        }

        function handleColorInput(e) {
            const hex = e.target.value;
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            currentColor = { h: Math.round(hsl.h), s: Math.round(hsl.s * 100), l: Math.round(hsl.l * 100), a: currentColor.a };
            updateSliders();
            updateAllFormats();
            generateHarmony();
            updateGradient();
        }

        function handleHueChange(e) {
            currentColor.h = parseInt(e.target.value);
            document.getElementById('hueValue').textContent = currentColor.h;
            updateAllFormats();
            generateHarmony();
            updateGradient();
        }

        function handleSatChange(e) {
            currentColor.s = parseInt(e.target.value);
            document.getElementById('satValue').textContent = currentColor.s + '%';
            updateAllFormats();
            generateHarmony();
            updateGradient();
        }

        function handleLightChange(e) {
            currentColor.l = parseInt(e.target.value);
            document.getElementById('lightValue').textContent = currentColor.l + '%';
            updateAllFormats();
            generateHarmony();
            updateGradient();
        }

        function handleAlphaChange(e) {
            currentColor.a = parseInt(e.target.value) / 100;
            document.getElementById('alphaValue').textContent = e.target.value + '%';
            updateAllFormats();
            updateGradient();
        }

        function updateSliders() {
            document.getElementById('hueSlider').value = currentColor.h;
            document.getElementById('satSlider').value = currentColor.s;
            document.getElementById('lightSlider').value = currentColor.l;
            document.getElementById('alphaSlider').value = currentColor.a * 100;
            
            document.getElementById('hueValue').textContent = currentColor.h;
            document.getElementById('satValue').textContent = currentColor.s + '%';
            document.getElementById('lightValue').textContent = currentColor.l + '%';
            document.getElementById('alphaValue').textContent = Math.round(currentColor.a * 100) + '%';
        }

        function updateAllFormats() {
            const rgb = hslToRgb(currentColor.h, currentColor.s / 100, currentColor.l / 100);
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            
            // Update color display
            document.getElementById('colorDisplay').style.background = 
                `hsla(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%, ${currentColor.a})`;
            
            // Update format displays
            document.getElementById('hexValue').textContent = hex;
            document.getElementById('rgbValue').textContent = `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
            document.getElementById('rgbaValue').textContent = `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${currentColor.a.toFixed(2)})`;
            document.getElementById('hslValue').textContent = `hsl(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%)`;
            document.getElementById('hslaValue').textContent = `hsla(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%, ${currentColor.a.toFixed(2)})`;
            
            // Integer value
            const intValue = (Math.round(rgb.r) << 16) | (Math.round(rgb.g) << 8) | Math.round(rgb.b);
            document.getElementById('intValue').textContent = intValue;
        }

        function createPresets() {
            const presetsGrid = document.getElementById('presetsGrid');
            presetsGrid.innerHTML = '';
            colorPresets.forEach(color => {
                const preset = document.createElement('div');
                preset.className = 'preset-color';
                preset.style.backgroundColor = color;
                preset.setAttribute('role', 'button');
                preset.setAttribute('tabindex', '0');
                preset.addEventListener('click', () => selectPreset(color, preset));
                preset.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        selectPreset(color, preset);
                    }
                });
                presetsGrid.appendChild(preset);
            });
        }

        function selectPreset(color, preset) {
            const rgb = hexToRgb(color);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            currentColor = { h: Math.round(hsl.h), s: Math.round(hsl.s * 100), l: Math.round(hsl.l * 100), a: currentColor.a };
            updateSliders();
            updateAllFormats();
            generateHarmony();
            updateGradient();
            document.querySelectorAll('.preset-color').forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
        }

        function generateHarmony() {
            const harmonyType = document.getElementById('harmonyType').value;
            const harmonyColors = document.getElementById('harmonyColors');
            harmonyColors.innerHTML = ''; // Clear previous harmony colors

            let colors = [];
            switch (harmonyType) {
                case 'complementary':
                    colors = [
                        { h: currentColor.h, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 180) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a }
                    ];
                    break;
                case 'triadic':
                    colors = [
                        { h: currentColor.h, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 120) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 240) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a }
                    ];
                    break;
                case 'analogous':
                    colors = [
                        { h: (currentColor.h + 330) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: currentColor.h, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 30) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a }
                    ];
                    break;
                case 'tetradic':
                    colors = [
                        { h: currentColor.h, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 90) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 180) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: (currentColor.h + 270) % 360, s: currentColor.s, l: currentColor.l, a: currentColor.a }
                    ];
                    break;
                case 'monochromatic':
                    colors = [
                        { h: currentColor.h, s: currentColor.s, l: Math.max(10, currentColor.l - 20), a: currentColor.a },
                        { h: currentColor.h, s: currentColor.s, l: currentColor.l, a: currentColor.a },
                        { h: currentColor.h, s: currentColor.s, l: Math.min(90, currentColor.l + 20), a: currentColor.a }
                    ];
                    break;
            }

            colors.forEach((color, index) => {
                const div = document.createElement('div');
                div.className = 'harmony-color';
                div.style.backgroundColor = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;
                // Mark the current color visually
                if (color.h === currentColor.h && color.s === currentColor.s && color.l === currentColor.l && color.a === currentColor.a) {
                    div.classList.add('current');
                }
                div.setAttribute('role', 'button');
                div.setAttribute('tabindex', '0');
                div.addEventListener('click', () => {
                    currentColor = { h: color.h, s: color.s, l: color.l, a: color.a };
                    updateSliders();
                    updateAllFormats();
                    generateHarmony();
                    updateGradient();
                    document.querySelectorAll('.preset-color').forEach(p => p.classList.remove('active'));
                });
                div.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        currentColor = { h: color.h, s: color.s, l: color.l, a: color.a };
                        updateSliders();
                        updateAllFormats();
                        generateHarmony();
                        updateGradient();
                        document.querySelectorAll('.preset-color').forEach(p => p.classList.remove('active'));
                    }
                });
                harmonyColors.appendChild(div);
            });
        }

        function updateGradient() {
            const gradientType = document.getElementById('gradientType').value;
            const angle = document.getElementById('gradientAngle').value;
            document.getElementById('angleValue').textContent = `${angle}°`;

            const rgb = hslToRgb(currentColor.h, currentColor.s / 100, currentColor.l / 100);
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            let gradientStyle = '';

            const complementaryColor = { h: (currentColor.h + 180) % 360, s: currentColor.s, l: currentColor.l };
            const compRgb = hslToRgb(complementaryColor.h, complementaryColor.s / 100, complementaryColor.l / 100);
            const compHex = rgbToHex(compRgb.r, compRgb.g, compRgb.b);

            switch (gradientType) {
                case 'linear':
                    gradientStyle = `linear-gradient(${angle}deg, ${hex}, ${compHex})`;
                    break;
                case 'radial':
                    gradientStyle = `radial-gradient(circle, ${hex}, ${compHex})`;
                    break;
                case 'conic':
                    gradientStyle = `conic-gradient(from ${angle}deg, ${hex}, ${compHex})`;
                    break;
            }

            const gradientDisplay = document.getElementById('gradientDisplay');
            gradientDisplay.style.background = gradientStyle;
            document.getElementById('gradientValue').textContent = gradientStyle;
        }

        function generateRandomColor() {
            currentColor = {
                h: Math.floor(Math.random() * 360),
                s: Math.floor(Math.random() * 100),
                l: Math.floor(Math.random() * 80) + 20,
                a: 1
            };
            updateSliders();
            updateAllFormats();
            generateHarmony();
            updateGradient();
            document.querySelectorAll('.preset-color').forEach(p => p.classList.remove('active'));
        }

        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const btn = element.parentElement.querySelector('.copy-btn') || document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
                if (btn) {
                    btn.classList.add('copied');
                    btn.textContent = 'Copied!';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.textContent = 'Copy';
                    }, 2000);
                }
            }).catch(err => console.error('Failed to copy:', err));
        }

        // Color conversion helper functions
        function hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return { r, g, b };
        }

        function rgbToHex(r, g, b) {
            return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1).toUpperCase()}`;
        }

        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return { h: h * 360, s: s, l: l };
        }

        function hslToRgb(h, s, l) {
            h /= 360;
            let r, g, b;

            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // Initialize the color picker
        initializeColorPicker();
