import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Add to cart function
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cart.push(product);
    localStorage.setItem('so-cart', JSON.stringify(cart));
    console.log('Added to cart:', product.Name);
    // Update cart display if on cart page
    if (document.querySelector('.product-list')) {
        renderCartContents();
    }
}

export function getCart() {
    return JSON.parse(localStorage.getItem('so-cart')) || [];
}

// Display cart functions
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const listFooter = document.querySelector(".list-footer");
  const cartSummary = document.querySelector(".cart-summary");
  
  console.log('Cart items count:', cartItems.length);
  
  // Check if cart is empty
  if (cartItems.length === 0) {
    if (productList) {
      productList.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/product_listing/?category=tents" class="btn">Start Shopping</a>
        </div>
      `;
    }
    if (listFooter) {
      listFooter.classList.add("hide");
    }
    if (cartSummary) {
      cartSummary.classList.add("hide");
    }
    return;
  }
  
  // Show cart summary if it was hidden
  if (cartSummary) {
    cartSummary.classList.remove("hide");
  }
  
  // Display cart items
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  if (productList) {
    productList.innerHTML = htmlItems.join("");
  }
  
  // Calculate subtotal and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.FinalPrice || item.price), 0);
  const total = subtotal; // For cart page, subtotal equals total (tax/shipping added in checkout)
  
  // Update order summary
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");
  
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Also update the old list-total if it exists (for backward compatibility)
  const oldTotalElement = document.querySelector(".list-total");
  if (oldTotalElement) {
    oldTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Show footer
  if (listFooter) {
    listFooter.classList.remove("hide");
  }
  
  // Add remove button functionality
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      removeFromCart(index);
    });
  });
}

function cartItemTemplate(item, index) {
  // Handle both data structures (API might return different property names)
  const imageUrl = item.Images?.PrimaryMedium || item.Image || item.image || '';
  const itemName = item.Name || item.name;
  const itemPrice = item.FinalPrice || item.price;
  const itemColor = item.Colors?.[0]?.ColorName || item.color || 'N/A';
  
  return `<li class="cart-card divider">
    <img src="${imageUrl}" alt="${itemName}" class="cart-card__image">
    <h2 class="card__name">${itemName}</h2>
    <p class="cart-card__color">${itemColor}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${itemPrice.toFixed(2)}</p>
    <button class="remove-item" data-index="${index}">Remove</button>
  </li>`;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Initialize cart display
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCartContents);
} else {
    renderCartContents();
}