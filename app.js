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
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
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
        
        // Basic validation
        if (name === "") {
            alert("Please enter your name");
            valid = false;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid email address");
            valid = false;
        }
        
        if (message === "") {
            alert("Please enter a message");
            valid = false;
        }
        
        // If form is valid, simulate a form submission success
        if (valid) {
            alert("Thank you for your message! We will get back to you shortly.");
            form.reset(); // Reset form fields
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
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
});
