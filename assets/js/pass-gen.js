let isPasswordVisible = true;

function updateLength(value) {
	document.getElementById('lengthDisplay').textContent = value;
}

function togglePasswordVisibility() {
	const passwordField = document.getElementById('passwordField');
	const visibilityIcon = document.getElementById('visibilityIcon');

	isPasswordVisible = !isPasswordVisible;

	if (isPasswordVisible) {
		passwordField.style.filter = 'none';
		visibilityIcon.textContent = '👁️';
	} else {
		passwordField.style.filter = 'blur(4px)';
		visibilityIcon.textContent = '🙈';
	}
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

// Generate initial password
window.onload = function() {
	generatePassword();
};
