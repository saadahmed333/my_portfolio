$(document).ready(function() {
    
    // Mobile Navigation Toggle
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    
    hamburger.on('click', function() {
        hamburger.toggleClass('active');
        navMenu.toggleClass('active');
    });
    
    // Close mobile menu when clicking on a link
    $('.nav-link').on('click', function() {
        hamburger.removeClass('active');
        navMenu.removeClass('active');
    });
    
    // Smooth scrolling for navigation links
    $('.nav-link, .btn').on('click', function(e) {
        const targetId = $(this).attr('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = $(targetId);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        }
    });
    
    // Navbar scroll effect
    $(window).on('scroll', function() {
        const navbar = $('.navbar');
        if ($(this).scrollTop() > 50) {
            navbar.css({
                'background': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.1)'
            });
        } else {
            navbar.css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.1)'
            });
        }
    });
    
    // Active navigation link highlighting
    $(window).on('scroll', function() {
        const sections = $('section');
        const navLinks = $('.nav-link');
        
        let current = '';
        sections.each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionHeight = $(this).outerHeight();
            
            if ($(window).scrollTop() >= sectionTop && 
                $(window).scrollTop() < sectionTop + sectionHeight) {
                current = $(this).attr('id');
            }
        });
        
        navLinks.each(function() {
            $(this).removeClass('active');
            if ($(this).attr('href') === '#' + current) {
                $(this).addClass('active');
            }
        });
    });
    
    // Skill bars animation
    function animateSkillBars() {
        $('.skill-bar').each(function() {
            const skillLevel = $(this).data('level');
            $(this).css('width', skillLevel);
        });
    }
    
    // Trigger skill bar animation when skills section is in view
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = $('#skills');
    if (skillsSection.length) {
        skillsObserver.observe(skillsSection[0]);
    }
    
    // Fade in animation for sections
    function animateOnScroll() {
        $('.fade-in-up').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    }
    
    // Add fade-in-up class to sections
    $('section').addClass('fade-in-up');
    
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Project card hover effects
    $('.project-card').on('mouseenter', function() {
        $(this).find('.project-placeholder').css({
            'transform': 'scale(1.1)',
            'transition': 'transform 0.3s ease'
        });
    }).on('mouseleave', function() {
        $(this).find('.project-placeholder').css({
            'transform': 'scale(1)'
        });
    });
    
    // Contact form validation and submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Basic validation
        let isValid = true;
        let errorMessage = '';
        
        if (name === '') {
            errorMessage = 'Please enter your name';
            isValid = false;
        } else if (email === '') {
            errorMessage = 'Please enter your email';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        } else if (subject === '') {
            errorMessage = 'Please enter a subject';
            isValid = false;
        } else if (message === '') {
            errorMessage = 'Please enter your message';
            isValid = false;
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.html('<span class="loading"></span> Sending...');
        submitBtn.prop('disabled', true);
        
        // Simulate form submission (replace with actual submission)
        setTimeout(function() {
            // Reset form
            $('#contactForm')[0].reset();
            
            // Reset button
            submitBtn.text(originalText);
            submitBtn.prop('disabled', false);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        $('.notification').remove();
        
        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <span class="notification-message">${message}</span>
                    <button class="notification-close">&times;</button>
                </div>
            </div>
        `);
        
        // Add notification styles if not already added
        if (!$('#notification-styles').length) {
            $('head').append(`
                <style id="notification-styles">
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 10000;
                        min-width: 300px;
                        max-width: 400px;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        animation: slideInRight 0.3s ease-out;
                    }
                    .notification-success {
                        background: #d4edda;
                        color: #155724;
                        border: 1px solid #c3e6cb;
                    }
                    .notification-error {
                        background: #f8d7da;
                        color: #721c24;
                        border: 1px solid #f5c6cb;
                    }
                    .notification-info {
                        background: #d1ecf1;
                        color: #0c5460;
                        border: 1px solid #bee5eb;
                    }
                    .notification-content {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .notification-close {
                        background: none;
                        border: none;
                        font-size: 20px;
                        cursor: pointer;
                        opacity: 0.5;
                        padding: 0;
                        margin-left: 10px;
                    }
                    .notification-close:hover {
                        opacity: 1;
                    }
                    @keyframes slideInRight {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    @keyframes slideOutRight {
                        from {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        to {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                    }
                </style>
            `);
        }
        
        // Add to body
        $('body').append(notification);
        
        // Handle close button
        notification.find('.notification-close').on('click', function() {
            notification.css('animation', 'slideOutRight 0.3s ease-out');
            setTimeout(function() {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            if (notification.length) {
                notification.css('animation', 'slideOutRight 0.3s ease-out');
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Scroll to top button
    const scrollTopBtn = $(`
        <button class="scroll-top" aria-label="Scroll to top">
            <i class="fas fa-arrow-up"></i>
        </button>
    `);
    
    $('body').append(scrollTopBtn);
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            scrollTopBtn.addClass('show');
        } else {
            scrollTopBtn.removeClass('show');
        }
    });
    
    scrollTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect when page loads
    const heroTitle = $('.hero-title');
    if (heroTitle.length) {
        const originalText = heroTitle.text();
        setTimeout(function() {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const heroSection = $('.hero');
        
        if (heroSection.length && scrolled < heroSection.outerHeight()) {
            heroSection.css('background-position', `center ${scrolled * 0.5}px`);
        }
    });
    
    // Form input focus effects
    $('.form-group input, .form-group textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Add floating labels effect
    $('.form-group input, .form-group textarea').each(function() {
        const input = $(this);
        const label = input.prev('label');
        
        if (input.val() !== '') {
            input.parent().addClass('focused');
        }
    });
    
    // Initialize tooltips for social links
    $('.social-link').each(function() {
        const $this = $(this);
        const ariaLabel = $this.attr('aria-label');
        
        if (ariaLabel) {
            $this.on('mouseenter', function() {
                const tooltip = $(`<div class="tooltip">${ariaLabel}</div>`);
                $('body').append(tooltip);
                
                const position = $this.offset();
                tooltip.css({
                    position: 'absolute',
                    top: position.top - 30,
                    left: position.left + ($this.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                    background: '#2c3e50',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 1000,
                    pointerEvents: 'none'
                });
            }).on('mouseleave', function() {
                $('.tooltip').remove();
            });
        }
    });
    
    // Add CSS for focused form inputs
    if (!$('#form-focus-styles').length) {
        $('head').append(`
            <style id="form-focus-styles">
                .form-group.focused input,
                .form-group.focused textarea {
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
                }
            </style>
        `);
    }
    
    // Console log for debugging
    console.log('Portfolio website loaded successfully!');
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    $(window).on('scroll', debounce(function() {
        // Scroll-based animations and effects
    }, 10));
    
});
