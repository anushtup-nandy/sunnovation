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

// Get the contact form element
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Basic form validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }

        // Send data to server
        fetch('http://localhost:5000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your message. Please try again later.');
        });
    });
}


// ----------------------------------------------------------------------
// Mobile Navigation Menu Toggle (Example)
// ----------------------------------------------------------------------

// Add this if you implement a mobile menu toggle button in your HTML

const navToggle = document.querySelector('.nav-toggle'); // Add a button with this class in your HTML
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); // Add/remove a class to show/hide the menu
    });
}


// ----------------------------------------------------------------------
// Blog Functionality
// ----------------------------------------------------------------------

const blogGrid = document.querySelector('.blog-grid');
const paginationContainer = document.querySelector('.pagination');
let currentPage = 1;
const postsPerPage = 6; // Adjust as needed

// Sample Blog Post Data (replace with your actual blog data)
const blogPosts = [
    {
        title: "The Future of Solar Energy: Trends to Watch in 2024",
        date: "2024-07-15",
        excerpt: "Explore the latest advancements in solar technology, including AI-powered optimization, new panel materials, and the integration of solar into smart homes.",
        imageUrl: "images/blog-future-solar.jpg",
        content: "...", // Full content of the blog post (HTML)
        link: "blog-post-1.html" // Link to the individual blog post page
    },
    {
        title: "Maximizing Your Solar ROI with Sunnovation",
        date: "2024-07-08",
        excerpt: "Learn how Sunnovation's innovative platform helps homeowners and businesses get the most out of their solar investments through intelligent analytics and optimization.",
        imageUrl: "images/blog-maximizing-roi.jpg",
        content: "...",
        link: "blog-post-2.html"
    },
    {
        title: "Sunnovation's AR Technology: A Game-Changer for Rooftop Solar",
        date: "2024-07-01",
        excerpt: "Discover how Sunnovation's cutting-edge augmented reality (AR) features simplify the process of designing and visualizing optimal solar panel layouts.",
        imageUrl: "images/blog-ar-technology.jpg",
        content: "...",
        link: "blog-post-3.html"
    },
    {
        title: "Solar Energy and Sustainability: Making a Positive Impact",
        date: "2024-06-24",
        excerpt: "Explore the environmental benefits of solar energy and how Sunnovation is contributing to a more sustainable future.",
        imageUrl: "images/blog-sustainability.jpg",
        content: "...",
        link: "blog-post-4.html"
    },
    {
        title: "Case Study: How Sunnovation Helped a Homeowner Save 30% on Energy Costs",
        date: "2024-06-17",
        excerpt: "Read a real-world example of how Sunnovation's platform helped a homeowner optimize their solar panel system and achieve significant cost savings.",
        imageUrl: "images/blog-case-study.jpg",
        content: "...",
        link: "blog-post-5.html"
    },
    {
        title: "The Importance of Accurate Energy Predictions in Solar",
        date: "2024-06-10",
        excerpt: "Learn why accurate energy production predictions are crucial for maximizing the value of solar and how Sunnovation's AI algorithms deliver reliable forecasts.",
        imageUrl: "images/blog-energy-predictions.jpg",
        content: "...",
        link: "blog-post-6.html"
    },
];

function displayBlogPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = blogPosts.slice(startIndex, endIndex);

    blogGrid.innerHTML = ''; // Clear previous posts

    currentPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="blog-post-image">
            <div class="blog-post-content">
                <span class="blog-post-date">${post.date}</span>
                <h3 class="blog-post-title">${post.title}</h3>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                <a href="${post.link}" class="blog-post-read-more">Read More</a>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });
}

function setupPagination() {
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // Previous button
    const prevButton = paginationContainer.querySelector('.prev');
    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayBlogPosts(currentPage);
            updatePagination();
        }
    });

    // Next button
    const nextButton = paginationContainer.querySelector('.next');
    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayBlogPosts(currentPage);
            updatePagination();
        }
    });

    // Numbered buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('a');
        pageButton.href = '#';
        pageButton.textContent = i;
        pageButton.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            displayBlogPosts(currentPage);
            updatePagination();
        });

        const listItem = document.createElement('li');
        listItem.appendChild(pageButton);
        paginationContainer.insertBefore(listItem, nextButton.parentNode); // Insert before the "Next" button
    }

    updatePagination();
}

function updatePagination() {
    const pageLinks = paginationContainer.querySelectorAll('li a:not(.prev):not(.next)');
    pageLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (currentPage > 1) {
        paginationContainer.querySelector('.prev').classList.remove('disabled');
    } else {
        paginationContainer.querySelector('.prev').classList.add('disabled');
    }

    if (currentPage < pageLinks.length) {
        paginationContainer.querySelector('.next').classList.remove('disabled');
    } else {
        paginationContainer.querySelector('.next').classList.add('disabled');
    }

    pageLinks[currentPage - 1].classList.add('active');
}

// Initialize blog functionality
if (blogGrid) {
    displayBlogPosts(currentPage);
    setupPagination();
}

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