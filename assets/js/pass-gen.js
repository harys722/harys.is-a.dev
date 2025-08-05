let isPasswordVisible = false;

function saveUserPreferences() {
	const preferences = {
		length: document.getElementById('lengthSlider').value,
		uppercase: document.getElementById('uppercase').checked,
		lowercase: document.getElementById('lowercase').checked,
		numbers: document.getElementById('numbers').checked,
		symbols: document.getElementById('symbols').checked,
		excludeSimilar: document.getElementById('excludeSimilar').checked,
		excludeAmbiguous: document.getElementById('excludeAmbiguous').checked,
		isPasswordVisible: isPasswordVisible
	};
	localStorage.setItem('passwordGeneratorPrefs', JSON.stringify(preferences));
}

function loadUserPreferences() {
	const saved = localStorage.getItem('passwordGeneratorPrefs');
	if (saved) {
		try {
			const preferences = JSON.parse(saved);

			// Restore length
			document.getElementById('lengthSlider').value = preferences.length || 16;
			updateLength(preferences.length || 16);

			// Restore checkboxes
			document.getElementById('uppercase').checked = preferences.uppercase !== false;
			document.getElementById('lowercase').checked = preferences.lowercase !== false;
			document.getElementById('numbers').checked = preferences.numbers !== false;
			document.getElementById('symbols').checked = preferences.symbols !== false;
			document.getElementById('excludeSimilar').checked = preferences.excludeSimilar || false;
			document.getElementById('excludeAmbiguous').checked = preferences.excludeAmbiguous || false;

			// Restore visibility preference
			isPasswordVisible = preferences.isPasswordVisible || false;
			updateVisibilityIcon();

		} catch (e) {
			console.log('Error loading preferences, using defaults');
		}
	}
}

function addPreferenceListeners() {
	document.getElementById('lengthSlider').addEventListener('input', saveUserPreferences);
	document.getElementById('uppercase').addEventListener('change', saveUserPreferences);
	document.getElementById('lowercase').addEventListener('change', saveUserPreferences);
	document.getElementById('numbers').addEventListener('change', saveUserPreferences);
	document.getElementById('symbols').addEventListener('change', saveUserPreferences);
	document.getElementById('excludeSimilar').addEventListener('change', saveUserPreferences);
	document.getElementById('excludeAmbiguous').addEventListener('change', saveUserPreferences);
}

function updateLength(value) {
	document.getElementById('lengthDisplay').textContent = value;
}

function updateVisibilityIcon() {
	const visibilityIcon = document.getElementById('visibilityIcon');
	const passwordField = document.getElementById('passwordField');

	if (isPasswordVisible) {
		// Show password
		passwordField.style.filter = 'none';
		visibilityIcon.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
	} else {
		// Hide password 
		passwordField.style.filter = 'blur(4px)';
		visibilityIcon.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
	}
}

function togglePasswordVisibility() {
	isPasswordVisible = !isPasswordVisible;
	updateVisibilityIcon();
	saveUserPreferences();
}

function calculateStrength(password) {
	let score = 0;

	if (password.length >= 8) score += 1;
	if (password.length >= 12) score += 1;
	if (password.length >= 16) score += 1;
	if (/[a-z]/.test(password)) score += 1;
	if (/[A-Z]/.test(password)) score += 1;
	if (/[0-9]/.test(password)) score += 1;
	if (/[^A-Za-z0-9]/.test(password)) score += 1;

	const strengthLevels = [{
			score: 0,
			text: 'Very Weak',
			color: '#dc322f',
			width: '10%'
		},
		{
			score: 1,
			text: 'Very Weak',
			color: '#dc322f',
			width: '20%'
		},
		{
			score: 2,
			text: 'Weak',
			color: '#cb4b16',
			width: '30%'
		},
		{
			score: 3,
			text: 'Fair',
			color: '#b58900',
			width: '50%'
		},
		{
			score: 4,
			text: 'Good',
			color: '#859900',
			width: '65%'
		},
		{
			score: 5,
			text: 'Strong',
			color: '#268bd2',
			width: '80%'
		},
		{
			score: 6,
			text: 'Very Strong',
			color: '#2aa198',
			width: '90%'
		},
		{
			score: 7,
			text: 'Excellent',
			color: '#57F287',
			width: '100%'
		}
	];

	return strengthLevels[Math.min(score, 7)];
}

