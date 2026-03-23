import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import { addToCart } from './cart.mjs';

// Load header and footer
loadHeaderFooter();

const dataSource = new ExternalServices();

async function loadProductDetails() {
  const productId = getParam('id');
  console.log('Loading product with ID:', productId);
  
  if (!productId) {
    console.error('No product ID found in URL');
    const container = document.querySelector('.product-detail');
    if (container) {
      container.innerHTML = '<p>Product ID not found in URL</p>';
    }
    return;
  }
  
  try {
    const product = await dataSource.findProductById(productId);
    console.log('Product loaded:', product);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    renderProductDetails(product);
    setupAddToCartButton(product);
  } catch (error) {
    console.error('Error loading product:', error);
    const container = document.querySelector('.product-detail');
    if (container) {
      container.innerHTML = '<p>Error loading product. Please try again later.</p>';
    }
  }
}

function renderProductDetails(product) {
  const container = document.querySelector('.product-detail');
  if (!container) {
    console.error('Product detail container not found');
    return;
  }
  
  const imageUrl = product.Images?.PrimaryMedium || product.Image || '';
  const price = product.FinalPrice || product.price || 0;
  const brand = product.Brand?.Name || '';
  
  container.innerHTML = `
    <h2>${product.Name || product.name}</h2>
    ${brand ? `<h3 class="product-brand">${brand}</h3>` : ''}
    <img src="${imageUrl}" alt="${product.Name || product.name}" class="product-image">
    <p class="product-price">$${price.toFixed(2)}</p>
    <p class="product-description">${product.Description || product.description || 'No description available'}</p>
    <button id="addToCart" class="add-to-cart-btn">Add to Cart</button>
  `;
}

function setupAddToCartButton(product) {
  const button = document.getElementById('addToCart');
  if (button) {
    button.addEventListener('click', () => {
      addToCart(product);
      alert(`${product.Name || product.name} added to cart!`);
    });
  }
}

// Load the product details when the page loads
loadProductDetails();
