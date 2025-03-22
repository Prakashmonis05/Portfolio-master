// Animation on scroll
document.addEventListener('DOMContentLoaded', function () {
    // Flags to track animation states
    let skillsAnimated = false;
    
    // Initial animation of visible elements
    animateVisibleElements();

    // Set initial progress bar width to 0
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });

    // Animate skill bars
    setTimeout(animateSkillBars, 500);

    // Animate on scroll
    window.addEventListener('scroll', function () {
        animateVisibleElements();
        
        // Only check skill bars if they haven't been fully animated
        if (!skillsAnimated) {
            checkAndAnimateSkillBars();
        }
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
        let allAnimated = true;

        progressBars.forEach(bar => {
            if (isElementInViewport(bar.parentElement.parentElement.parentElement)) {
                const width = bar.getAttribute('data-width') + '%';
                bar.style.width = width;
                
                // Animate percentage counter
                try {
                    const skillNameDiv = bar.parentElement.previousElementSibling;
                    if (skillNameDiv && skillNameDiv.classList.contains('skill-name')) {
                        const percentElement = skillNameDiv.querySelector('span:last-child');
                        if (percentElement) {
                            const targetPercent = parseInt(bar.getAttribute('data-width'));
                            animateCounter(percentElement, targetPercent);
                        }
                    }
                } catch (error) {
                    console.log('Error animating counter:', error);
                }
            } else {
                allAnimated = false;
            }
        });
        
        // If all bars are animated, set the flag
        if (allAnimated && progressBars.length > 0) {
            skillsAnimated = true;
        }
    }

    function checkAndAnimateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        let allAnimated = true;
        
        progressBars.forEach(bar => {
            if (isElementInViewport(bar.parentElement.parentElement.parentElement) && 
                bar.style.width === '0%') {
                const width = bar.getAttribute('data-width') + '%';
                
                // Animate with delay for cascading effect
                const index = Array.from(progressBars).indexOf(bar);
                setTimeout(() => {
                    bar.style.width = width;
                    
                    // Animate percentage counter
                    try {
                        const skillNameDiv = bar.parentElement.previousElementSibling;
                        if (skillNameDiv && skillNameDiv.classList.contains('skill-name')) {
                            const percentElement = skillNameDiv.querySelector('span:last-child');
                            if (percentElement) {
                                const targetPercent = parseInt(bar.getAttribute('data-width'));
                                animateCounter(percentElement, targetPercent);
                            }
                        }
                    } catch (error) {
                        console.log('Error animating counter:', error);
                    }
                }, index * 100);
            } else if (bar.style.width === '0%') {
                allAnimated = false;
            }
        });
        
        // If all bars are animated, set the flag
        if (allAnimated && progressBars.length > 0) {
            skillsAnimated = true;
        }
    }

    function animateCounter(element, target) {
        if (!element) return;
        
        // Save original text
        const originalText = element.textContent;
        
        // Reset to zero
        element.textContent = '0%';
        
        // Counter animation
        let current = 0;
        const increment = target / 50; // Adjust for speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = originalText;
            } else {
                element.textContent = Math.round(current) + '%';
            }
        }, 30);
    }

    function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
});
