// Initialize the product details page
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = getUrlParams();
    const productId = parseInt(params.id);
    
    if (!productId) {
        // Redirect to products page if no product ID is provided
        window.location.href = 'products.html';
        return;
    }
    
    // Load product details
    loadProductDetails(productId);
    
    // Load related products
    loadRelatedProducts(productId);
});

// Load product details
function loadProductDetails(productId) {
    const productDetailsContainer = document.getElementById('product-details-container');
    const productNameElement = document.getElementById('product-name');
    
    if (!productDetailsContainer || !productNameElement) return;
    
    // Find product by ID
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        // Show error message if product not found
        productDetailsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Product Not Found</h3>
                <p>The product you are looking for does not exist.</p>
                <a href="products.html" class="btn">Back to Products</a>
            </div>
        `;
        return;
    }
    
    // Update product name in breadcrumb
    productNameElement.textContent = product.name;
    
    // Generate star rating
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    // Create badge based on product status
    let badge = '';
    if (product.isNew) {
        badge = '<span class="product-badge">New</span>';
    } else if (product.isSale) {
        badge = '<span class="product-badge">Sale</span>';
    }
    
    // Set product details HTML
    productDetailsContainer.innerHTML = `
        <div class="product-details-grid">
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${badge}
                </div>
                <div class="thumbnail-images">
                    <div class="thumbnail active">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.name}</h2>
                <div class="product-rating">
                    <div class="stars">${starsHTML}</div>
                    <span class="rating-count">(${product.ratingCount} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
                </div>
                <div class="product-options">
                    <div class="option-group">
                        <label>Size:</label>
                        <div class="option-buttons">
                            <button class="option-button">S</button>
                            <button class="option-button active">M</button>
                            <button class="option-button">L</button>
                            <button class="option-button">XL</button>
                        </div>
                    </div>
                    <div class="option-group">
                        <label>Color:</label>
                        <div class="color-options">
                            <button class="color-option" style="background-color: #000000;"></button>
                            <button class="color-option active" style="background-color: #ffffff; border: 1px solid #ddd;"></button>
                            <button class="color-option" style="background-color: #ff6b6b;"></button>
                            <button class="color-option" style="background-color: #4a6de5;"></button>
                        </div>
                    </div>
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="10" id="quantity">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn add-to-cart-btn" id="add-to-cart-btn">Add to Cart</button>
                </div>
                <div class="product-meta">
                    <div class="meta-item">
                        <span>SKU:</span>
                        <span>PROD-${product.id}</span>
                    </div>
                    <div class="meta-item">
                        <span>Category:</span>
                        <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    </div>
                    <div class="meta-item">
                        <span>Tags:</span>
                        <span>Fashion, ${product.category}, Trending</span>
                    </div>
                </div>
                <div class="product-share">
                    <span>Share:</span>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (minusBtn && plusBtn && quantityInput && addToCartBtn) {
        // Quantity buttons
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        // Add to cart button
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            
            // Add product to cart with selected quantity
            addToCart({
                ...product,
                quantity: quantity
            });
        });
    }
    
    // Option buttons
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const group = this.closest('.option-buttons');
            group.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all color options
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
}

// Load related products
function loadRelatedProducts(productId) {
    const relatedProductsContainer = document.getElementById('related-products');
    
    if (!relatedProductsContainer) return;
    
    // Find current product
    const currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) return;
    
    // Get products in the same category, excluding the current product
    let relatedProducts = products.filter(p => p.category === currentProduct.category && p.id !== productId);
    
    // If not enough related products, add some featured products
    if (relatedProducts.length < 4) {
        const featuredProducts = products.filter(p => p.isFeatured && p.id !== productId && p.category !== currentProduct.category);
        relatedProducts = [...relatedProducts, ...featuredProducts].slice(0, 4);
    } else {
        relatedProducts = relatedProducts.slice(0, 4);
    }
    
    // Clear container
    relatedProductsContainer.innerHTML = '';
    
    // Add products to container
    relatedProducts.forEach(product => {
        relatedProductsContainer.appendChild(createProductCard(product));
    });
}
