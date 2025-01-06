// script.js - Sunnovation Website JavaScript

// ----------------------------------------------------------------------
// Smooth Scrolling for Anchor Links
// ----------------------------------------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight; // Get height of header
            const elementPosition = targetElement.getBoundingClientRect().top; // Get element's top position
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate offset position, considering header height and scroll

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ----------------------------------------------------------------------
// Savings Calculator Functionality
// ----------------------------------------------------------------------

function showSavingsCalculator() {
    const calculator = document.getElementById("savings-calculator");
    calculator.style.display = calculator.style.display === "none" ? "block" : "none";
}

function calculateSavings() {
    const location = document.getElementById("location").value;
    const rooftopSize = parseFloat(document.getElementById("rooftop-size").value);

    // Basic input validation
    if (!location) {
        alert("Please enter a location.");
        return;
    }
    if (isNaN(rooftopSize) || rooftopSize <= 0) {
        alert("Please enter a valid rooftop size.");
        return;
    }

    // Placeholder for actual calculation logic (replace with your advanced algorithms)
    let baseSavings = 500; // Example base savings
    let sizeMultiplier = rooftopSize / 100; // Example multiplier based on size
    let locationMultiplier = 1; // Placeholder for location-based adjustment

    // Example logic to adjust savings based on location (replace with your data)
    if (location.toLowerCase().includes("california")) {
        locationMultiplier = 1.2; // 20% increase for California
    } else if (location.toLowerCase().includes("new york")) {
        locationMultiplier = 0.9; // 10% decrease for New York
    }

    let estimatedSavings = baseSavings * sizeMultiplier * locationMultiplier;

    const result = `Based on your inputs, your estimated annual savings could be around $${estimatedSavings.toFixed(2)}!`;
    document.getElementById("calculation-result").innerText = result;
}

// ----------------------------------------------------------------------
// Animate Impact Metrics on Page Load
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    animateMetrics();
});

function animateMetrics() {
    const metrics = {
        'energy-increase': { start: 0, end: 25, suffix: '%' },
        'cost-savings': { start: 0, end: 20, suffix: '%' },
        'carbon-offset': { start: 0, end: 4, suffix: ' tons' }
    };
    const duration = 2000; // Animation duration in milliseconds

    for (const metric in metrics) {
        animateNumber(metric, metrics[metric].start, metrics[metric].end, duration, metrics[metric].suffix);
    }
}

function animateNumber(id, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        document.getElementById(id).innerText = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ----------------------------------------------------------------------
// Lazy Loading for Images (Intersection Observer)
// ----------------------------------------------------------------------

const images = document.querySelectorAll('img[data-src]'); // Select images with a data-src attribute

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Replace src with the value from data-src
            img.removeAttribute('data-src'); // Remove data-src to prevent reloading
            observer.unobserve(img); // Stop observing the image
        }
    });
}, {
    rootMargin: '100px 0px' // Optional: Load images a bit before they enter the viewport
});

images.forEach(image => {
    imageObserver.observe(image);
});

// ----------------------------------------------------------------------
// Form Submission Handling (Example - Replace with your actual form handling)
// ----------------------------------------------------------------------

const contactForm = document.getElementById('contact-form');

if (contactForm) { // Check if the form exists on the current page
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data (replace with your actual form field IDs)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic form validation (add more as needed)
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Example AJAX call to send form data to server (replace with your actual API endpoint)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        fetch('/submit-form', { // Replace with your form submission endpoint
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful form submission
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset(); // Clear the form
                } else {
                    // Handle errors
                    alert('There was an error submitting your message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An unexpected error occurred. Please try again later.');
            });
    });
}

// ----------------------------------------------------------------------
// Mobile Navigation Menu Toggle (Example)
// ----------------------------------------------------------------------

// Add this if you implement a mobile menu toggle button in your HTML
/*
const navToggle = document.querySelector('.nav-toggle'); // Add a button with this class in your HTML
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); // Add/remove a class to show/hide the menu
    });
}
*/

// ----------------------------------------------------------------------
// Other Potential Enhancements (Add as needed)
// ----------------------------------------------------------------------

// Example: Dynamically Load Content (e.g., for a blog section)
// ...

// Example: Add a Scroll-to-Top Button
// ...

// Example: Implement Image Carousels/Sliders
// ...

// Example: Add Animations or Microinteractions
// ...