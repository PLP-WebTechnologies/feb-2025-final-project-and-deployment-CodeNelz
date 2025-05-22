// Sample product data (in a real application, this would come from a server)
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 24.99,
        originalPrice: 29.99,
        image: "images/product-1.jpg",
        category: "men",
        rating: 4.5,
        ratingCount: 120,
        isFeatured: true,
        isNew: true,
        isSale: false
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 49.99,
        originalPrice: 59.99,
        image: "images/product-2.jpg",
        category: "men",
        rating: 4.2,
        ratingCount: 85,
        isFeatured: true,
        isNew: false,
        isSale: true
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        price: 39.99,
        originalPrice: 49.99,
        image: "images/product-3.jpg",
        category: "women",
        rating: 4.8,
        ratingCount: 156,
        isFeatured: true,
        isNew: true,
        isSale: false
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        price: 79.99,
        originalPrice: 99.99,
        image: "images/product-4.jpg",
        category: "accessories",
        rating: 4.6,
        ratingCount: 92,
        isFeatured: true,
        isNew: false,
        isSale: true
    },
    {
        id: 5,
        name: "Casual Sneakers",
        price: 64.99,
        originalPrice: 74.99,
        image: "images/product-5.jpg",
        category: "accessories",
        rating: 4.3,
        ratingCount: 78,
        isFeatured: true,
        isNew: true,
        isSale: false
    },
    {
        id: 6,
        name: "Denim Jacket",
        price: 89.99,
        originalPrice: 109.99,
        image: "images/product-6.jpg",
        category: "men",
        rating: 4.7,
        ratingCount: 110,
        isFeatured: true,
        isNew: false,
        isSale: true
    },
    {
        id: 7,
        name: "Bohemian Maxi Skirt",
        price: 54.99,
        originalPrice: 64.99,
        image: "images/product-7.jpg",
        category: "women",
        rating: 4.4,
        ratingCount: 65,
        isFeatured: true,
        isNew: true,
        isSale: false
    },
    {
        id: 8,
        name: "Aviator Sunglasses",
        price: 34.99,
        originalPrice: 44.99,
        image: "images/product-8.jpg",
        category: "accessories",
        rating: 4.1,
        ratingCount: 42,
        isFeatured: true,
        isNew: false,
        isSale: true
    }
];

// Initialize the home page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
});

// Load featured products
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    if (!featuredProductsContainer) return;
    
    // Get featured products
    const featuredProducts = products.filter(product => product.isFeatured);
    
    // Clear container
    featuredProductsContainer.innerHTML = '';
    
    // Add products to container
    featuredProducts.forEach(product => {
        featuredProductsContainer.appendChild(createProductCard(product));
    });
}

// Create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Create badge based on product status
    let badge = '';
    if (product.isNew) {
        badge = '<span class="product-badge">New</span>';
    } else if (product.isSale) {
        badge = '<span class="product-badge">Sale</span>';
    }
    
    // Calculate discount percentage if on sale
    let discountPercentage = '';
    if (product.originalPrice > product.price) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discountPercentage = `<span class="discount-badge">-${discount}%</span>`;
    }
    
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
    
    // Set product card HTML
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${badge}
            ${discountPercentage}
        </div>
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <div class="product-rating">
                <div class="stars">${starsHTML}</div>
                <span class="rating-count">(${product.ratingCount})</span>
            </div>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to add to cart button
    const addToCartBtn = productCard.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(product);
    });
    
    // Add event listener to product card for navigation to product details
    productCard.addEventListener('click', function(e) {
        // Don't navigate if the add to cart button was clicked
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            return;
        }
        
        window.location.href = `product-details.html?id=${product.id}`;
    });
    
    return productCard;
}
