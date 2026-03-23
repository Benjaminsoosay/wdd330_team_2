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
    return;
  }
  
  // Display cart items
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  if (productList) {
    productList.innerHTML = htmlItems.join("");
  }
  
  // Calculate and display total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  const totalElement = document.querySelector(".list-total");
  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
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
  return `<li class="cart-card divider">
    <img src="${item.Images?.PrimaryMedium || item.Image || ''}" alt="${item.Name}" class="cart-card__image">
    <h2 class="card__name">${item.Name}</h2>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'N/A'}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
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
