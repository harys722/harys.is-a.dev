// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Table row toggle for pop-up
document.querySelectorAll('.server-row').forEach(row => {
    row.addEventListener('click', () => {
        const targetId = row.getAttribute('data-target');
        const popup = document.getElementById(targetId);
        const allPopups = document.querySelectorAll('.popup');
        
        // Close all other pop-ups
        allPopups.forEach(p => {
            if (p !== popup) {
                p.style.display = 'none';
            }
        });
        
        // Toggle the clicked pop-up
        if (popup.style.display === 'table-row') {
            popup.style.display = 'none';
        } else {
            popup.style.display = 'table-row';
        }
    });
});
