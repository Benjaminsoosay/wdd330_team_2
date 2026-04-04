import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      
      <!-- Wishlist Button -->
      <button class="wishlist-btn" data-id="${product.Id}">
        ❤️
      </button>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      console.log('Products loaded:', list);

      this.renderList(list);

      // Update the page title dynamically
      const titleElement = document.querySelector('#category-title');
      if (titleElement) {
        const capitalized =
          this.category.charAt(0).toUpperCase() + this.category.slice(1);
        titleElement.textContent = `Top Products: ${capitalized}`;
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  // This method was missing
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
