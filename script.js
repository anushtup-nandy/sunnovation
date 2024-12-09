// Placeholder for interactivity - you'll add more functionality here
// For example, handling form submissions, animations, etc.

console.log("Sunnovation website script loaded!");

// Example: Add a smooth scroll effect to anchor links (requires more JS libraries usually)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function showSavingsCalculator() {
    var calculator = document.getElementById("savings-calculator");
    if (calculator.style.display === "none") {
        calculator.style.display = "block";
    } else {
        calculator.style.display = "none";
    }
}

function calculateSavings() {
    var location = document.getElementById("location").value;
    var rooftopSize = document.getElementById("rooftop-size").value;
    // Placeholder for actual calculation logic
    var result = "Based on your inputs, you could save significantly!";
    document.getElementById("calculation-result").innerText = result;
}
document.addEventListener('DOMContentLoaded', function() {
    animateMetrics();
});

function animateMetrics() {
    const metrics = {
        'energy-increase': { start: 0, end: 25 },
        'cost-savings': { start: 0, end: 20 },
        'carbon-offset': { start: 0, end: 4 }
    };

    const duration = 2000; // Duration in milliseconds

    for (const metric in metrics) {
        animateNumber(metric, metrics[metric].start, metrics[metric].end, duration);
    }
}

function animateNumber(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        document.getElementById(id).innerText = Math.floor(progress * (end - start) + start) + (id === 'carbon-offset' ? ' tons' : '%');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}