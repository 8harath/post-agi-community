document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Simulate discussion forum interactivity
    const threads = document.querySelectorAll('.thread');
    threads.forEach(thread => {
        thread.addEventListener('click', function() {
            alert('This is a placeholder for discussion interactivity.');
        });
    });

    // Form validation for the contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Form submitted successfully!');
        } else {
            alert('Please fill in all fields.');
        }
    });
});
