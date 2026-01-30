// Enhanced animations for luxury experience

document.addEventListener('DOMContentLoaded', function() {
    initProductImageAnimation();
    initFeatureCardHover();
    initMediaHoverEffects();
    initButtonMicroInteractions();
    initScrollReveals();
    initTextRevealAnimations();
    initParallaxEffects();
    initLuxuryReveals();
    initFloatingElements();
    initTextFlowAnimations();
    initSectionTransitions();
    initGlowEffects();
    initMorphingShapes();
    initKineticTypography();
});

// Luxury reveals with cascading effects
function initLuxuryReveals() {
    // Create intersection observer for luxury reveals
    const luxuryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add luxury reveal class
                entry.target.classList.add('luxury-revealed');
                
                // Special animations for specific sections
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                
                if (entry.target.classList.contains('cards-slider')) {
                    animateCardsSlider(entry.target);
                }
                
                if (entry.target.classList.contains('media-grid')) {
                    animateMediaGrid(entry.target);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    // Observe luxury elements
    const luxuryElements = document.querySelectorAll(
        '.features-grid, .essence-visual, .cards-slider, .media-grid, .purchase-content'
    );
    
    luxuryElements.forEach(element => {
        element.style.opacity = '0';
        luxuryObserver.observe(element);
    });
}

// Animate feature cards with staggered entrance
function animateFeatureCards(grid) {
    const cards = grid.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        card.style.transform = 'translateY(50px) rotateX(15deg)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.opacity = '1';
            
            // Add subtle glow on reveal
            card.style.boxShadow = '0 20px 40px rgba(122, 28, 63, 0.15)';
            
            setTimeout(() => {
                card.style.boxShadow = 'var(--shadow-soft)';
            }, 800);
            
        }, index * 200);
    });
}

