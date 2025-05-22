// Initialize the cart page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    loadCartItems();
    
    // Load recommended products
    loadRecommendedProducts();
    
    // Add event listener to checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    // Add event listener to promo code button
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
    
    // Add event listeners to modal close buttons
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Add event listener to checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});

// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartElement = document.getElementById('empty-cart');
    const cartContentElement = document.getElementById('cart-content');
    
    if (!cartItemsContainer || !emptyCartElement || !cartContentElement) return;
    
    // Check if cart is empty
    if (cart.length === 0) {
        emptyCartElement.style.display = 'flex';
        cartContentElement.style.display = 'none';
        return;
    }
    
    // Show cart content
    emptyCartElement.style.display = 'none';
    cartContentElement.style.display = 'flex';
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Add cart items
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="item-total">${formatPrice(item.price * item.quantity)}</div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to quantity buttons and remove buttons
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex !== -1) {
                const newQuantity = cart[itemIndex].quantity - 1;
                
                if (newQuantity > 0) {
                    updateCartItemQuantity(productId, newQuantity);
                } else {
                    removeFromCart(productId);
                }
                
                // Reload cart items
                loadCartItems();
                updateCartSummary();
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex !== -1) {
                const newQuantity = cart[itemIndex].quantity + 1;
                
                if (newQuantity <= 10) {
                    updateCartItemQuantity(productId, newQuantity);
                    
                    // Reload cart items
                    loadCartItems();
                    updateCartSummary();
                }
            }
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity > 0 && newQuantity <= 10) {
                updateCartItemQuantity(productId, newQuantity);
                
                // Reload cart items
                loadCartItems();
                updateCartSummary();
            } else {
                // Reset to valid value
                const itemIndex = cart.findIndex(item => item.id === productId);
                if (itemIndex !== -1) {
                    this.value = cart[itemIndex].quantity;
                }
            }
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
            
            // Reload cart items
            loadCartItems();
            updateCartSummary();
        });
    });
    
    // Update cart summary
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (!subtotalElement || !shippingElement || !taxElement || !totalElement) return;
    
    // Calculate subtotal
    const subtotal = calculateCartTotal();
    
    // Calculate shipping (free shipping over $100)
    const shipping = subtotal > 100 ? 0 : 10;
    
    // Calculate tax (8%)
    const tax = subtotal * 0.08;
    
    // Calculate total
    const total = subtotal + shipping + tax;
    
    // Update elements
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    taxElement.textContent = formatPrice(tax);
    totalElement.textContent = formatPrice(total);
}

// Load recommended products
function loadRecommendedProducts() {
    const recommendedProductsContainer = document.getElementById('recommended-products');
    
    if (!recommendedProductsContainer) return;
    
    // Get random products
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    const recommendedProducts = shuffledProducts.slice(0, 4);
    
    // Clear container
    recommendedProductsContainer.innerHTML = '';
    
    // Add products to container
    recommendedProducts.forEach(product => {
        recommendedProductsContainer.appendChild(createProductCard(product));
    });
}

// Apply promo code
function applyPromoCode() {
    const promoCodeInput = document.getElementById('promo-code');
    
    if (!promoCodeInput) return;
    
    const promoCode = promoCodeInput.value.trim();
    
    if (promoCode === 'DISCOUNT20') {
        // Apply 20% discount
        alert('Promo code applied! 20% discount has been applied to your order.');
        
        // Update cart summary
        updateCartSummary();
    } else {
        alert('Invalid promo code. Please try again.');
    }
}

// Open checkout modal
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    
    if (!checkoutModal) return;
    
    // Check if cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        return;
    }
    
    // Show modal
    checkoutModal.style.display = 'flex';
}

// Close modal
function closeModal(modal) {
    if (!modal) return;
    
    modal.style.display = 'none';
}

// Process order
function processOrder() {
    // In a real application, this would send the order to a server
    
    // Generate random order number
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    // Update order number in confirmation modal
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
    }
    
    // Close checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        closeModal(checkoutModal);
    }
    
    // Show confirmation modal
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
}
