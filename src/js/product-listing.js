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

// ==================== Quick View Modal ====================

const modal = document.getElementById('quick-view-modal');
const modalContent = document.getElementById('modal-product-details');
const closeModalBtn = document.querySelector('.close-modal');

function showQuickView(product) {
  const description = product.Description
    ? `<p class="modal-description">${product.Description}</p>`
    : `<p class="modal-description">
         Sleep Outside provides high-quality camping and outdoor gear designed for comfort, 
         durability, and affordability. Perfect for your next adventure in nature.
       </p>`;

  modalContent.innerHTML = `
    <h2>${product.NameWithoutBrand}</h2>
    <h3>${product.Brand.Name}</h3>
    <p style="font-size:1.35rem; color:#525b0f; font-weight:600; margin:1rem 0;">
      $${product.FinalPrice}
    </p>
    
    ${description}
    
    <button class="wishlist-btn" data-id="${product.Id}" style="margin-top:1.5rem;">
      ❤️ Add to Wishlist
    </button>
  `;
  modal.style.display = 'block';
}

// Close modal when clicking the × button
closeModalBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Event delegation for Quick View buttons
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('quick-view-btn')) {
    const productId = e.target.getAttribute('data-id');
    
    try {
      const product = await dataSource.findProductById(productId);
      showQuickView(product);
    } catch (error) {
      console.error("Failed to load quick view:", error);
      alert("Sorry, could not load product details at the moment.");
    }
  }
});