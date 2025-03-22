
// Animation on scroll
document.addEventListener('DOMContentLoaded', function () {
    // Initial animation of visible elements
    animateVisibleElements();

    // Animate skill bars
    setTimeout(animateSkillBars, 500);

    // Animate on scroll
    window.addEventListener('scroll', function () {
        animateVisibleElements();
    });

    function animateVisibleElements() {
        const elements = document.querySelectorAll('.animate');

        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }

    function animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width') + '%';
            bar.style.width = width;
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
});

// Contact button functionality
document.querySelector('.contact-btn').addEventListener('click', function () {
    window.location.href = 'contact.html';
});
