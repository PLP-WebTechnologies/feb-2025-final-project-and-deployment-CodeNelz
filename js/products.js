// Initialize the products page
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = getUrlParams();
    
    // Set initial category filter if provided in URL
    if (params.category) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = params.category;
        }
    }
    
    // Load products
    loadProducts();
    
    // Add event listeners to filters
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', loadProducts);
    }
});

// Load products based on filters
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const loadingElement = document.getElementById('loading');
    const noProductsElement = document.getElementById('no-products');
    
    if (!productsGrid || !loadingElement || !noProductsElement) return;
    
    // Show loading
    loadingElement.style.display = 'flex';
    productsGrid.innerHTML = '';
    noProductsElement.style.display = 'none';
    
    // Get filter values
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    const category = categoryFilter ? categoryFilter.value : 'all';
    const sortBy = sortFilter ? sortFilter.value : 'default';
    
    // Filter products
    let filteredProducts = [...products];
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (featured)
            filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    // Simulate loading delay
    setTimeout(() => {
        // Hide loading
        loadingElement.style.display = 'none';
        
        // Display products or no products message
        if (filteredProducts.length === 0) {
            noProductsElement.style.display = 'block';
        } else {
            // Add products to grid
            filteredProducts.forEach(product => {
                productsGrid.appendChild(createProductCard(product));
            });
        }
    }, 500);
}
