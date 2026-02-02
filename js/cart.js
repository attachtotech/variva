// Cart functionality and WhatsApp integration

document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initQuantityControls();
    initWhatsAppIntegration();
    initAddToCart();
    updateCartUI();
});

// Cart state
const cartState = {
    items: [{
        id: 'issued-in-love',
        name: 'Issued in Love',
        description: 'The couples game for intentional romance',
        price: 68,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }],
    total: 68
};

// Initialize cart
function initCart() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('varivaCart');
    if (savedCart) {
        try {
            const parsedCart = JSON.parse(savedCart);
            cartState.items = parsedCart.items || cartState.items;
            cartState.total = parsedCart.total || calculateTotal();
            updateCartUI();
        } catch (e) {
            console.error('Error loading cart:', e);
        }
    }
    
    // Save cart to localStorage on changes
    const saveCart = () => {
        localStorage.setItem('varivaCart', JSON.stringify(cartState));
    };
    
    // Override array methods to auto-save
    const arrayMethods = ['push', 'pop', 'splice', 'shift', 'unshift'];
    const cartItems = cartState.items;
    
    arrayMethods.forEach(method => {
        const original = cartItems[method];
        cartItems[method] = function(...args) {
            const result = original.apply(this, args);
            cartState.total = calculateTotal();
            saveCart();
            updateCartUI();
            return result;
        };
    });
}

// Initialize quantity controls
function initQuantityControls() {
    // Main purchase section quantity controls
    const mainMinus = document.querySelector('.purchase-qty .minus');
    const mainPlus = document.querySelector('.purchase-qty .plus');
    const mainQty = document.querySelector('.purchase-qty .qty-value');
    
    if (mainMinus && mainPlus && mainQty) {
        mainMinus.addEventListener('click', () => {
            if (cartState.items[0].quantity > 1) {
                cartState.items[0].quantity--;
                updateCartUI();
                animateQuantityChange(mainQty, -1);
            }
        });
        
        mainPlus.addEventListener('click', () => {
            cartState.items[0].quantity++;
            updateCartUI();
            animateQuantityChange(mainQty, 1);
        });
    }
    
    // Cart panel quantity controls
    const cartMinus = document.querySelector('.cart-item-controls .minus');
    const cartPlus = document.querySelector('.cart-item-controls .plus');
    const cartQty = document.querySelector('.cart-item-controls .quantity');
    
    if (cartMinus && cartPlus && cartQty) {
        cartMinus.addEventListener('click', () => {
            if (cartState.items[0].quantity > 1) {
                cartState.items[0].quantity--;
                updateCartUI();
                animateQuantityChange(cartQty, -1);
            }
        });
        
        cartPlus.addEventListener('click', () => {
            cartState.items[0].quantity++;
            updateCartUI();
            animateQuantityChange(cartQty, 1);
        });
    }
}

// Quantity change animation
function animateQuantityChange(element, change) {
    element.style.transform = `scale(${change > 0 ? 1.2 : 0.8})`;
    element.style.color = change > 0 ? 'var(--deep-maroon)' : 'var(--light-maroon)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 300);
}

