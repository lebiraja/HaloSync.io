// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements for better performance
    const navLinks = document.querySelectorAll('nav ul li a');
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const form = document.querySelector('.contact-form');
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .fade-in-left, .fade-in-right, .bounce-in');
    
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
                // Animate hamburger to closed state
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

        // Trigger CSS animation for error
        error.classList.add('fade-in');
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

    // Additional JavaScript Animations

    // Animate Hamburger Menu Icon when toggled
    // CSS should define the 'is-active' class for the hamburger icon animations
    // Example CSS (to be added to your CSS file):
    /*
    .hamburger.is-active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.is-active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.is-active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    */

    // Animate Elements on Hover for Interactive Feedback
    // Example: Animate buttons with JavaScript for more control
    const buttons = document.querySelectorAll('.btn, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover-animate');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover-animate');
        });
    });

    // Function to handle continuous background animations or other dynamic effects
    // Example: Parallax effect for the hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        hero.style.backgroundPosition = `${50 + deltaX * 5}% ${50 + deltaY * 5}%`;
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