// Animate cards slider with floating effect
function animateCardsSlider(slider) {
    const cards = slider.querySelectorAll('.card-item');
    
    cards.forEach((card, index) => {
        card.style.transform = 'scale(0.8) translateY(100px)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
            
            let transform = '';
            if (index === 0) {
                transform = 'rotate(-5deg)';
            } else if (index === 1) {
                transform = 'translate(-50%, -50%) rotate(2deg) scale(1)';
            } else {
                transform = 'rotate(5deg)';
            }
            
            card.style.transform = transform;
            card.style.opacity = '1';
            
            // Add floating animation
            card.style.animation = `floatCard 3s ease-in-out ${index * 0.2}s infinite alternate`;
            
            // Create floating animation
            const style = document.createElement('style');
            if (!document.querySelector('#float-animation')) {
                style.id = 'float-animation';
                style.textContent = `
                    @keyframes floatCard {
                        0% {
                            transform: ${index === 1 ? 'translate(-50%, -50%) rotate(2deg) translateY(0)' : 'translateY(0)'};
                        }
                        100% {
                            transform: ${index === 1 ? 'translate(-50%, -50%) rotate(2deg) translateY(-10px)' : 'translateY(-10px)'};
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
        }, index * 300);
    });
}

// Animate media grid with staggered zoom
function animateMediaGrid(grid) {
    const items = grid.querySelectorAll('.media-item');
    
    items.forEach((item, index) => {
        item.style.transform = 'scale(0.7) rotateY(20deg)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            item.style.transform = 'scale(1) rotateY(0deg)';
            item.style.opacity = '1';
            
            // Add hover transform
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotateY(0deg)';
                this.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotateY(0deg)';
                this.style.zIndex = '1';
            });
            
        }, index * 200);
    });
}

// Add floating decorative elements
function initFloatingElements() {
    // Create floating particles in background
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    floatingContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(floatingContainer);
    
    // Create floating shapes
    const shapes = ['❤', '✦', '❖', '◈', '♡', '✧'];
    const colors = [
        'rgba(122, 28, 63, 0.05)',
        'rgba(212, 197, 162, 0.07)',
        'rgba(122, 28, 63, 0.03)',
        'rgba(212, 197, 162, 0.05)'
    ];
    
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random properties
        const size = Math.random() * 30 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.1 + 0.03;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create heart shape or symbol
        if (Math.random() > 0.5) {
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                background: ${color};
                clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 50% 75%, 20% 100%, 0% 35%);
                opacity: ${opacity};
                animation: floatShape ${duration}s ease-in-out ${delay}s infinite alternate;
                filter: blur(0.5px);
            `;
        } else {
            const symbol = shapes[Math.floor(Math.random() * shapes.length)];
            shape.textContent = symbol;
            shape.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                color: ${color};
                opacity: ${opacity};
                animation: floatShape ${duration}s ease-in-out ${delay}s infinite alternate;
                user-select: none;
            `;
        }
        
        floatingContainer.appendChild(shape);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatShape {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(5deg);
            }
            50% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(0deg);
            }
            75% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(-5deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Text flow animations for poetry lines
function initTextFlowAnimations() {
    const poetryLines = document.querySelectorAll('.poetry-line');
    
    poetryLines.forEach((line, index) => {
        const text = line.querySelector('span');
        if (!text) return;
        
        // Split text into letters for animation
        const letters = text.textContent.split('');
        text.textContent = '';
        
        letters.forEach((letter, letterIndex) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'poetry-letter';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px) rotateX(90deg)';
            span.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${(index * 0.3 + letterIndex * 0.03)}s`;
            text.appendChild(span);
        });
        
        // Animate letters when line is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letters = line.querySelectorAll('.poetry-letter');
                    letters.forEach(letter => {
                        letter.style.opacity = '1';
                        letter.style.transform = 'translateY(0) rotateX(0deg)';
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(line);
    });
}

// Section transition animations
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Add subtle border reveal
                        if (!entry.target.classList.contains('hero-section')) {
                            entry.target.style.borderTop = '1px solid transparent';
                            setTimeout(() => {
                                entry.target.style.borderTop = '1px solid rgba(122, 28, 63, 0.1)';
                            }, 1000);
                        }
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Glow effects for premium elements
function initGlowEffects() {
    // Add glow to product image
    const productImage = document.querySelector('.product-image-container');
    if (productImage) {
        const glow = document.createElement('div');
        glow.className = 'image-glow';
        glow.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, rgba(122,28,63,0.1) 0%, transparent 70%);
            opacity: 0;
            z-index: -1;
            pointer-events: none;
            transition: opacity 0.8s ease;
        `;
        productImage.appendChild(glow);
        
        productImage.addEventListener('mouseenter', function() {
            glow.style.opacity = '1';
        });
        
        productImage.addEventListener('mouseleave', function() {
            glow.style.opacity = '0';
        });
    }
    
    // Add glow to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta, .purchase-cta, .whatsapp-cta');
    ctaButtons.forEach(button => {
        const glow = document.createElement('div');
        glow.className = 'button-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%);
            opacity: 0;
            border-radius: inherit;
            pointer-events: none;
            transition: opacity 0.4s ease;
        `;
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(glow);
        
        button.addEventListener('mouseenter', function() {
            glow.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            glow.style.opacity = '0';
        });
    });
}

