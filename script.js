document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initScrollReveal();
    initNavbarHighlight();
    initContactForm();
    initMobileMenu();
});

/* 1. Typing Effect */
function initTypingEffect() {
    const target = document.getElementById('typing-text');
    if (!target) return;
    
    const words = ["UX/UI Designer", "Full Stack Developer"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIndex--);
        } else {
            target.textContent = currentWord.substring(0, charIndex++);
        }
        
        let speed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

/* 2. Scroll Reveal */
function initScrollReveal() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    elementsToReveal.forEach((el) => observer.observe(el));
}

/* 3. Navbar Highlight */
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Debounce scroll event slightly for performance
    let isScrolling;
    
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Highlight when section is halfway up the viewport
                if (scrollY >= (sectionTop - 250)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-primary');
                link.classList.add('text-gray-400');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('text-primary');
                    link.classList.remove('text-gray-400');
                }
            });
        }, 50);
    });
}

/* 4. Contact Form Validation */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const toggleError = (element, showError) => {
        if (showError) {
            element.classList.remove('border-gray-700', 'focus:ring-primary');
            element.classList.add('border-red-500', 'focus:ring-red-500');
        } else {
            element.classList.remove('border-red-500', 'focus:ring-red-500');
            element.classList.add('border-gray-700', 'focus:ring-primary');
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (firstName.value.trim() === "") { toggleError(firstName, true); isValid = false; } else { toggleError(firstName, false); }
        if (lastName.value.trim() === "") { toggleError(lastName, true); isValid = false; } else { toggleError(lastName, false); }
        
        const emailValue = email.value.trim().toLowerCase();
        if (emailValue === "" || !emailValue.endsWith('@gmail.com')) { toggleError(email, true); isValid = false; } else { toggleError(email, false); }
        
        if (message.value.trim() === "") { toggleError(message, true); isValid = false; } else { toggleError(message, false); }

        if (isValid) {
            alert("Success! Message sent.");
            form.reset();
        }
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() { toggleError(this, false); });
    });
}

/* 5. Mobile Menu Logic with Animation and Scroll Lock */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const icon = document.getElementById('menu-icon');
    const links = document.querySelectorAll('.mobile-link');
    const body = document.body;
    let isOpen = false;

    if (!btn || !menu || !overlay) return;

    function toggleMenu() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Open Menu
            menu.classList.remove('hidden'); // Ensure it's in the DOM
            overlay.classList.remove('hidden');
            body.classList.add('overflow-hidden'); // Lock scroll
            
            // Animation Timeout to allow transition to happen
            setTimeout(() => {
                menu.classList.remove('-translate-y-full', 'opacity-0', '-z-10', 'pointer-events-none');
                menu.classList.add('translate-y-0', 'opacity-100', 'z-40', 'pointer-events-auto');
                overlay.classList.remove('opacity-0');
            }, 10);

            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            // Close Menu
            menu.classList.remove('translate-y-0', 'opacity-100', 'z-40', 'pointer-events-auto');
            menu.classList.add('-translate-y-full', 'opacity-0', '-z-10', 'pointer-events-none');
            overlay.classList.add('opacity-0');
            body.classList.remove('overflow-hidden'); // Unlock scroll

            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            // Wait for transition to finish before hiding overlay completely
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) toggleMenu();
        });
    });

    // Close when clicking overlay
    overlay.addEventListener('click', () => {
        if (isOpen) toggleMenu();
    });
    
    // Close on window resize if crossing breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) {
            toggleMenu();
        }
    });
}

/* 4. Contact Form Validation & Web3Forms Submission */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const toggleError = (element, showError) => {
        if (showError) {
            element.classList.remove('border-gray-700', 'focus:ring-primary');
            element.classList.add('border-red-500', 'focus:ring-red-500');
        } else {
            element.classList.remove('border-red-500', 'focus:ring-red-500');
            element.classList.add('border-gray-700', 'focus:ring-primary');
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // --- Client Side Validation ---
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (firstName.value.trim() === "") { toggleError(firstName, true); isValid = false; } else { toggleError(firstName, false); }
        if (lastName.value.trim() === "") { toggleError(lastName, true); isValid = false; } else { toggleError(lastName, false); }
        
        const emailValue = email.value.trim().toLowerCase();
        // Check for empty or if it doesn't end with gmail.com (based on your placeholder requirement)
        if (emailValue === "" || !emailValue.endsWith('@gmail.com')) { toggleError(email, true); isValid = false; } else { toggleError(email, false); }
        
        if (message.value.trim() === "") { toggleError(message, true); isValid = false; } else { toggleError(message, false); }

        // --- Web3Forms Submission Logic ---
        if (isValid) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                    // Reset borders after clear
                    [firstName, lastName, email, message].forEach(el => toggleError(el, false));
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error(error);
                alert("Something went wrong. Please check your internet connection and try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() { toggleError(this, false); });
    });
}