// Calculate cart total
function calculateTotal() {
    return cartState.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Update cart UI
function updateCartUI() {
    // Update cart count in toolbar
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Animate count change
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Update main quantity display
    const mainQty = document.querySelector('.purchase-qty .qty-value');
    if (mainQty && cartState.items[0]) {
        mainQty.textContent = cartState.items[0].quantity;
    }
    
    // Update cart panel quantities
    const cartQty = document.querySelector('.cart-item-controls .quantity');
    if (cartQty && cartState.items[0]) {
        cartQty.textContent = cartState.items[0].quantity;
    }
    
    // Update cart panel prices
    const itemPrice = document.querySelector('.item-price');
    const totalPrice = document.querySelector('.total-price');
    
    if (cartState.items[0]) {
        const itemTotal = cartState.items[0].price * cartState.items[0].quantity;
        
        if (itemPrice) {
            itemPrice.textContent = `$${itemTotal}`;
            
            // Animate price change
            itemPrice.style.transform = 'scale(1.1)';
            itemPrice.style.color = 'var(--deep-maroon)';
            setTimeout(() => {
                itemPrice.style.transform = 'scale(1)';
                itemPrice.style.color = '';
            }, 300);
        }
        
        if (totalPrice) {
            const total = calculateTotal();
            totalPrice.textContent = `$${total}`;
            
            // Animate total change
            totalPrice.style.transform = 'scale(1.1)';
            totalPrice.style.color = 'var(--deep-maroon)';
            setTimeout(() => {
                totalPrice.style.transform = 'scale(1)';
                totalPrice.style.color = '';
            }, 300);
        }
    }
    
    // Save to localStorage
    localStorage.setItem('varivaCart', JSON.stringify(cartState));
}

// Initialize WhatsApp integration
function initWhatsAppIntegration() {
    // Function to open WhatsApp with pre-filled message
    window.openWhatsApp = function(quantity) {
        // Use actual phone number (replace with Variva's WhatsApp number)
        const phoneNumber = "8452018403"; // Replace with actual number
        
        // Build the message
        const message = `Hi Variva, I'd like to purchase 'Issued in Love' (Qty: ${quantity})`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Close cart panel if open
        closeCartPanel();
        
        // Show confirmation animation
        showWhatsAppConfirmation();
        
        // Track conversion
        console.log('WhatsApp purchase initiated:', { quantity });
    };
    
    // Purchase section CTA
    const purchaseCta = document.getElementById('purchaseCta');
    if (purchaseCta) {
        purchaseCta.addEventListener('click', function(e) {
            e.preventDefault();
            const quantity = cartState.items[0].quantity;
            openWhatsApp(quantity);
        });
    }
    
    // Mobile sticky CTA
    const mobileWhatsapp = document.getElementById('mobileWhatsapp');
    if (mobileWhatsapp) {
        mobileWhatsapp.addEventListener('click', function(e) {
            e.preventDefault();
            const quantity = cartState.items[0].quantity;
            openWhatsApp(quantity);
        });
    }
    
    // Cart panel WhatsApp CTA
    const whatsappCheckout = document.getElementById('whatsappCheckout');
    if (whatsappCheckout) {
        whatsappCheckout.addEventListener('click', function(e) {
            e.preventDefault();
            const quantity = cartState.items[0].quantity;
            openWhatsApp(quantity);
        });
    }
    
    // Hero CTA (opens purchase section)
    const heroCta = document.getElementById('heroCta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const purchaseSection = document.querySelector('.purchase-section');
            if (purchaseSection) {
                purchaseSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add scroll animation class
                purchaseSection.classList.add('highlight-section');
                setTimeout(() => {
                    purchaseSection.classList.remove('highlight-section');
                }, 2000);
            }
        });
    }
}

