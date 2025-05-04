document.addEventListener('DOMContentLoaded', () => {

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const body = document.body;

    // --- Custom Cursor Logic REMOVED ---

    if (isTouchDevice) {
        body.classList.add('touch-device'); // Still useful for potential CSS overrides
    }


    // --- OTHER SCRIPTS (Mobile Nav, Footer Year, Animations) ---
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const navIcon = navToggle?.querySelector('i');

    if (navToggle && mobileNav && navIcon) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
            navIcon.classList.toggle('fa-bars');
            navIcon.classList.toggle('fa-times');
        });

         mobileNav.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            if (targetLink && mobileNav.contains(targetLink)) {
                 if (mobileNav.classList.contains('active')) {
                    navToggle.click();
                }
            }
        });
    }

    // Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // On-Load/Scroll Animations Trigger (Using Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-load');
    if (animatedElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold (0.1 means 10% visible)

        animatedElements.forEach(el => {
            el.style.opacity = '0'; // Ensure starts hidden
            el.style.animationPlayState = 'paused'; // Wait for observer
            observer.observe(el);
        });
    } else {
         // Fallback for very old browsers
        setTimeout(() => {
             animatedElements.forEach(el => {
                  el.style.opacity = '1';
                  el.style.animationPlayState = 'running';
             });
        }, 100);
    }
     // --- END OTHER SCRIPTS ---

}); // End DOMContentLoaded
