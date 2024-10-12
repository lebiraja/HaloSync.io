// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements for better performance
    const navLinks = document.querySelectorAll('nav ul li a');
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const form = document.querySelector('.contact-form');
    const animatedElements = document.querySelectorAll(
        '.features-section, .entertainment-section, .contact-section, .hero-content, .logo, .nav-links, .social-links a'
    );

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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
                hamburger.classList.remove('is-active');
            }
        });
    });

    // Hamburger Menu Toggle with Animation
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('is-active'); // Add animation class
    });

    // Form Validation with Enhanced User Feedback
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        let valid = true;
        const errorMessages = [];

        // Remove existing error messages
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        // Basic validation
        if (name === "") {
            errorMessages.push("Please enter your name.");
            showError(nameInput, "Name is required.");
            valid = false;
        }
        
        if (!validateEmail(email)) {
            errorMessages.push("Please enter a valid email address.");
            showError(emailInput, "Invalid email format.");
            valid = false;
        }
        
        if (message === "") {
            errorMessages.push("Please enter a message.");
            showError(messageInput, "Message cannot be empty.");
            valid = false;
        }
        
        // If form is valid, simulate a form submission success
        if (valid) {
            displaySuccessMessage("Thank you for your message! We will get back to you shortly.");
            form.reset(); // Reset form fields
        } else {
            displayErrorMessages(errorMessages);
        }
    });
    
    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to display error messages below input fields
    const showError = (inputElement, message) => {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        inputElement.classList.add('input-error');
        inputElement.parentElement.appendChild(error);

        // Trigger CSS transition for error
        setTimeout(() => {
            error.classList.add('visible');
        }, 10); // Slight delay to allow transition
    }

    // Function to display all error messages in an alert box
    const displayErrorMessages = (messages) => {
        // Alternatively, you can display these messages in a modal or a designated error section
        alert(messages.join("\n"));
    }

    // Function to display success message
    const displaySuccessMessage = (message) => {
        // Alternatively, you can display this message in a modal or a designated success section
        alert(message);
    }

    // Scroll-triggered Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Adjust as needed
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    // Keyboard Accessibility for Hamburger Menu
    hamburger.setAttribute('tabindex', '0');
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            hamburger.click();
        }
    });

    // Debounce function to limit the rate at which a function can fire.
    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Example: Animate elements on scroll with throttling
    window.addEventListener('scroll', debounce(() => {
        // Add any scroll-based animations here
        // For example, adding a class to the header on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
});
