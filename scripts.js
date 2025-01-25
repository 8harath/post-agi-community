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

    // Implement the 3D network animation and interactions using WebGL/Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-network').appendChild(renderer.domElement);

    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 100; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        nodes.push(node);
        scene.add(node);
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        nodes.forEach(node => {
            node.position.x += Math.random() * 0.01 - 0.005;
            node.position.y += Math.random() * 0.01 - 0.005;
            node.position.z += Math.random() * 0.01 - 0.005;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Nodes react to cursor movement
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        nodes.forEach(node => {
            node.position.x += mouseX * 0.05;
            node.position.y += mouseY * 0.05;
        });
    });

    // Nodes morph into symbols when hovered
    nodes.forEach(node => {
        node.on('mouseover', () => {
            node.material.color.set(0xff0000);
            // Add logic to morph into symbols (e.g., tree roots, neurons, fractals)
        });

        node.on('mouseout', () => {
            node.material.color.set(0x00ff00);
            // Add logic to revert to original form
        });
    });
});
