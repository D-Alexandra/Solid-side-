/**
 * ========================================
 * SOLID SIDE - ADVOKÁTSKA KANCELÁRIA
 * JavaScript
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFadeAnimations();
    initAccordion();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initNewsCarousel();
});

/**
 * Navigácia - sticky header + mobile menu
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Sticky header
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Zatvorenie menu po kliknutí na odkaz
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

/**
 * Fade animácie pri scrollovaní
 */
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Accordion pre služby
 */
function initAccordion() {
    const categories = document.querySelectorAll('.accordion-category');

    if (categories.length === 0) return;

    categories.forEach(category => {
        const categoryHeader = category.querySelector('.accordion-category__header');
        const serviceItems = category.querySelectorAll('.service-item');

        categoryHeader.addEventListener('click', function() {
            const isActive = category.classList.contains('active');

            // Close all categories and their service items
            categories.forEach(cat => {
                cat.classList.remove('active');
                cat.querySelectorAll('.service-item').forEach(item => {
                    item.classList.remove('active');
                });
            });

            // Open this category if it wasn't active
            if (!isActive) {
                category.classList.add('active');
            }
        });

        serviceItems.forEach(serviceItem => {
            const serviceHeader = serviceItem.querySelector('.service-item__header');

            serviceHeader.addEventListener('click', function(e) {
                e.stopPropagation();

                const isActive = serviceItem.classList.contains('active');

                // Close all service items in this category
                serviceItems.forEach(item => {
                    item.classList.remove('active');
                });

                // Open this service item if it wasn't active
                if (!isActive) {
                    serviceItem.classList.add('active');
                }
            });
        });
    });
}

/**
 * Kontaktný formulár - validácia
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Prosím, zadajte vaše meno.'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Prosím, zadajte platnú e-mailovú adresu.'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Prosím, napíšte správu.'
        },
        gdpr: {
            validate: (value) => value === true,
            message: 'Musíte súhlasiť so spracovaním osobných údajov.'
        }
    };
    
    function validateField(field) {
        const fieldName = field.name;
        const value = field.type === 'checkbox' ? field.checked : field.value;
        const validator = validators[fieldName];
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (validator) {
            const isValid = validator.validate(value);
            
            if (!isValid) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = validator.message;
                return false;
            } else {
                field.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
                return true;
            }
        }
        return true;
    }
    
    // Validácia pri odchode z poľa
    const formFields = form.querySelectorAll('.form__input, .form__checkbox');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Odoslanie formulára
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            const formData = new FormData(form);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            const successMessage = document.getElementById('form-success');
            if (successMessage) {
                successMessage.classList.add('visible');
            }
            
            form.reset();
            
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('visible');
                }
            }, 5000);
        }
    });
}

/**
 * Tlačidlo späť hore
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Aktuálny rok v copyright
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * News Carousel - Swiper.js
 */
function initNewsCarousel() {
    const newsSwiper = document.querySelector('.news-swiper');
    if (!newsSwiper) return;
    
    // Check if Swiper is loaded
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper.js not loaded');
        return;
    }
    
    const swiper = new Swiper('.news-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        grabCursor: true,
        
        // Pagination
        pagination: {
            el: '.news-swiper-pagination',
            clickable: true,
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.news-carousel__btn--next',
            prevEl: '.news-carousel__btn--prev',
        },
        
        // Responsive breakpoints
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
        },
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Predchádzajúci článok',
            nextSlideMessage: 'Nasledujúci článok',
        },
    });
}
