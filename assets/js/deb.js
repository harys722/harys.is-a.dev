        let embeds = [];
        let messageContent = '';

        function addEmbed() {
            if (embeds.length >= 10) {
                alert('Maximum 10 embeds allowed.');
                return;
            }
            embeds.push({ fields: [], color: '#5865F2' });
            updateEmbedTabs();
            updateEmbedForms();
            switchEmbed(embeds.length);
            updatePreview();
            updateCode();
        }

        function removeEmbed() {
            if (embeds.length === 0) return;
            embeds.pop();
            updateEmbedTabs();
            updateEmbedForms();
            if (embeds.length > 0) switchEmbed(embeds.length);
            updatePreview();
            updateCode();
        }

        function clearEmbed(embedIndex) {
            embeds[embedIndex - 1] = { fields: [], color: '#5865F2' };
            updateEmbedForms();
            updatePreview();
            updateCode();
        }

        function clearAllEmbeds() {
            embeds = [];
            updateEmbedTabs();
            updateEmbedForms();
            updatePreview();
            updateCode();
        }

        function updateEmbedTabs() {
            console.log('Updating embed tabs, embeds:', embeds.length);
            const tabs = document.getElementById('embed-tabs');
            const removeEmbedBtn = document.getElementById('remove-embed');
            const clearAllEmbedsBtn = document.getElementById('clear-all-embeds');
            tabs.innerHTML = '';
            if (embeds.length === 0) {
                removeEmbedBtn.style.display = 'none';
                clearAllEmbedsBtn.style.display = 'none';
            } else {
                removeEmbedBtn.style.display = 'inline-block';
                clearAllEmbedsBtn.style.display = 'inline-block';
                embeds.forEach((_, i) => {
                    const tab = document.createElement('div');
                    tab.className = `tab ${i === embeds.length - 1 ? 'active' : ''}`;
                    tab.dataset.embed = i + 1;
                    tab.textContent = `Embed ${i + 1}`;
                    tab.addEventListener('click', () => switchEmbed(i + 1));
                    tabs.appendChild(tab);
                });
            }
            updatePreview();
        }

        function updateEmbedForms() {
            console.log('Updating embed forms, embeds:', embeds);
            const forms = document.getElementById('embed-forms');
            const existingContent = document.getElementById('message-content')?.value || messageContent;
            forms.innerHTML = `
                <label>Message Content (shared across all embeds, max 2000 chars)</label>
                <textarea id="message-content" placeholder="Message content to send with embeds" maxlength="2000" rows="3">${existingContent}</textarea>
                <span class="counter" id="counter-message-content">${existingContent.length}/2000</span>
            `;
            // Bind Message Content listener
            const messageContentInput = document.getElementById('message-content');
            messageContentInput.addEventListener('input', updateMessageContent);

            if (embeds.length === 0) {
                const noEmbeds = document.createElement('p');
                noEmbeds.className = 'no-embeds';
                noEmbeds.textContent = 'Click "Add Embed" to start creating an embed.';
                forms.appendChild(noEmbeds);
                updatePreview();
                return;
            }
            embeds.forEach((embed, i) => {
                const form = document.createElement('div');
                form.className = 'embed-form';
                form.dataset.embed = i + 1;
                form.style.display = i + 1 === embeds.length ? 'block' : 'none';
                form.innerHTML = `
                    <label>Title</label>
                    <input type="text" id="title-${i + 1}" placeholder="Title (max 256 chars)" maxlength="256" value="${embed.title || ''}">
                    <span class="counter" id="counter-title-${i + 1}">${embed.title?.length || 0}/256</span>
                    <p class="error" id="title-error-${i + 1}">Title is required if URL is provided.</p>
                    <label>URL</label>
                    <input type="text" id="url-${i + 1}" placeholder="URL" value="${embed.url || ''}">
                    <label>Description</label>
                    <textarea id="description-${i + 1}" placeholder="Description (max 4096 chars)" maxlength="4096" rows="4">${embed.description || ''}</textarea>
                    <span class="counter" id="counter-description-${i + 1}">${embed.description?.length || 0}/4096</span>
                    <label>Color</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="color" id="color-picker-${i + 1}" value="${embed.color || '#5865F2'}">
                        <input type="text" id="color-hex-${i + 1}" placeholder="HEX (e.g., #5865F2)" maxlength="7" value="${embed.color || '#5865F2'}">
                    </div>
                    <label>Author Name</label>
                    <input type="text" id="author-name-${i + 1}" placeholder="Author Name (max 256 chars)" maxlength="256" value="${embed.author?.name || ''}">
                    <span class="counter" id="counter-author-name-${i + 1}">${embed.author?.name?.length || 0}/256</span>
                    <p class="error" id="author-error-${i + 1}">Author name is required if both URL and icon URL are provided.</p>
                    <label>Author URL</label>
                    <input type="text" id="author-url-${i + 1}" placeholder="Author URL" value="${embed.author?.url || ''}">
                    <label>Author Icon URL</label>
                    <input type="text" id="author-icon-url-${i + 1}" placeholder="Author Icon URL" value="${embed.author?.icon_url || ''}">
                    <label>Thumbnail URL</label>
                    <input type="text" id="thumbnail-url-${i + 1}" placeholder="Thumbnail URL" value="${embed.thumbnail?.url || ''}">
                    <label>Image URL</label>
                    <input type="text" id="image-url-${i + 1}" placeholder="Image URL" value="${embed.image?.url || ''}">
                    <label>Footer Text</label>
                    <input type="text" id="footer-text-${i + 1}" placeholder="Footer Text (max 2048 chars)" maxlength="2048" value="${embed.footer?.text || ''}">
                    <span class="counter" id="counter-footer-text-${i + 1}">${embed.footer?.text?.length || 0}/2048</span>
                    <p class="error" id="footer-error-${i + 1}">Footer text is required if icon URL is provided.</p>
                    <label>Footer Icon URL</label>
                    <input type="text" id="footer-icon-url-${i + 1}" placeholder="Footer Icon URL" value="${embed.footer?.icon_url || ''}">
                    <label>Timestamp</label>
                    <select id="timestamp-select-${i + 1}">
                        <option value="none" ${!embed.timestamp ? 'selected' : ''}>None</option>
                        <option value="current" ${embed.timestamp === 'current' ? 'selected' : ''}>Current Time</option>
                        <option value="custom" ${embed.timestamp && embed.timestamp !== 'current' ? 'selected' : ''}>Custom Time</option>
                    </select>
                    <div id="timestamp-input-${i + 1}" style="display: ${embed.timestamp && embed.timestamp !== 'current' ? 'block' : 'none'};">
                        <input type="datetime-local" id="timestamp-picker-${i + 1}" placeholder="Select date and time" value="${embed.timestamp && embed.timestamp !== 'current' ? embed.timestamp.slice(0, 16) : ''}">
                        <input type="text" class="timestamp-manual" id="timestamp-manual-${i + 1}" placeholder="Or enter ISO 8601 (e.g., 2025-01-01T12:00:00Z)" value="${embed.timestamp && embed.timestamp !== 'current' ? embed.timestamp : ''}">
                        <div class="timestamp-display" id="timestamp-display-${i + 1}">Selected: ${embed.timestamp && embed.timestamp !== 'current' ? new Date(embed.timestamp).toLocaleString() : 'None'}</div>
                    </div>
                    <div class="fields" id="fields-${i + 1}">
                        <h4 class="text-lg gradient-text mt-4">Fields (max 25)</h4>
                    </div>
                    <button onclick="addField(${i + 1})">Add Field</button>
                    <button onclick="clearEmbed(${i + 1})">Clear Embed</button>
                `;
                forms.appendChild(form);

                // Bind event listeners
                const inputs = [
                    { id: `title-${i + 1}`, counter: `counter-title-${i + 1}`, max: 256 },
                    { id: `url-${i + 1}` },
                    { id: `description-${i + 1}`, counter: `counter-description-${i + 1}`, max: 4096 },
                    { id: `color-picker-${i + 1}`, sync: `color-hex-${i + 1}` },
                    { id: `color-hex-${i + 1}`, sync: `color-picker-${i + 1}` },
                    { id: `author-name-${i + 1}`, counter: `counter-author-name-${i + 1}`, max: 256 },
                    { id: `author-url-${i + 1}` },
                    { id: `author-icon-url-${i + 1}` },
                    { id: `thumbnail-url-${i + 1}` },
                    { id: `image-url-${i + 1}` },
                    { id: `footer-text-${i + 1}`, counter: `counter-footer-text-${i + 1}`, max: 2048 },
                    { id: `footer-icon-url-${i + 1}` },
                    { id: `timestamp-select-${i + 1}` },
                    { id: `timestamp-picker-${i + 1}` },
                    { id: `timestamp-manual-${i + 1}` }
                ];
                inputs.forEach(input => {
                    const element = document.getElementById(input.id);
                    if (element) {
                        element.addEventListener('input', () => {
                            if (input.sync) {
                                document.getElementById(input.sync).value = element.value;
                            }
                            if (input.counter) {
                                document.getElementById(input.counter).textContent = `${element.value.length}/${input.max}`;
                            }
                            if (input.id.startsWith('timestamp')) {
                                updateTimestampDisplay(i + 1);
                            }
                            updateEmbed(i);
                        });
                    }
                });

                // Timestamp select
                const timestampSelect = document.getElementById(`timestamp-select-${i + 1}`);
                timestampSelect.addEventListener('change', () => {
                    toggleTimestampInput(i + 1);
                    updateEmbed(i);
                });

                updateFields(i + 1, embed.fields);
                toggleTitleError(i + 1, embed);
                toggleAuthorError(i + 1, embed.author);
                toggleFooterError(i + 1, embed.footer);
            });
            updatePreview();
        }

        function toggleTitleError(embedIndex, embed) {
            const error = document.getElementById(`title-error-${embedIndex}`);
            error.style.display = embed.url && !embed.title ? 'block' : 'none';
        }

        function toggleAuthorError(embedIndex, author) {
            const error = document.getElementById(`author-error-${embedIndex}`);
            error.style.display = (author?.url && author?.icon_url && !author?.name) ? 'block' : 'none';
        }

        function toggleFooterError(embedIndex, footer) {
            const error = document.getElementById(`footer-error-${embedIndex}`);
            error.style.display = footer?.icon_url && !footer?.text ? 'block' : 'none';
        }

        function updateMessageContent() {
            console.log('Updating message content, value:', document.getElementById('message-content').value);
            const input = document.getElementById('message-content');
            messageContent = input.value;
            document.getElementById('counter-message-content').textContent = `${messageContent.length}/2000`;
            updatePreview();
            updateCode();
        }

        function updateFields(embedIndex, fields) {
            console.log(`Updating fields for embed ${embedIndex}, fields:`, fields);
            const fieldsDiv = document.getElementById(`fields-${embedIndex}`);
            fieldsDiv.innerHTML = '<h4 class="text-lg gradient-text mt-4">Fields (max 25)</h4>';
            fields.forEach((field, j) => {
                const fieldDiv = document.createElement('div');
                fieldDiv.className = 'field';
                fieldDiv.innerHTML = `
                    <label>Field Name</label>
                    <input type="text" id="field-name-${embedIndex}-${j}" placeholder="Field Name (max 256 chars)" maxlength="256" value="${field.name || ''}">
                    <span class="counter" id="counter-field-name-${embedIndex}-${j}">${field.name?.length || 0}/256</span>
                    <label>Field Value</label>
                    <textarea id="field-value-${embedIndex}-${j}" placeholder="Field Value (max 1024 chars)" maxlength="1024" rows="2">${field.value || ''}</textarea>
                    <span class="counter" id="counter-field-value-${embedIndex}-${j}">${field.value?.length || 0}/1024</span>
                    <label>Inline</label>
                    <div class="toggle ${field.inline ? 'active' : ''}" id="inline-toggle-${embedIndex}-${j}">Inline: ${field.inline ? 'On' : 'Off'}</div>
                    <button onclick="removeField(this)">Remove Field</button>
                `;
                fieldsDiv.appendChild(fieldDiv);

                // Bind field inputs
                const fieldNameInput = document.getElementById(`field-name-${embedIndex}-${j}`);
                const fieldValueInput = document.getElementById(`field-value-${embedIndex}-${j}`);
                const inlineToggle = document.getElementById(`inline-toggle-${embedIndex}-${j}`);
                
                fieldNameInput.addEventListener('input', () => {
                    document.getElementById(`counter-field-name-${embedIndex}-${j}`).textContent = `${fieldNameInput.value.length}/256`;
                    updateField(embedIndex - 1, j);
                });
                fieldValueInput.addEventListener('input', () => {
                    document.getElementById(`counter-field-value-${embedIndex}-${j}`).textContent = `${fieldValueInput.value.length}/1024`;
                    updateField(embedIndex - 1, j);
                });
                inlineToggle.addEventListener('click', () => toggleInline(inlineToggle, embedIndex - 1, j));
            });
            updatePreview();
        }

        function addField(embedIndex) {
            if (embeds[embedIndex - 1].fields.length >= 25) {
                alert('Maximum 25 fields allowed per embed.');
                return;
            }
            embeds[embedIndex - 1].fields.push({ name: '', value: '', inline: false });
            updateFields(embedIndex, embeds[embedIndex - 1].fields);
        }

        function removeField(button) {
            const fieldDiv = button.parentElement;
            const fieldsDiv = fieldDiv.parentElement;
            const embedIndex = parseInt(fieldsDiv.id.split('-')[1]) - 1;
            const fieldIndex = Array.from(fieldsDiv.children).indexOf(fieldDiv) - 1;
            embeds[embedIndex].fields.splice(fieldIndex, 1);
            updateFields(embedIndex + 1, embeds[embedIndex].fields);
        }

        function toggleInline(toggle, embedIndex, fieldIndex) {
            embeds[embedIndex].fields[fieldIndex].inline = !embeds[embedIndex].fields[fieldIndex].inline;
            toggle.classList.toggle('active');
            toggle.textContent = `Inline: ${embeds[embedIndex].fields[fieldIndex].inline ? 'On' : 'Off'}`;
            updatePreview();
            updateCode();
        }

        function toggleTimestampInput(embedIndex) {
            const select = document.getElementById(`timestamp-select-${embedIndex}`);
            const inputDiv = document.getElementById(`timestamp-input-${embedIndex}`);
            inputDiv.style.display = select.value === 'custom' ? 'block' : 'none';
            if (select.value !== 'custom') {
                document.getElementById(`timestamp-display-${embedIndex}`).textContent = 'Selected: None';
            }
            updatePreview();
        }

        function updateTimestampDisplay(embedIndex) {
            const picker = document.getElementById(`timestamp-picker-${embedIndex}`);
            const manual = document.getElementById(`timestamp-manual-${embedIndex}`);
            const display = document.getElementById(`timestamp-display-${embedIndex}`);
            let value = picker.value || manual.value;
            if (value) {
                try {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        display.textContent = `Selected: ${date.toLocaleString()}`;
                        if (picker.value && !manual.value) manual.value = date.toISOString();
                        if (manual.value && !picker.value) picker.value = value.slice(0, 16);
                    } else {
                        display.textContent = 'Selected: Invalid date';
                    }
                } catch {
                    display.textContent = 'Selected: Invalid date';
                }
            } else {
                display.textContent = 'Selected: None';
            }
            updatePreview();
        }

        function updateEmbed(index) {
            console.log(`Updating embed ${index}`);
            const author = {
                name: document.getElementById(`author-name-${index + 1}`).value,
                url: document.getElementById(`author-url-${index + 1}`).value,
                icon_url: document.getElementById(`author-icon-url-${index + 1}`).value
            };
            const footer = {
                text: document.getElementById(`footer-text-${index + 1}`).value,
                icon_url: document.getElementById(`footer-icon-url-${index + 1}`).value
            };
            let timestamp = document.getElementById(`timestamp-select-${index + 1}`).value === 'current' ? 'current' : null;
            if (document.getElementById(`timestamp-select-${index + 1}`).value === 'custom') {
                const picker = document.getElementById(`timestamp-picker-${index + 1}`).value;
                const manual = document.getElementById(`timestamp-manual-${index + 1}`).value;
                timestamp = picker || manual || null;
                try {
                    if (timestamp) new Date(timestamp);
                } catch {
                    timestamp = null;
                }
            }
            embeds[index] = {
                title: document.getElementById(`title-${index + 1}`).value,
                url: document.getElementById(`url-${index + 1}`).value,
                description: document.getElementById(`description-${index + 1}`).value,
                color: document.getElementById(`color-picker-${index + 1}`).value || document.getElementById(`color-hex-${index + 1}`).value,
                author: author.name || (author.url && author.icon_url) ? author : null,
                thumbnail: document.getElementById(`thumbnail-url-${index + 1}`).value ? { url: document.getElementById(`thumbnail-url-${index + 1}`).value } : null,
                image: document.getElementById(`image-url-${index + 1}`).value ? { url: document.getElementById(`image-url-${index + 1}`).value } : null,
                footer: footer.text || footer.icon_url ? footer : null,
                timestamp: timestamp,
                fields: embeds[index].fields
            };
            toggleTitleError(index + 1, embeds[index]);
            toggleAuthorError(index + 1, embeds[index].author);
            toggleFooterError(index + 1, embeds[index].footer);
            updatePreview();
            updateCode();
        }

        function updateField(embedIndex, fieldIndex) {
            console.log(`Updating field ${fieldIndex} for embed ${embedIndex}`);
            const name = document.getElementById(`field-name-${embedIndex + 1}-${fieldIndex}`).value;
            const value = document.getElementById(`field-value-${embedIndex + 1}-${fieldIndex}`).value;
            embeds[embedIndex].fields[fieldIndex] = {
                name,
                value,
                inline: embeds[embedIndex].fields[fieldIndex].inline
            };
            updatePreview();
            updateCode();
        }

        function switchEmbed(index) {
            console.log(`Switching to embed ${index}`);
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`.tab[data-embed="${index}"]`).classList.add('active');
            document.querySelectorAll('.embed-form').forEach(form => form.style.display = 'none');
            document.querySelector(`.embed-form[data-embed="${index}"]`).style.display = 'block';
            updatePreview();
        }

        function validateURL(url) {
            try {
                new URL(url);
                return url;
            } catch {
                return 'https://via.placeholder.com/80?text=Invalid+Image';
            }
        }

        function escapeHTML(text) {
            const div = document.createElement('div');
            div.textContent = text || '';
            return div.innerHTML;
        }

        function updatePreview() {
            console.log('Updating preview, messageContent:', messageContent, 'embeds:', embeds);
            const preview = document.getElementById('embed-preview');
            preview.innerHTML = '';
            try {
                if (messageContent) {
                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'message-content';
                    contentDiv.textContent = messageContent;
                    preview.appendChild(contentDiv);
                }
                embeds.forEach((embed, i) => {
                    if (!embed.title && !embed.description && !embed.author?.name && !embed.thumbnail?.url && !embed.image?.url && !embed.footer?.text && !embed.timestamp && !embed.fields.some(f => f.name && f.value)) {
                        console.log(`Skipping empty embed ${i}`);
                        return;
                    }
                    console.log(`Rendering embed ${i}:`, embed);
                    const embedDiv = document.createElement('div');
                    embedDiv.className = 'embed-preview';
                    embedDiv.style.borderLeftColor = embed.color || '#5865F2';
                    let html = '';
                    if (embed.author?.name) {
                        html += `<div class="author">`;
                        if (embed.author.icon_url) {
                            html += `<img src="${validateURL(embed.author.icon_url)}" alt="Author Icon" onerror="this.src='https://via.placeholder.com/24?text=Error'">`;
                        }
                        html += `<span>${escapeHTML(embed.author.name)}</span></div>`;
                    }
                    if (embed.title) {
                        const titleText = escapeHTML(embed.title);
                        html += `<div class="title">${embed.url && embed.title ? `<a href="${validateURL(embed.url)}" target="_blank">${titleText}</a>` : titleText}</div>`;
                    }
                    if (embed.description) {
                        html += `<div class="description">${escapeHTML(embed.description).replace(/\n/g, '<br>')}</div>`;
                    }
                    if (embed.thumbnail?.url) {
                        html += `<div class="thumbnail"><img src="${validateURL(embed.thumbnail.url)}" alt="Thumbnail" onerror="this.src='https://via.placeholder.com/80?text=Error'"></div>`;
                    }
                    if (embed.fields.length) {
                        html += `<div class="fields">`;
                        embed.fields.forEach(field => {
                            if (field.name && field.value) {
                                html += `<div class="field ${field.inline ? 'inline' : ''}"><strong>${escapeHTML(field.name)}</strong><div>${escapeHTML(field.value).replace(/\n/g, '<br>')}</div></div>`;
                            }
                        });
                        html += `</div>`;
                    }
                    if (embed.image?.url) {
                        html += `<div class="image"><img src="${validateURL(embed.image.url)}" alt="Image" onerror="this.src='https://via.placeholder.com/200?text=Error'"></div>`;
                    }
                    if (embed.footer?.text || embed.timestamp) {
                        html += `<div class="footer">`;
                        if (embed.footer?.icon_url) {
                            html += `<img src="${validateURL(embed.footer.icon_url)}" alt="Footer Icon" onerror="this.src='https://via.placeholder.com/20?text=Error'">`;
                        }
                        if (embed.footer?.text) {
                            html += `<span>${escapeHTML(embed.footer.text)}</span>`;
                        }
                        if (embed.footer?.text && embed.timestamp) {
                            html += `<span class="footer-separator">.</span>`;
                        }
                        if (embed.timestamp) {
                            const date = embed.timestamp === 'current' ? new Date() : new Date(embed.timestamp);
                            html += `<span class="timestamp">${isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString()}</span>`;
                        }
                        html += `</div>`;
                    }
                    embedDiv.innerHTML = html;
                    preview.appendChild(embedDiv);
                });
            } catch (error) {
                console.error('Error in updatePreview:', error);
                preview.innerHTML = '<p class="error">Error rendering preview. Check console for details.</p>';
            }
        }

        function updateCode() {
            console.log('Updating code');
            const tabs = document.getElementById('code-tabs');
            const output = document.getElementById('code-output');
            const activeTab = tabs.querySelector('.tab.active').dataset.code;

            if (activeTab === 'json') {
                const json = {
                    content: messageContent || undefined,
                    embeds: embeds.map(embed => {
                        const obj = {};
                        if (embed.title) obj.title = embed.title;
                        if (embed.url && embed.title) obj.url = embed.url;
                        if (embed.description) obj.description = embed.description;
                        if (embed.color) obj.color = parseInt(embed.color.replace('#', ''), 16);
                        if (embed.author?.name) obj.author = embed.author;
                        if (embed.thumbnail?.url) obj.thumbnail = embed.thumbnail;
                        if (embed.image?.url) obj.image = embed.image;
                        if (embed.footer?.text) obj.footer = embed.footer;
                        if (embed.timestamp) obj.timestamp = embed.timestamp === 'current' ? new Date().toISOString() : embed.timestamp;
                        if (embed.fields.length && embed.fields.some(f => f.name && f.value)) {
                            obj.fields = embed.fields.filter(f => f.name && f.value);
                        }
                        return obj;
                    }).filter(embed => Object.keys(embed).length > 0)
                };
                if (!json.content && !json.embeds.length) {
                    output.textContent = '{}';
                } else {
                    output.textContent = JSON.stringify(json, null, 2);
                }
            } else if (activeTab === 'discordpy') {
                let code = 'import discord\n\n';
                if (!embeds.some(embed => embed.title || embed.description || embed.fields.length) && !messageContent) {
                    code += '# No embeds or content defined';
                } else {
                    code += 'embed_list = []\n';
                    embeds.forEach((embed, i) => {
                        if (!embed.title && !embed.description && !embed.fields.length) return;
                        code += `embed_${i + 1} = discord.Embed(title="${embed.title || ''}", url="${embed.url && embed.title ? embed.url : ''}", description="${embed.description || ''}"`;
                        if (embed.color) code += `, color=0x${embed.color.replace('#', '')}`;
                        code += `)\n`;
                        if (embed.author?.name) {
                            code += `embed_${i + 1}.set_author(name="${embed.author.name}", url="${embed.author.url || ''}", icon_url="${embed.author.icon_url || ''}")\n`;
                        }
                        if (embed.thumbnail?.url) {
                            code += `embed_${i + 1}.set_thumbnail(url="${embed.thumbnail.url}")\n`;
                        }
                        if (embed.image?.url) {
                            code += `embed_${i + 1}.set_image(url="${embed.image.url}")\n`;
                        }
                        if (embed.footer?.text) {
                            code += `embed_${i + 1}.set_footer(text="${embed.footer.text}", icon_url="${embed.footer.icon_url || ''}")\n`;
                        }
                        if (embed.timestamp) {
                            code += `embed_${i + 1}.set_timestamp()\n`;
                        }
                        embed.fields.forEach(field => {
                            if (field.name && field.value) {
                                code += `embed_${i + 1}.add_field(name="${field.name}", value="${field.value}", inline=${field.inline ? 'True' : 'False'})\n`;
                            }
                        });
                        code += `embed_list.append(embed_${i + 1})\n\n`;
                    });
                    code += `# Example usage\nawait channel.send(content="${messageContent.replace(/"/g, '\\"')}", embeds=embed_list)`;
                }
                output.textContent = code;
            } else if (activeTab === 'discordjs') {
                let code = 'const { EmbedBuilder } = require("discord.js");\n\n';
                if (!embeds.some(embed => embed.title || embed.description || embed.fields.length) && !messageContent) {
                    code += '// No embeds or content defined';
                } else {
                    code += 'const embedList = [];\n';
                    embeds.forEach((embed, i) => {
                        if (!embed.title && !embed.description && !embed.fields.length) return;
                        code += `const embed_${i + 1} = new EmbedBuilder()\n`;
                        if (embed.title) code += `    .setTitle("${embed.title}")\n`;
                        if (embed.url && embed.title) code += `    .setURL("${embed.url}")\n`;
                        if (embed.description) code += `    .setDescription("${embed.description}")\n`;
                        if (embed.color) code += `    .setColor("${embed.color}")\n`;
                        if (embed.author?.name) {
                            code += `    .setAuthor({ name: "${embed.author.name}", url: "${embed.author.url || ''}", iconURL: "${embed.author.icon_url || ''}" })\n`;
                        }
                        if (embed.thumbnail?.url) {
                            code += `    .setThumbnail("${embed.thumbnail.url}")\n`;
                        }
                        if (embed.image?.url) {
                            code += `    .setImage("${embed.image.url}")\n`;
                        }
                        if (embed.footer?.text) {
                            code += `    .setFooter({ text: "${embed.footer.text}", iconURL: "${embed.footer.icon_url || ''}" })\n`;
                        }
                        if (embed.timestamp) {
                            code += `    .setTimestamp(${embed.timestamp === 'current' ? '' : `new Date("${embed.timestamp}")`})\n`;
                        }
                        if (embed.fields.length && embed.fields.some(f => f.name && f.value)) {
                            code += `    .addFields(\n`;
                            embed.fields.forEach(field => {
                                if (field.name && field.value) {
                                    code += `        { name: "${field.name}", value: "${field.value}", inline: ${field.inline} },\n`;
                                }
                            });
                            code += `    )\n`;
                        }
                        code += `embedList.push(embed_${i + 1});\n\n`;
                    });
                    code += `// Example usage\nchannel.send({ content: "${messageContent.replace(/"/g, '\\"')}", embeds: embedList });`;
                }
                output.textContent = code;
            }
        }

        function copyCode() {
            const code = document.getElementById('code-output').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const button = document.querySelector('button[onclick="copyCode()"]');
                button.textContent = 'Copied!';
                setTimeout(() => button.textContent = 'Copy Code', 2000);
            }).catch(() => {
                alert('Failed to copy code.');
            });
        }

        function switchCodeTab(tab) {
            document.querySelectorAll('#code-tabs .tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateCode();
        }

        document.querySelectorAll('#code-tabs .tab').forEach(tab => {
            tab.addEventListener('click', () => switchCodeTab(tab));
        });

        function sendWebhook() {
            console.log('Sending webhook');
            const url = document.getElementById('webhook-url').value;
            const status = document.getElementById('webhook-status');
            status.textContent = '';
            status.classList.remove('error');

            if (!url) {
                status.textContent = 'Error: Please enter a valid webhook URL.';
                status.classList.add('error');
                console.error('Webhook URL is empty');
                setTimeout(() => status.textContent = '', 5000);
                return;
            }

            const json = {};
            if (messageContent) {
                json.content = messageContent;
            }
            const validEmbeds = embeds.map(embed => {
                const obj = {};
                if (embed.title) obj.title = embed.title;
                if (embed.url && embed.title) obj.url = embed.url;
                if (embed.description) obj.description = embed.description;
                if (embed.color) obj.color = parseInt(embed.color.replace('#', ''), 16);
                if (embed.author?.name) obj.author = embed.author;
                if (embed.thumbnail?.url) obj.thumbnail = embed.thumbnail;
                if (embed.image?.url) obj.image = embed.image;
                if (embed.footer?.text) obj.footer = embed.footer;
                if (embed.timestamp) obj.timestamp = embed.timestamp === 'current' ? new Date().toISOString() : embed.timestamp;
                if (embed.fields.length && embed.fields.some(f => f.name && f.value)) {
                    obj.fields = embed.fields.filter(f => f.name && f.value);
                }
                return obj;
            }).filter(embed => Object.keys(embed).length > 0);
            if (validEmbeds.length > 0) {
                json.embeds = validEmbeds;
            }

            if (!json.content && !json.embeds) {
                status.textContent = 'Error: Please provide message content or at least one valid embed.';
                status.classList.add('error');
                console.error('No content or valid embeds provided');
                setTimeout(() => status.textContent = '', 5000);
                return;
            }

            console.log('Sending webhook with payload:', JSON.stringify(json, null, 2));
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            })
            .then(response => {
                console.log('Webhook response status:', response.status);
                if (response.status === 200 || response.status === 204) {
                    status.textContent = 'Webhook sent successfully!';
                    status.classList.remove('error');
                    console.log('Webhook sent successfully');
                    setTimeout(() => status.textContent = '', 5000);
                    return;
                }
                return response.json().then(data => {
                    console.error('Webhook error response:', data);
                    let errorMsg = `HTTP ${response.status}: ${data.message || 'Unknown error'}`;
                    if (response.status === 429) {
                        const retryAfter = data.retry_after || 0;
                        errorMsg = `Rate limit exceeded. Retry after ${retryAfter} seconds.`;
                    } else if (response.status === 400) {
                        errorMsg = `Invalid payload: ${data.message || JSON.stringify(data)}`;
                    } else if (response.status === 404) {
                        errorMsg = 'Webhook URL not found.';
                    }
                    throw new Error(errorMsg);
                });
            })
            .catch(error => {
                status.textContent = `Error: ${error.message}`;
                status.classList.add('error');
                console.error('Webhook fetch error:', error.message);
                setTimeout(() => status.textContent = '', 5000);
            });
        }

        updateEmbedForms();
        updateEmbedTabs();
        updatePreview();
        updateCode();
