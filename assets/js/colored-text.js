        // DOM elements
        const textarea = document.querySelector("#textarea");
        const copyBtn = document.querySelector(".copy-btn");
        const clearBtn = document.querySelector(".clear-btn");
        const errorMessage = document.querySelector("#error-message");
        const tooltip = document.querySelector(".tooltip");

        const tooltipTexts = {
            "0": "Reset All Formatting",
            "1": "Bold Text",
            "4": "Underline Text",
            "30": "Dark Gray (33%)",
            "31": "Red",
            "32": "Yellowish Green",
            "33": "Gold",
            "34": "Light Blue",
            "35": "Pink",
            "36": "Teal",
            "37": "White",
            "40": "Blueish Black",
            "41": "Rust Brown",
            "42": "Gray (40%)",
            "43": "Gray (45%)",
            "44": "Light Gray (55%)",
            "45": "Blurple",
            "46": "Light Gray (60%)",
            "47": "Cream White"
        };

        // Utility function to show error or success messages
        function showMessage(message, isSuccess = false) {
            errorMessage.textContent = message;
            errorMessage.classList.toggle('success', isSuccess);
            errorMessage.classList.add('show');
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.classList.remove('show', 'success');
                errorMessage.style.display = 'none';
            }, 3000);
        }

        // Sanitize HTML to allow only <span> with ansi-* classes
        function sanitizeHTML(html) {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const allElements = temp.querySelectorAll('*');
            allElements.forEach(el => {
                if (el.tagName.toLowerCase() !== 'span' || !el.className.includes('ansi-')) {
                    el.replaceWith(...el.childNodes);
                } else {
                    const classes = Array.from(el.classList).filter(cls => cls.startsWith('ansi-'));
                    el.className = classes.join(' ');
                }
            });
            return temp.innerHTML;
        }

        // Update active state of style buttons
        function updateButtonStates() {
            document.querySelectorAll('.style-button').forEach(btn => btn.classList.remove('active'));
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            let parent = range.commonAncestorContainer;
            if (parent.nodeType === Node.TEXT_NODE) parent = parent.parentElement;

            while (parent && parent !== textarea) {
                if (parent.tagName === 'SPAN') {
                    parent.classList.forEach(cls => {
                        if (cls.startsWith('ansi-')) {
                            const ansiCode = cls.replace('ansi-', '');
                            const button = document.querySelector(`.style-button[data-ansi="${ansiCode}"]`);
                            if (button) button.classList.add('active');
                        }
                    });
                }
                parent = parent.parentElement;
            }
        }

        // Handle input to sanitize content
        textarea.addEventListener('input', () => {
            const selection = window.getSelection();
            let range, offset;
            if (selection.rangeCount) {
                range = selection.getRangeAt(0);
                offset = range.startOffset;
            }
            textarea.innerHTML = sanitizeHTML(textarea.innerHTML);
            if (range && textarea.firstChild) {
                const newRange = document.createRange();
                const node = textarea.firstChild.nodeType === Node.TEXT_NODE ? textarea.firstChild : textarea;
                newRange.setStart(node, Math.min(offset, node.textContent.length));
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
            updateButtonStates();
        });

        // Handle selection and click to update button states
        textarea.addEventListener('selectstart', () => setTimeout(updateButtonStates, 0));
        textarea.addEventListener('click', updateButtonStates);
        textarea.addEventListener('keyup', updateButtonStates);

        // Handle Enter key for newlines
        textarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode('\n'));
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                updateButtonStates();
            }
        });

        // Style button handling
        document.querySelectorAll(".style-button").forEach((btn) => {
            btn.addEventListener('click', () => {
                const ansiCode = btn.dataset.ansi;
                const selection = window.getSelection();

                if (ansiCode === "0") {
                    textarea.innerHTML = textarea.textContent;
                    const range = document.createRange();
                    range.selectNodeContents(textarea);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    updateButtonStates();
                    textarea.focus();
                    return;
                }

                if (!selection.rangeCount || !selection.toString()) {
                    showMessage('Please select some text before doing an action!');
                    return;
                }

                const range = selection.getRangeAt(0);
                const selectedText = selection.toString();
                let parent = range.commonAncestorContainer;
                if (parent.nodeType === Node.TEXT_NODE) parent = parent.parentElement;

                const isAlreadyStyled = parent.tagName === 'SPAN' && parent.classList.contains(`ansi-${ansiCode}`);
                if (isAlreadyStyled && (ansiCode === "1" || ansiCode === "4")) {
                    const otherClasses = Array.from(parent.classList).filter(cls => cls !== `ansi-${ansiCode}`);
                    if (otherClasses.length) {
                        parent.className = otherClasses.join(' ');
                    } else {
                        parent.replaceWith(...parent.childNodes);
                    }
                } else {
                    const span = document.createElement('span');
                    span.classList.add(`ansi-${ansiCode}`);
                    span.textContent = selectedText;
                    if (parent.tagName === 'SPAN') {
                        const existingClasses = Array.from(parent.classList).filter(cls => {
                            if (ansiCode === "1" && cls === "ansi-1") return false;
                            if (ansiCode === "4" && cls === "ansi-4") return false;
                            if ((ansiCode >= "30" && ansiCode <= "37") && cls.startsWith('ansi-3')) return false;
                            if ((ansiCode >= "40" && ansiCode <= "47") && cls.startsWith('ansi-4')) return false;
                            return true;
                        });
                        span.classList.add(...existingClasses);
                    }
                    range.deleteContents();
                    range.insertNode(span);
                    range.selectNodeContents(span);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }

                updateButtonStates();
                textarea.focus();
            });

            // Tooltip hover handlers
            btn.addEventListener('mouseover', (e) => {
                const ansiCode = btn.dataset.ansi;
                tooltip.textContent = tooltipTexts[ansiCode] || 'Unknown';
                tooltip.style.display = 'block';
                const rect = btn.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top + window.scrollY - 32}px`;
            });

            btn.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
            });
        });

        // Convert DOM nodes to ANSI codes
        function nodesToANSI(nodes, states = [{ fg: null, bg: null, st: null }]) {
            let text = '';
            const currentState = states[states.length - 1];

            for (const node of nodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    text += node.textContent.replace(/\n/g, '\n');
                    continue;
                }

                if (node.nodeName === 'SPAN' && node.className) {
                    const ansiMatch = node.className.match(/ansi-(\d+)/);
                    if (ansiMatch) {
                        const ansiCode = parseInt(ansiMatch[1]);
                        const newState = { ...currentState };

                        if (ansiCode === 0) {
                            newState.st = null;
                            newState.fg = null;
                            newState.bg = null;
                        } else if (ansiCode === 1 || ansiCode === 4) {
                            newState.st = ansiCode;
                        } else if (ansiCode >= 30 && ansiCode <= 37) {
                            newState.fg = ansiCode;
                        } else if (ansiCode >= 40 && ansiCode <= 47) {
                            newState.bg = ansiCode;
                        }

                        states.push(newState);
                        const codes = [];
                        if (newState.st) codes.push(newState.st);
                        if (newState.fg) codes.push(newState.fg);
                        if (newState.bg) codes.push(newState.bg);

                        if (codes.length) {
                            text += `\x1b[${codes.join(';')}m`;
                        } else if (states.length > 1) {
                            text += '\x1b[0m';
                        }

                        text += nodesToANSI(node.childNodes, states);

                        states.pop();
                        const prevState = states[states.length - 1];
                        const prevCodes = [];
                        if (prevState.st) prevCodes.push(prevState.st);
                        if (prevState.fg) prevCodes.push(prevState.fg);
                        if (prevState.bg) prevCodes.push(prevState.bg);
                        text += prevCodes.length ? `\x1b[${prevCodes.join(';')}m` : '\x1b[0m';
                    }
                }
            }

            return text;
        }

        // Copy button
        copyBtn.addEventListener('click', async () => {
            try {
                const toCopy = "```ansi\n" + nodesToANSI(textarea.childNodes) + "\n```";
                copyBtn.disabled = true;
                copyBtn.textContent = 'Copying...';
                await navigator.clipboard.writeText(toCopy);
                copyBtn.classList.add('copied');
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.textContent = 'Copy Text';
                    copyBtn.disabled = false;
                }, 2000);
                showMessage('Text copied successfully!', true);
            } catch (error) {
                console.error('Copy failed:', error);
                showMessage('Failed to copy text. Please copy manually.');
                copyBtn.textContent = 'Copy Text';
                copyBtn.disabled = false;
            }
        });

        // Clear button
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all text?')) {
                textarea.innerHTML = '';
                textarea.focus();
                updateButtonStates();
            }
        });

        // Initialize
        textarea.focus();
        updateButtonStates();
