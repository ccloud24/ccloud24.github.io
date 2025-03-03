// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const element = document.querySelector(this.getAttribute('href'));
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Enhanced form submission with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]')?.value;
        const email = contactForm.querySelector('input[name="email"]')?.value;
        const message = contactForm.querySelector('textarea[name="message"]')?.value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Scroll reveal animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// Dynamic navigation background (updated for dark theme)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 27, 38, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(26, 27, 38, 0.8)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    }
});

// Typing animation
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        typeWriter(subtitle, "Computer Engineering | Developer | Tech Enthusiast");
    }
});

// Skills animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('skill-animate');
        }
    });
}, observerOptions);

// Initialize animations after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Skills animation
    const skillItems = document.querySelectorAll('.skill-category');
    skillItems.forEach(item => observer.observe(item));
    
    // Add smooth scroll for Safari
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.id = 'progressBar';
document.body.prepend(progressBar);

window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
};