// --- START OF FILE main.js ---

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

    console.log('Mobile nav elements:', {
        navToggle: navToggle,
        mobileNav: mobileNav,
        navIcon: navIcon
    });

    // Function to close the mobile menu
    function closeMobileMenu() {
        if (mobileNav && mobileNav.classList.contains('active')) { // Check if it's actually open
            navToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            if (navIcon) {
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
            }
             console.log('Mobile menu closed');
        }
    }

     // Function to open the mobile menu
    function openMobileMenu() {
        navToggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('active');
        if (navIcon) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        }
        console.log('Mobile menu opened');
    }


    if (navToggle && mobileNav && navIcon) {
         console.log('Mobile nav elements found, adding listeners');

        // Listener for the toggle button itself
        navToggle.addEventListener('click', (e) => {
            // e.stopPropagation(); // Optional: Prevent this click bubbling up to the document listener immediately
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Listener for clicks on links *within* the mobile nav
        mobileNav.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            // If a link inside the nav is clicked, close the menu
            if (targetLink && mobileNav.contains(targetLink)) {
                 closeMobileMenu();
            }
        });

        // <<<< NEW: Listener for clicks anywhere on the document >>>>
        document.addEventListener('click', (event) => {
            const isMenuOpen = mobileNav.classList.contains('active');

            // Check if the menu is open AND if the click target is NOT the toggle button itself
            // AND if the click target is NOT inside the mobile navigation menu.
            // We use .contains() to check if the click happened within these elements or on the element itself.
            if (isMenuOpen && !navToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                console.log('Clicked outside menu/toggle, closing...'); // For debugging
                closeMobileMenu();
            }
        });

    } else {
        console.error('Crucial mobile navigation elements not found!');
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
                    // Ensure opacity is set to 1 when animation runs
                    entry.target.style.opacity = '1';
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
// --- END OF FILE main.js ---
