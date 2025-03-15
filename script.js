document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const navBar = document.querySelector('.nav-bar');
    const toggleButton = document.createElement('div');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = '☰';

    document.querySelector('.header-content').appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        navBar.classList.toggle('show');
    });

    const themeToggle = document.getElementById('theme-toggle');

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
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'system');
            }
        }
        updateActiveThemeIcon();
    }

    function updateActiveThemeIcon() {
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'system' : 'light');
        themeToggle.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('active');
            if (icon.dataset.theme === currentTheme) {
                icon.classList.add('active');
            } else if (currentTheme === 'system' && icon.dataset.theme === (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) {
                icon.classList.add('active');
            }
        });
    }

    themeToggle.addEventListener('click', function(event) {
        if (event.target.tagName === 'I') {
            const theme = event.target.dataset.theme;
            setTheme(theme);
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
});
