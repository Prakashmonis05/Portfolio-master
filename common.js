// Common JS functionality for all pages
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing navigation...');
    // Initialize navigation
    setupNavigation();
});

// Set up navigation interactions consistently across all pages
function setupNavigation() {
    const header = document.querySelector('header');
    const contactBtn = document.querySelector('.contact-btn');
    const nav = document.querySelector('nav');
    
    console.log('Navigation setup: header found:', !!header, 'nav found:', !!nav);
    
    // Add scroll event for sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Find or create hamburger menu
    let hamburger = document.querySelector('.hamburger');
    console.log('Hamburger found in DOM:', !!hamburger);
    
    // If hamburger doesn't exist in the DOM, create it
    if (!hamburger) {
        console.log('Creating hamburger menu dynamically');
        hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert the hamburger before the contact button or append to header
        if (contactBtn) {
            header.insertBefore(hamburger, contactBtn);
        } else {
            header.appendChild(hamburger);
        }
    }
    
    // Ensure the nav element exists before setting up the toggle
    if (nav) {
        // Add click event to hamburger for toggling navigation
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('Hamburger clicked, nav active:', nav.classList.contains('active'));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    } else {
        console.error('Navigation element not found!');
    }

    // Fix the contact button functionality across all pages
    if (contactBtn) {
        // First check if we're already on the contact page
        const isContactPage = window.location.pathname.includes('contact.html');
        
        // If it's the contact page, make sure the button has the active class
        if (isContactPage) {
            contactBtn.classList.add('active');
            // Remove href to prevent navigation
            contactBtn.removeAttribute('href');
        } else {
            // Make sure regular pages have the href attribute
            if (!contactBtn.hasAttribute('href')) {
                contactBtn.setAttribute('href', 'contact.html');
            }
            
            // Add click event listener to ensure it works 
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default for consistent behavior
                window.location.href = 'contact.html';
            });
        }
    }
    
    // Highlight active page in mobile navigation
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPagePath.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }
    });
} 