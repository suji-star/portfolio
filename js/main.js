// Language Toggle
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');

// Initialize all content from config
function initializeContent() {
    // Set page title
    document.title = config.site.title;
    
    // Set logo text
    document.getElementById('logo-text').textContent = config.site.logo[currentLang];
    
    // Set navigation links
    document.getElementById('nav-home').textContent = config.navigation.home[currentLang];
    document.getElementById('nav-about').textContent = config.navigation.about[currentLang];
    document.getElementById('nav-services').textContent = config.navigation.services[currentLang];
    document.getElementById('nav-team').textContent = config.navigation.team[currentLang];
    document.getElementById('nav-achievements').textContent = config.navigation.achievements[currentLang];
    document.getElementById('nav-contact').textContent = config.navigation.contact[currentLang];
    
    // Set hero section
    document.getElementById('hero-title').textContent = config.hero.title[currentLang];
    document.getElementById('hero-subtitle').textContent = config.hero.subtitle[currentLang];
    document.getElementById('hero-description').textContent = config.hero.description[currentLang];
    
    // Set section titles
    document.getElementById('services-title').textContent = config.services.title[currentLang];
    document.getElementById('team-title').textContent = config.team.title[currentLang];
    document.getElementById('achievements-title').textContent = config.achievements.title[currentLang];
    document.getElementById('contact-title').textContent = config.contact.title[currentLang];
    
    // Set contact information
    document.getElementById('office-address').textContent = config.contact.info.address[currentLang];
    document.getElementById('contact-phone').textContent = config.contact.info.phone[currentLang];
    document.getElementById('contact-email').textContent = config.contact.info.email[currentLang];
    
    // Set contact form placeholders
    document.getElementById('name-input').placeholder = config.contact.form.name[currentLang];
    document.getElementById('email-input').placeholder = config.contact.form.email[currentLang];
    document.getElementById('message-input').placeholder = config.contact.form.message[currentLang];
    document.getElementById('submit-button').textContent = config.contact.form.button[currentLang];
    
    // Set footer
    document.getElementById('footer-copyright').textContent = config.footer.copyright[currentLang];
    
    // Render services
    renderServices();
    
    // Render team members
    renderTeamMembers();
    
    // Render achievements
    renderAchievements();
}

// Render services
function renderServices() {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';
    
    config.services.items.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <i class="${service.icon}"></i>
            <h3>${service.title[currentLang]}</h3>
            <p>${service.description[currentLang]}</p>
            <a href="#contact" class="service-btn">${service.button[currentLang]}</a>
        `;
        
        servicesContainer.appendChild(serviceCard);
    });
}

// Render team members
function renderTeamMembers() {
    const teamContainer = document.querySelector('.team-container');
    teamContainer.innerHTML = '';
    
    config.team.members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = `team-member ${member.isBrand ? 'brand' : ''}`;
        
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name[currentLang]}">
            <h3>${member.name[currentLang]}</h3>
            <p class="position">${member.position[currentLang]}</p>
            <p>${member.description[currentLang]}</p>
        `;
        
        teamContainer.appendChild(memberElement);
    });
}

// Render achievements
function renderAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = '';
    
    config.achievements.slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `achievement-slide ${index === 0 ? 'active' : ''}`;
        
        slideElement.innerHTML = `
            <div class="achievement-image">
                <img src="${slide.image}" alt="${slide.title[currentLang]}">
            </div>
            <div class="achievement-content">
                <div class="achievement-icon">${slide.icon}</div>
                <h3 class="achievement-title">${slide.title[currentLang]}</h3>
                <p class="achievement-description">${slide.description[currentLang]}</p>
            </div>
        `;
        
        achievementsContainer.appendChild(slideElement);
    });
    
    // Initialize slider after rendering slides
    initializeSlider();
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    langToggle.querySelector('.lang-text').textContent = currentLang === 'en' ? 'தமிழ்' : 'English';
    
    // Reinitialize all content with the new language
    initializeContent();
}

// Achievement Slider
let currentSlide = 0;
let slides = [];
let prevBtn = document.querySelector('.prev-btn');
let nextBtn = document.querySelector('.next-btn');

function initializeSlider() {
    slides = document.querySelectorAll('.achievement-slide');
    
    if (slides.length > 0) {
        // Set initial position
        updateSliderPosition();
        
        // Auto-rotate slides
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-rotation on hover
        const slider = document.querySelector('.achievements-slider');
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Button controls
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

function updateSliderPosition() {
    const container = document.querySelector('.achievements-container');
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active class
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateSliderPosition();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = config.contact.form.success[currentLang];
    document.body.appendChild(successMessage);
    
    // Reset form
    this.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize content
    initializeContent();
    
    // Add language toggle event listener
    langToggle.addEventListener('click', toggleLanguage);
    
    // Initialize slider
    initializeSlider();
}); 