// Morphing shapes for luxury effect
function initMorphingShapes() {
    // Create morphing background shapes
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'morphing-shapes';
    shapesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        opacity: 0.03;
    `;
    document.body.insertBefore(shapesContainer, document.body.firstChild);
    
    // Create several morphing shapes
    const shapes = [
        { shape: 'circle', color: 'var(--deep-maroon)' },
        { shape: 'polygon(50% 0%, 0% 100%, 100% 100%)', color: 'var(--champagne)' },
        { shape: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', color: 'var(--deep-maroon)' },
        { shape: 'ellipse(40% 50% at 50% 50%)', color: 'var(--champagne)' }
    ];
    
    shapes.forEach((shapeDef, index) => {
        const shape = document.createElement('div');
        shape.style.cssText = `
            position: absolute;
            width: ${200 + index * 100}px;
            height: ${200 + index * 100}px;
            background: ${shapeDef.color};
            clip-path: ${shapeDef.shape};
            opacity: 0.1;
            filter: blur(40px);
            animation: morphShape ${15 + index * 5}s ease-in-out infinite alternate;
            top: ${20 + index * 15}%;
            left: ${index * 20}%;
        `;
        
        shapesContainer.appendChild(shape);
    });
    
    // Add morphing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes morphShape {
            0% {
                clip-path: circle(50% at 50% 50%);
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                transform: translate(20px, -20px) rotate(90deg);
            }
            50% {
                clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
                transform: translate(-20px, 20px) rotate(180deg);
            }
            75% {
                clip-path: ellipse(40% 50% at 50% 50%);
                transform: translate(30px, 10px) rotate(270deg);
            }
            100% {
                clip-path: circle(40% at 60% 40%);
                transform: translate(-10px, -30px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Kinetic typography animations
function initKineticTypography() {
    // Animate main title letters
    const mainTitle = document.querySelector('.product-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.className = 'title-letter';
            span.textContent = letter;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px) rotateY(90deg)';
            span.style.transition = `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
            mainTitle.appendChild(span);
        });
        
        // Animate on load
        setTimeout(() => {
            const letters = mainTitle.querySelectorAll('.title-letter');
            letters.forEach(letter => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) rotateY(0deg)';
            });
        }, 500);
    }
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    
                    text.split('').forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'section-title-letter';
                        span.textContent = letter;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(30px)';
                        span.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.05}s`;
                        entry.target.appendChild(span);
                        
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, 100);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}

// Enhanced product image animation
function initProductImageAnimation() {
    const productImage = document.querySelector('.product-image-container');
    
    if (!productImage) return;
    
    // Add perspective wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'product-3d-wrapper';
    wrapper.style.cssText = `
        perspective: 1200px;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    `;
    
    productImage.parentNode.insertBefore(wrapper, productImage);
    wrapper.appendChild(productImage);
    
    // 3D transform on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.05;
        
        wrapper.style.transform = `
            rotateX(${Math.min(rotation, 15)}deg)
            rotateY(${Math.min(rotation * 0.5, 7.5)}deg)
            translateZ(${Math.min(scrollY * 0.1, 50)}px)
        `;
    });
    
    // Interactive mouse movement
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        
        productImage.style.transform = `
            translateX(${x}px)
            translateY(${y}px)
            rotateX(${y * -0.5}deg)
            rotateY(${x * 0.5}deg)
        `;
    });
}

// Enhanced button micro-interactions
function initButtonMicroInteractions() {
    const buttons = document.querySelectorAll('button:not(.menu-icon):not(.cart-icon):not(.close-menu):not(.close-cart):not(.carousel-btn)');
    
    buttons.forEach(button => {
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 10;
            const deltaY = (y - centerY) / centerY * 10;
            
            this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
        
        // Enhanced ripple effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create multiple ripples
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const ripple = document.createElement('span');
                    ripple.className = 'luxury-ripple';
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                        transform: scale(0);
                        animation: luxuryRipple 0.8s cubic-bezier(0.23, 1, 0.32, 1);
                        width: ${100 + i * 50}px;
                        height: ${100 + i * 50}px;
                        margin-left: -${50 + i * 25}px;
                        margin-top: -${50 + i * 25}px;
                        left: ${x}px;
                        top: ${y}px;
                        pointer-events: none;
                        opacity: ${0.8 - i * 0.2};
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 800);
                }, i * 100);
            }
        });
    });
    
    // Add luxury ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes luxuryRipple {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            70% {
                opacity: 0.4;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced media hover effects
function initMediaHoverEffects() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        // Create reflection effect
        const reflection = document.createElement('div');
        reflection.className = 'media-reflection';
        reflection.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
        `;
        item.appendChild(reflection);
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.media-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1.1)';
            }
            
            reflection.style.opacity = '1';
            
            // Add subtle vibration
            this.style.animation = 'mediaVibrate 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.media-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(1)';
            }
            
            reflection.style.opacity = '0';
            this.style.animation = '';
        });
    });
    
    // Add vibration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mediaVibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            75% { transform: translateX(1px); }
        }
    `;
    document.head.appendChild(style);
}