function updateStrengthMeter(password) {
	const strength = calculateStrength(password);
	const strengthText = document.getElementById('strengthText');
	const strengthFill = document.getElementById('strengthFill');

	strengthText.textContent = strength.text;
	strengthText.style.color = strength.color;
	strengthFill.style.width = strength.width;
	strengthFill.style.background = `linear-gradient(90deg, ${strength.color}, ${strength.color})`;
}

function generatePassword() {
	const length = parseInt(document.getElementById('lengthSlider').value);
	const uppercase = document.getElementById('uppercase').checked;
	const lowercase = document.getElementById('lowercase').checked;
	const numbers = document.getElementById('numbers').checked;
	const symbols = document.getElementById('symbols').checked;
	const excludeSimilar = document.getElementById('excludeSimilar').checked;
	const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;

	let charset = '';
	let guaranteedChars = [];

	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const numberChars = '0123456789';
	const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
	const similarChars = 'il1Lo0O';
	const ambiguousChars = '{}[]()/\\\'"`~,;.<>';

	if (uppercase) {
		charset += uppercaseChars;
		guaranteedChars.push(uppercaseChars);
	}
	if (lowercase) {
		charset += lowercaseChars;
		guaranteedChars.push(lowercaseChars);
	}
	if (numbers) {
		charset += numberChars;
		guaranteedChars.push(numberChars);
	}
	if (symbols) {
		charset += symbolChars;
		guaranteedChars.push(symbolChars);
	}

	if (excludeSimilar) {
		charset = charset.split('').filter(char => !similarChars.includes(char)).join('');
	}
	if (excludeAmbiguous) {
		charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('');
	}

	if (charset === '') {
		showMessage('Please select at least one character type!', 'error');
		return;
	}

	let password = '';

	// Ensure at least one character from each selected type
	guaranteedChars.forEach(charSet => {
		let filteredCharSet = charSet;
		if (excludeSimilar) {
			filteredCharSet = filteredCharSet.split('').filter(char => !similarChars.includes(char)).join('');
		}
		if (excludeAmbiguous) {
			filteredCharSet = filteredCharSet.split('').filter(char => !ambiguousChars.includes(char)).join('');
		}
		if (filteredCharSet.length > 0) {
			password += filteredCharSet.charAt(Math.floor(Math.random() * filteredCharSet.length));
		}
	});

	// Fill the rest randomly
	for (let i = password.length; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	// Shuffle the password
	password = password.split('').sort(() => Math.random() - 0.5).join('');

	document.getElementById('passwordField').value = password;
	updateStrengthMeter(password);
	showMessage('Password generated successfully!', 'success');
}

function copyPassword() {
	const passwordField = document.getElementById('passwordField');
	const copyBtn = document.getElementById('copyBtn');

	if (passwordField.value === '') {
		showMessage('No password to copy! Generate one first.', 'error');
		return;
	}

	navigator.clipboard.writeText(passwordField.value).then(() => {
		copyBtn.classList.add('copied');
		copyBtn.innerHTML = '<span>✅</span> Copied!';
		showMessage('Password copied to clipboard!', 'success');

		setTimeout(() => {
			copyBtn.classList.remove('copied');
			copyBtn.innerHTML = '<span>📋</span> Copy Password';
		}, 2000);
	}).catch(() => {
		// Fallback for older browsers
		passwordField.select();
		document.execCommand('copy');
		showMessage('Password copied to clipboard!', 'success');
	});
}

function clearPassword() {
	document.getElementById('passwordField').value = '';
	document.getElementById('strengthText').textContent = 'Not Generated';
	document.getElementById('strengthText').style.color = '#718096';
	document.getElementById('strengthFill').style.width = '0%';
	showMessage('Password cleared!', 'success');
}

function showMessage(text, type) {
	const message = document.getElementById('message');
	message.textContent = text;
	message.className = `message ${type} show`;

	setTimeout(() => {
		message.classList.remove('show');
	}, 3000);
}

// Initialize on page load
window.onload = function() {
	loadUserPreferences();
	addPreferenceListeners();
	updateVisibilityIcon();
	generatePassword();
};
