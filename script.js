const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('nav ul li');

sections.forEach((section, index) => {
    section.addEventListener('scroll', () => {
        const scrollPosition = section.getBoundingClientRect().top + window.innerHeight / 2;
        const activeSectionId = ['features', 'commands', 'support'].find(id => section.id === id);
        if (scrollPosition > 0 && scrollPosition < window.innerHeight * 2) {
            menuItems.forEach(item => {
                if (item.querySelector('a').href.includes(activeSectionId)) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
});