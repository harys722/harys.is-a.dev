// This standalone tester never persists keys or chat. Requests go only to Google.
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/';
let apiKey = '', availableModels = [], selectedModel = '', chatHistory = [];
let busy = false, session = 0, activeRequest = null;
const byId = id => document.getElementById(id);

function showStatus(message, type = 'error') {
    const status = byId('status');
    status.replaceChildren(); appendNotice(status, message);
    status.className = 'status ' + type; status.style.display = 'block';
}
function appendNotice(host, value) {
    const summary = document.createElement('p'); summary.className = 'notice-summary';
    summary.textContent = typeof value === 'string' ? value : value.message; host.append(summary);
    if (value.providerDetails) {
        const details = document.createElement('details'), title = document.createElement('summary'), text = document.createElement('pre');
        details.className = 'error-details'; title.textContent = 'Google error details'; text.textContent = value.providerDetails;
        details.append(title, text); host.append(details);
    }
    if (value.quota) {
        const links = document.createElement('p'); links.className = 'error-links';
        for (const [label, href] of [['View Google usage', 'https://ai.dev/rate-limit'], ['Quota guide', 'https://ai.google.dev/gemini-api/docs/rate-limits']]) {
            const link = document.createElement('a'); link.textContent = label; link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; links.append(link);
        }
        host.append(links);
    }
}
function setBusy(value, label) {
    busy = value;
    byId('testBtn').disabled = value;
    byId('apiKey').disabled = value;
    byId('modelSelect').disabled = value;
    byId('chatInput').disabled = value;
    byId('sendBtn').disabled = value;
    byId('stopBtn').hidden = !value || !selectedModel;
    byId('chatActivity').hidden = !value || !selectedModel;
    byId('chatActivity').textContent = value && selectedModel ? 'Gemini is responding...' : '';
    byId('btnText').textContent = label || (availableModels.length ? 'Test selected model' : 'Load available models');
    byId('sendIcon').textContent = value ? 'Sending' : 'Send';
}
function resetMessages() {
    byId('chatMessages').replaceChildren();
    addMessage(selectedModel ? 'New conversation. What would you like to explore?' : 'Choose a model and test it to start a conversation.', 'ai');
}
function newChat() {
    session++; activeRequest?.abort(); activeRequest = null; chatHistory = [];
    byId('chatInput').value = ''; resetMessages(); setBusy(false); byId('chatInput').focus();
}
function stopRequest() { activeRequest?.abort(); }
function clearSession(clearInput = true) {
    session++; activeRequest?.abort(); activeRequest = null;
    apiKey = ''; availableModels = []; selectedModel = ''; chatHistory = [];
    if (clearInput) byId('apiKey').value = '';
    byId('modelSelect').replaceChildren(); byId('modelGroup').hidden = true;
    byId('chatInput').value = ''; byId('chatModel').textContent = '';
    byId('setupContainer').hidden = false; byId('chatContainer').style.display = 'none';
    byId('status').style.display = 'none'; resetMessages(); setBusy(false);
    if (clearInput) showStatus('Key and chat cleared.', 'success');
}
function goBack() {
    session++; activeRequest?.abort(); activeRequest = null; chatHistory = []; selectedModel = '';
    byId('apiKey').value = apiKey; byId('chatInput').value = '';
    byId('setupContainer').hidden = false; byId('chatContainer').style.display = 'none';
    resetMessages(); setBusy(false);
    showStatus('Choose a model to test. The previous chat has been cleared.', 'success');
}
function readableError(status, data, key) {
    const raw = String(data?.error?.message || '');
    const redacted = key ? raw.split(key).join('[redacted]') : raw;
    const detail = redacted.length > 16000 ? redacted.slice(0, 16000) + '\n[Details shortened]' : redacted;
    let message = 'Google could not complete this request (HTTP ' + status + ').';
    if (/API_KEY_INVALID|API key not valid|invalid api key/i.test(detail) || status === 401) message = 'Google rejected this API key. Check the key and try again.';
    else if (status === 403) message = 'Google denied access. Check the key restrictions, API access, and project permissions.';
    else if (status === 404) message = 'The selected model is unavailable. Go back and reload the model list or choose another model.';
    else if (status === 429) message = /limit:\s*0\b/i.test(detail)
        ? 'Google reports a zero quota limit for this model. Choose another model or check your project quota and billing.'
        : 'Google rate limit or quota reached. Wait and retry, or check your project usage.';
    else if (status >= 500) message = 'Google is temporarily unavailable. Please try again later.';
    const error = new Error(message); error.providerDetails = detail; error.quota = status === 429; return error;
}
async function googleRequest(path, key, revision, body) {
    const controller = new AbortController(); activeRequest = controller;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 30000);
    try {
        const response = await fetch(API_BASE + path, {
            method: body ? 'POST' : 'GET',
            headers: { 'x-goog-api-key': key, ...(body ? { 'Content-Type': 'application/json' } : {}) },
            ...(body ? { body: JSON.stringify(body) } : {}),
            signal: controller.signal, credentials: 'omit', cache: 'no-store', redirect: 'error', referrerPolicy: 'strict-origin-when-cross-origin'
        });
        if (revision !== session) throw new Error('Session cleared.');
        let data;
        try { data = await response.json(); }
        catch { throw new Error('Google returned an unreadable response (HTTP ' + response.status + '). Please retry.'); }
        if (revision !== session) throw new Error('Session cleared.');
        if (!response.ok) throw readableError(response.status, data, key);
        return data;
    } catch (error) {
        if (timedOut) throw new Error('Google did not respond within 30 seconds. Please retry.');
        if (error.name === 'AbortError') { const stopped = new Error('Response stopped. You can edit your message and send it again.'); stopped.name = 'AbortError'; throw stopped; }
        if (error instanceof TypeError) throw new Error('Could not reach Google. Check your connection or browser restrictions.');
        throw error;
    } finally {
        clearTimeout(timeout); if (activeRequest === controller) activeRequest = null;
    }
}
function modelPreference(model) {
    const name = model.name;
    return (/preview|experimental|(?:^|-)exp(?:-|$)/i.test(name) ? 10 : 0) + (/flash-lite/i.test(name) ? 0 : /flash/i.test(name) ? 1 : 2);
}
async function discoverModels(key, revision) {
    const found = [], seen = new Set(); let token = '';
    do {
        const query = new URLSearchParams({ pageSize: '1000' }); if (token) query.set('pageToken', token);
        const data = await googleRequest('models?' + query, key, revision);
        for (const model of data.models || []) {
            if (/^models\/gemini-[a-z0-9._-]+$/i.test(model.name) && model.supportedGenerationMethods?.includes('generateContent') && !/image|audio|tts|live|robotics|computer-use|embedding/i.test(model.name)) found.push(model);
        }
        token = data.nextPageToken || '';
        if (token && seen.has(token)) throw new Error('Google returned a repeated model page. Please retry.');
        if (token) seen.add(token);
    } while (token);
    const unique = [...new Map(found.map(model => [model.name, model])).values()];
    unique.sort((a, b) => modelPreference(a) - modelPreference(b) || b.name.localeCompare(a.name, undefined, { numeric: true }));
    return unique;
}
function responseContent(data) {
    const content = data.candidates?.[0]?.content;
    const text = (content?.parts || []).filter(part => !part.thought && typeof part.text === 'string').map(part => part.text).join('\n').trim();
    if (!text) {
        const reason = data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason;
        throw new Error('Google returned no text' + (reason ? ' (' + reason + ')' : '') + '. Try another prompt or model.');
    }
    // Keep the full model content, including signatures required by newer models.
    return { text, content: { ...content, role: 'model' } };
}
async function testApiKey() {
    if (busy) return;
    const key = byId('apiKey').value.trim();
    if (!key) { showStatus('Please enter your API key.'); return; }
    const revision = session;
    const discovering = !availableModels.length || apiKey !== key;
    setBusy(true, discovering ? 'Loading models...' : 'Testing selected model...');
    byId('status').style.display = 'none';
    try {
        if (discovering) {
            const models = await discoverModels(key, revision);
            if (revision !== session) return;
            if (!models.length) throw new Error('Google returned no compatible Gemini text-generation models for this key. Check API access and project permissions.');
            apiKey = key; availableModels = models;
            byId('modelSelect').replaceChildren(...models.map(model => {
                const option = document.createElement('option'); option.value = model.name;
                option.textContent = (model.displayName || model.name.slice(7)) + ' (' + model.name.slice(7) + ')'; return option;
            }));
            byId('modelSelect').value = models[0].name; byId('modelGroup').hidden = false;
            showStatus('Models loaded. Choose one, then test generation.', 'success');
        } else {
            const model = byId('modelSelect').value;
            if (!availableModels.some(item => item.name === model)) throw new Error('Choose a model from the loaded list.');
            const data = await googleRequest(model + ':generateContent', key, revision, { contents: [{ role: 'user', parts: [{ text: 'Reply with OK to confirm this API test.' }] }] });
            responseContent(data); if (revision !== session) return;
            selectedModel = model; chatHistory = [];
            byId('chatMessages').replaceChildren(); addMessage('API test successful. Start chatting below.', 'ai');
            byId('chatModel').textContent = 'Model: ' + selectedModel.slice(7);
            byId('apiKey').value = ''; byId('setupContainer').hidden = true; byId('chatContainer').style.display = 'flex';
        }
    } catch (error) { if (revision === session) showStatus(error); }
    finally { if (revision === session) { setBusy(false); if (selectedModel) byId('chatInput').focus(); } }
}
function reloadModels() {
    if (busy) return;
    availableModels = []; byId('modelSelect').replaceChildren(); byId('modelGroup').hidden = true; testApiKey();
}
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); sendMessage(); }
}
async function sendMessage() {
    if (busy || !apiKey || !selectedModel) return;
    const input = byId('chatInput'), message = input.value.trim(); if (!message) return;
    const revision = session, pending = [...chatHistory, { role: 'user', parts: [{ text: message }] }];
    addMessage(message, 'user'); input.value = ''; setBusy(true);
    try {
        const data = await googleRequest(selectedModel + ':generateContent', apiKey, revision, { contents: pending });
        const result = responseContent(data); if (revision !== session) return;
        chatHistory = [...pending, result.content]; addMessage(result.text, 'ai');
    } catch (error) {
        if (revision === session) { addMessage(error.name === 'AbortError' ? error.message : error, error.name === 'AbortError' ? 'ai' : 'error'); input.value = message; }
    } finally { if (revision === session) { setBusy(false); input.focus(); } }
}
function addMessage(text, sender) {
    const box = byId('chatMessages'), message = document.createElement('div'), header = document.createElement('div'), label = document.createElement('strong'), body = document.createElement('div');
    message.className = 'message ' + (sender === 'user' ? 'user' : sender === 'error' ? 'error' : 'ai');
    header.className = 'message-header'; body.className = 'message-content';
    label.textContent = sender === 'user' ? 'You' : sender === 'error' ? 'Request failed' : 'Gemini'; header.append(label);
    if (sender === 'error') appendNotice(body, text);
    else {
        const value = String(text), pattern = /```([^\n]*)\n([\s\S]*?)```/g; let start = 0, match;
        const paragraph = value => { value = value.replace(/^\n+|\n+$/g, ''); if (!value) return; const node = document.createElement('p'); node.textContent = value; body.append(node); };
        while ((match = pattern.exec(value))) {
            paragraph(value.slice(start, match.index));
            const block = document.createElement('div'), caption = document.createElement('div'), language = document.createElement('span'), pre = document.createElement('pre'), code = document.createElement('code');
            block.className = 'code-block'; caption.className = 'code-caption'; language.textContent = match[1].trim().slice(0, 32) || 'Code';
            code.textContent = match[2]; caption.append(language, copyButton(match[2], 'Copy code')); pre.append(code); block.append(caption, pre); body.append(block); start = pattern.lastIndex;
        }
        paragraph(value.slice(start));
        if (sender === 'ai') header.append(copyButton(value, 'Copy response'));
    }
    message.append(header, body); box.appendChild(message); box.scrollTop = box.scrollHeight;
}
function copyButton(text, label) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'copy-button'; button.textContent = label;
    button.onclick = async () => {
        try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; }
        catch { button.textContent = 'Select text to copy'; }
        setTimeout(() => button.textContent = label, 1800);
    };
    return button;
}
byId('apiKey').addEventListener('input', () => clearSession(false));
addEventListener('pagehide', () => clearSession());
