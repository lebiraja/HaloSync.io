// Wait for the DOM to load before executing any code
document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjusted for sticky header height
                behavior: 'smooth'
            });

            // Close the mobile menu if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
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
        
        // If form is valid, simulate a form submission success
        if (valid) {
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
    
    // Scroll-triggered Animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .fade-in-left, .fade-in-right, .bounce-in');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
});