// Show WhatsApp confirmation animation
function showWhatsAppConfirmation() {
    // Create confirmation overlay
    const overlay = document.createElement('div');
    overlay.className = 'whatsapp-confirmation';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(122, 28, 63, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    // Create confirmation content
    overlay.innerHTML = `
        <div class="confirmation-content" style="
            text-align: center;
            color: white;
            max-width: 400px;
            padding: 2rem;
            transform: translateY(30px);
            transition: transform 0.5s ease 0.2s;
        ">
            <div class="confirmation-icon" style="
                font-size: 4rem;
                margin-bottom: 1.5rem;
                animation: bounce 1s ease infinite;
            ">
                <i class="fab fa-whatsapp"></i>
            </div>
            <h3 style="
                font-family: var(--font-serif);
                font-size: 2rem;
                margin-bottom: 1rem;
                color: var(--warm-beige);
            ">Opening WhatsApp</h3>
            <p style="
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
                opacity: 0.9;
            ">You'll be redirected to WhatsApp to complete your purchase with personalized assistance from our team.</p>
            <p style="
                font-size: 0.9rem;
                opacity: 0.7;
                font-style: italic;
            ">If WhatsApp doesn't open automatically, please check your pop-up settings.</p>
            <button class="close-confirmation" style="
                margin-top: 2rem;
                padding: 0.8rem 2rem;
                background: transparent;
                border: 2px solid var(--warm-beige);
                color: var(--warm-beige);
                border-radius: 50px;
                font-family: var(--font-sans);
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Show overlay with animation
    setTimeout(() => {
        overlay.style.opacity = '1';
        const content = overlay.querySelector('.confirmation-content');
        content.style.transform = 'translateY(0)';
    }, 100);
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = overlay.querySelector('.close-confirmation');
    closeBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 500);
        }
    }, 5000);
}

// Close cart panel
function closeCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    const overlay = document.querySelector('.overlay');
    
    if (cartPanel && cartPanel.classList.contains('active')) {
        cartPanel.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}

// Initialize add to cart functionality
function initAddToCart() {
    // Cart toggle functionality
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartPanel = document.getElementById('cartPanel');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartPanel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate cart opening
            animateCartOpen();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            closeCartPanel();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeCartPanel();
        });
    }
    
    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartPanel();
        }
    });
}

// Animate cart opening
function animateCartOpen() {
    const cartPanel = document.getElementById('cartPanel');
    if (!cartPanel) return;
    
    // Reset animation
    cartPanel.style.animation = 'none';
    void cartPanel.offsetWidth; // Trigger reflow
    
    // Apply slide-in animation
    cartPanel.style.animation = 'slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Add animation keyframes
    const style = document.createElement('style');
    if (!document.querySelector('#cart-animation')) {
        style.id = 'cart-animation';
        style.textContent = `
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
            
            .cart-panel {
                transform: translateX(100%);
            }
            
            .cart-panel.active {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate cart items
    const cartItem = document.querySelector('.cart-item');
    if (cartItem) {
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            cartItem.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.2s';
            cartItem.style.opacity = '1';
            cartItem.style.transform = 'translateX(0)';
        }, 200);
    }
}

// Highlight section animation
function highlightSection(section) {
    section.style.boxShadow = '0 0 0 5px rgba(122, 28, 63, 0.3)';
    section.style.transition = 'box-shadow 0.5s ease';
    
    setTimeout(() => {
        section.style.boxShadow = 'none';
    }, 2000);
}

// Add cart-related CSS animations to document
function addCartAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        /* Cart animations */
        .cart-count {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .cart-item {
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .quantity, .qty-value {
            transition: all 0.3s ease;
        }
        
        .item-price, .total-price {
            transition: all 0.3s ease;
        }
        
        .highlight-section {
            animation: highlightPulse 2s ease;
        }
        
        @keyframes highlightPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(122, 28, 63, 0);
            }
            50% {
                box-shadow: 0 0 0 20px rgba(122, 28, 63, 0.1);
            }
        }
        
        /* Quantity button animations */
        .quantity-btn, .qty-btn {
            position: relative;
            overflow: hidden;
        }
        
        .quantity-btn:active, .qty-btn:active {
            transform: scale(0.9);
        }
        
        /* WhatsApp button animation */
        .whatsapp-cta, .purchase-cta, .mobile-whatsapp-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease !important;
        }
        
        .whatsapp-cta:hover, .purchase-cta:hover, .mobile-whatsapp-btn:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 25px rgba(122, 28, 63, 0.3) !important;
        }
        
        /* Cart panel animations */
        .cart-panel {
            transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        
        /* Overlay animation */
        .overlay {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize cart animations
addCartAnimations();

// Export cart state for debugging (optional)
window.cartState = cartState;
window.updateCartUI = updateCartUI;
window.openWhatsApp = openWhatsApp;

console.log('Cart system initialized successfully');

