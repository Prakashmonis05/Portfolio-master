// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initParticles();
    initAnimations();
    setupNavigation();
    setupContactForm();
    setupTypewriter();
});

// Particles background initialization
function initParticles() {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("particles.js not loaded. Please include the library.");

        // Fallback: Add script tag for particles.js if not already included
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
        script.onload = () => initParticles();
        document.head.appendChild(script);
    }
}

// Initialize animations for various elements
function initAnimations() {
    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');
    const badges = document.querySelectorAll('.badge');

    if (heroContent) heroContent.classList.add('animate-fade-in-left');
    if (heroImage) heroImage.classList.add('animate-fade-in-right');

    // Add delay to badges
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.classList.add('animate-pop');
        }, 500 + (index * 200));
    });

    // Add floating animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.classList.add('floating');
    }

    // Animate circle background
    const circleBg = document.querySelector('.circle-bg');
    if (circleBg) {
        circleBg.classList.add('pulse');
    }
}

// Set up navigation interactions
function setupNavigation() {
    // Handle mobile navigation
    const header = document.querySelector('header');
    const contactBtn = document.querySelector('.contact-btn');

    // Add scroll event for sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Create and add hamburger menu for mobile
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    header.insertBefore(hamburger, contactBtn);

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Handle nav links active state
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Set up contact form modal
function setupContactForm() {
    const contactBtn = document.querySelector('.contact-btn');

    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Create modal if it doesn't exist
        if (!document.querySelector('.contact-modal')) {
            const modal = document.createElement('div');
            modal.className = 'contact-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Contact Me</h2>
                    <form id="contact-form">
                        <div class="form-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Your Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);

            // Add event listeners for modal
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            // Close when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });

            // Form submission
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);

                // Show sending state
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';

                // Simulate form submission - replace with actual API call
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = 'Message Sent!';

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        modal.classList.remove('active');
                    }, 2000);
                }, 1500);
            });
        }

        // Show modal
        const modal = document.querySelector('.contact-modal');
        modal.classList.add('active');
    });
}

// Typewriter effect for the name-highlight
function setupTypewriter() {
    const nameElement = document.querySelector('.name-highlight');

    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < name.length) {
                nameElement.textContent += name.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);

                // Add blinking cursor for a bit then remove it
                nameElement.classList.add('typing-cursor');
                setTimeout(() => {
                    nameElement.classList.remove('typing-cursor');
                }, 3000);
            }
        }, 100);
    }
}

// Add scroll animations to reveal elements as they enter viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Portfolio button event listener
document.addEventListener('DOMContentLoaded', () => {
    const portfolioBtn = document.querySelector('.portfolio-btn');

    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'project.html';
        });
    }

    const hireBtn = document.querySelector('.hire-btn');

    if (hireBtn) {
        hireBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Trigger contact form
            document.querySelector('.contact-btn').click();
        });
    }

    // Observe elements for scroll animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});