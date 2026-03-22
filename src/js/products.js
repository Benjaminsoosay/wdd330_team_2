import ProductData from "./ProductData.js";
import { addToCart } from "./cart.mjs";

console.log('Products.js loaded');

const dataSource = new ProductData("tents");
console.log('Data source created, path:', dataSource.path);

async function loadProducts() {
    console.log('Loading products...');
    try {
        const products = await dataSource.getData();
        console.log('Products loaded:', products);
        console.log('Number of products:', products.length);
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }
}

function displayProducts(products) {
    const grid = document.getElementById('product-grid');
    console.log('Grid element:', grid);
    
    if (!grid) {
        console.error('Product grid element not found!');
        return;
    }
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.Image}" alt="${product.Name}" class="product-card__image">
            <h3 class="product-card__name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
            <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
        </div>
    `).join('');
    
    console.log('Products displayed, count:', products.length);
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = products.find(p => p.Id === productId);
            if (product) {
                addToCart(product);
                alert(`${product.Name} added to cart!`);
            }
        });
    });
}

// Load products when page loads
loadProducts();
