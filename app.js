// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjusted for sticky header height
                    behavior: 'smooth'
                });
            }

            // Close the mobile menu if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Hamburger Menu Toggle with Accessibility
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    // Enable hamburger menu toggle with Enter key
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            hamburger.click();
        }
    });

    // Form Validation
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        let valid = true;
        let errorMessages = [];

        // Basic validation
        if (name === "") {
            errorMessages.push("Please enter your name.");
            valid = false;
        }

        if (!validateEmail(email)) {
            errorMessages.push("Please enter a valid email address.");
            valid = false;
        }

        if (message === "") {
            errorMessages.push("Please enter a message.");
            valid = false;
        }

        // Display errors or success message
        if (valid) {
            // Simulate form submission (replace with actual submission logic)
            alert("Thank you for your message! We will get back to you shortly.");
            form.reset(); // Reset form fields
        } else {
            alert(errorMessages.join("\n"));
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Scroll-triggered Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .fade-in-left, .fade-in-right, .bounce-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
});
