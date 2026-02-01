// Main JavaScript for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initScrollAnimations();
    initHeartsAnimation();
    initMenuToggle();
    initCartToggle();
    initMediaCarousel();
    initStickyCTA();
    initToolbarScroll();
    initPurchaseButtons();
    initSmoothScrolling();
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For gifting section lines
                if (entry.target.classList.contains('gifting-line')) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
                
                // For gifting subtext
                if (entry.target.classList.contains('gifting-subtext')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 1000);
                }
                
                // For valentine section
                if (entry.target.classList.contains('valentine-label')) {
                    setTimeout(() => {
                        document.querySelector('.valentine-title').classList.add('visible');
                    }, 300);
                    
                    setTimeout(() => {
                        document.querySelector('.valentine-description').classList.add('visible');
                    }, 600);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .poetry-line, .gifting-line, .gifting-subtext, ' +
        '.media-item, .valentine-label, .valentine-title, .valentine-description'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Animated hearts background
function initHeartsAnimation() {
    const heartsContainer = document.getElementById('heartsContainer');
    const numberOfHearts = 15;
    
    // Create hearts
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random properties
        const size = Math.random() * 20 + 20; // 20-40px
        const posX = Math.random() * 100; // 0-100%
        const posY = Math.random() * 100; // 0-100%
        const rotation = Math.random() * 360; // 0-360deg
        const opacity = Math.random() * 0.1 + 0.05; // 0.05-0.15
        const animationDuration = Math.random() * 20 + 20; // 20-40s
        
        // Apply styles
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${posX}%`;
        heart.style.top = `${posY}%`;
        heart.style.opacity = opacity;
        heart.style.transform = `rotate(${rotation}deg)`;
        heart.style.animation = `float ${animationDuration}s infinite ease-in-out`;
        
        // Create CSS animation for floating
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(${rotation}deg); }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${rotation + 5}deg); }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${rotation}deg); }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${rotation - 5}deg); }
            }
        `;
        document.head.appendChild(style);
        
        heartsContainer.appendChild(heart);
        
        // Add mouse move interaction
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            heart.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
        });
    }
}

// Menu toggle functionality
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const floatingMenu = document.getElementById('floatingMenu');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    menuToggle.addEventListener('click', function() {
        floatingMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', function() {
        floatingMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        floatingMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            floatingMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Cart toggle functionality
function initCartToggle() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartPanel = document.getElementById('cartPanel');
    const overlay = document.querySelector('.overlay');
    
    cartToggle.addEventListener('click', function() {
        cartPanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        cartPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Media carousel for mobile
function initMediaCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Only initialize if carousel exists
    if (!carouselTrack) return;
    
    const mediaItems = [
        {
            image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'video'
        },
        {
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'image'
        },
        {
            image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'video'
        }
    ];
    
    // Create carousel slides
    mediaItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.style.backgroundImage = `url(${item.image})`;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
        carouselTrack.appendChild(slide);
    });
    
    let currentSlide = 0;
    const totalSlides = mediaItems.length;
    
    // Update carousel position
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    // Auto-rotate carousel
    let autoRotate = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Pause auto-rotate on hover
    const carousel = document.querySelector('.media-carousel');
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', function() {
        autoRotate = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
}

// Sticky CTA for mobile
function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    const purchaseSection = document.querySelector('.purchase-section');
    
    if (!purchaseSection || !stickyCta) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.classList.remove('visible');
            } else {
                stickyCta.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(purchaseSection);
}

// Toolbar scroll effect
function initToolbarScroll() {
    const toolbar = document.querySelector('.luxury-toolbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            toolbar.classList.add('scrolled');
        } else {
            toolbar.classList.remove('scrolled');
        }
    });
}

// Purchase buttons initialization
function initPurchaseButtons() {
    // Hero CTA
    const heroCta = document.getElementById('heroCta');
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            document.querySelector('.purchase-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Purchase section CTA
    const purchaseCta = document.getElementById('purchaseCta');
    if (purchaseCta) {
        purchaseCta.addEventListener('click', function() {
            const quantity = document.querySelector('.qty-value').textContent;
            openWhatsApp(quantity);
        });
    }
    
    // Mobile sticky CTA
    const mobileWhatsapp = document.getElementById('mobileWhatsapp');
    if (mobileWhatsapp) {
        mobileWhatsapp.addEventListener('click', function() {
            const quantity = document.querySelector('.qty-value').textContent;
            openWhatsApp(quantity);
        });
    }
    
    // Cart WhatsApp CTA
    const whatsappCheckout = document.getElementById('whatsappCheckout');
    if (whatsappCheckout) {
        whatsappCheckout.addEventListener('click', function() {
            const quantity = document.querySelector('.quantity').textContent;
            openWhatsApp(quantity);
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init calls
    initScrollProgress();
});


/* =====================================
   XO LUXURY SCROLL REVEAL ENGINE
===================================== */
document.addEventListener('DOMContentLoaded', () => {

    const revealItems = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.feature-card'),
        ...document.querySelectorAll('.xo-experience-title'),
        ...document.querySelectorAll('.xo-step'),
        ...document.querySelectorAll('.valentine-core')
    ];

    revealItems.forEach((el, i) => {
        el.classList.add('scroll-reveal');

        /* Depth staggering */
        if (i % 3 === 0) el.classList.add('depth-1');
        if (i % 3 === 1) el.classList.add('depth-2');
        if (i % 3 === 2) el.classList.add('depth-3');
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -80px 0px'
    });

    revealItems.forEach(el => observer.observe(el));
});




(() => {
  const section = document.querySelector('.love-editorial');
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('active');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();
