import { getLocalStorage } from "./utils.mjs";

// Add to cart function
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cart.push(product);
    localStorage.setItem('so-cart', JSON.stringify(cart));
    console.log('Added to cart:', product.Name);
}

export function getCart() {
    return JSON.parse(localStorage.getItem('so-cart')) || [];
}

// Display cart functions
function renderCartContents() {
  // Check if we're on a page that has the cart elements
  const productList = document.querySelector(".product-list");
  if (!productList) {
    console.log('Not on cart page, skipping cart render');
    return;
  }
  
  const cartItems = getLocalStorage("so-cart") || [];
  const listFooter = document.querySelector(".list-footer");
  
  // Check if cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="/products.html" class="btn">Start Shopping</a>
      </div>
    `;
    if (listFooter) {
      listFooter.classList.add("hide");
    }
    return;
  }
  
  // Display cart items
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  productList.innerHTML = htmlItems.join("");
  
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
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-index="${index}">Remove</button>
</li>`;

  return newItem;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Only run renderCartContents if we're on a page that has the cart elements
if (document.querySelector(".product-list")) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCartContents);
  } else {
    renderCartContents();
  }
}
