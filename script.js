document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;
    const navBar = document.querySelector('.nav-bar');
    const toggleButton = document.createElement('div');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = '☰'; // Hamburger icon

    document.querySelector('.header-content').appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        navBar.classList.toggle('show');
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'system');
                themeSelect.value = 'system';
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'system');
                themeSelect.value = 'system';
            }
        }
    }

    const savedTheme = localStorage.getItem('theme');
    let initialTheme = savedTheme || 'system';

    setTheme(initialTheme);
    themeSelect.value = initialTheme;

    themeSelect.addEventListener('change', function() {
        setTheme(this.value);
    });
});
