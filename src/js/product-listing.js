import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();


let category = getParam("category");

if (!category) {
  console.warn("No category in URL, defaulting to tents");
  category = "tents";
}

console.log("Category from URL:", category);   

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
// ==================== Wishlist System - Final Clean Version ====================

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Clean up any duplicates
wishlist = [...new Set(wishlist)];

function updateWishlistCount() {
  const countElement = document.getElementById('wishlist-count');
  if (countElement) {
    countElement.textContent = wishlist.length;
  }
}

function restoreWishlistState() {
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    const productId = btn.getAttribute('data-id');
    if (wishlist.includes(productId)) {
      btn.textContent = '❤️';
      btn.style.color = '#e74c3c';
    } else {
      btn.textContent = '♡';
      btn.style.color = '#ccc';
    }
  });
}

function toggleWishlist(productId, button) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
    button.textContent = '♡';
    button.style.color = '#ccc';
  } else {
    wishlist.push(productId);
    button.textContent = '❤️';
    button.style.color = '#e74c3c';
  }

  localStorage.setItem('wishlist', JSON.stringify([...new Set(wishlist)]));
  updateWishlistCount();
}

// Attach click listener only once
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('wishlist-btn')) {
    const productId = e.target.getAttribute('data-id');
    toggleWishlist(productId, e.target);
  }
});

// Run restore after a short delay to ensure products are rendered
setTimeout(() => {
  updateWishlistCount();
  restoreWishlistState();
}, 500);
