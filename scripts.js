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

    // User authentication logic for the login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                // Store the JWT token in local storage
                localStorage.setItem('token', data.token);
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Fetch and display real-time discussions from the backend
    async function fetchDiscussions() {
        try {
            const response = await fetch('/api/threads');
            if (response.ok) {
                const threads = await response.json();
                const forumSection = document.getElementById('forum');
                forumSection.innerHTML = '<h2>Discussion Forum</h2>';
                threads.forEach(thread => {
                    const threadDiv = document.createElement('div');
                    threadDiv.classList.add('thread');
                    threadDiv.innerHTML = `
                        <h3>${thread.title}</h3>
                        <p>${thread.content}</p>
                    `;
                    forumSection.appendChild(threadDiv);
                });
            } else {
                alert('Failed to fetch discussions.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching discussions.');
        }
    }

    fetchDiscussions();

    // Add functionality to dynamically load more resources in the resources section
    const resourcesSection = document.getElementById('resources');
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More Resources';
    resourcesSection.appendChild(loadMoreButton);

    loadMoreButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/resources');
            if (response.ok) {
                const resources = await response.json();
                const resourcesList = resourcesSection.querySelector('ul');
                resources.forEach(resource => {
                    const resourceItem = document.createElement('li');
                    resourceItem.innerHTML = `<a href="${resource.url}">${resource.title}</a>`;
                    resourcesList.appendChild(resourceItem);
                });
            } else {
                alert('Failed to load more resources.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while loading more resources.');
        }
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
