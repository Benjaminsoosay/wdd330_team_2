import { loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

loadHeaderFooter();

const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
const listElement = document.getElementById('wishlist-items');
const messageElement = document.getElementById('wishlist-message');

const dataSource = new ExternalServices();

async function loadWishlist() {
  if (wishlistIds.length === 0) {
    messageElement.textContent = 'Your wishlist is empty.';
    return;
  }

  messageElement.style.display = 'none';

  for (const id of wishlistIds) {
    try {
      const product = await dataSource.findProductById(id);

      const itemHTML = `
        <li class="product-card">
          <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h3>${product.Brand.Name}</h3>
            <p>${product.NameWithoutBrand}</p>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
          <button class="remove-wishlist-btn" data-id="${product.Id}">Remove</button>
        </li>
      `;

      listElement.innerHTML += itemHTML;
    } catch (error) {
      //console.error(`Failed to load product ${id}:`, error);
    }
  }
}

loadWishlist();
