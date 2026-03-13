import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render the HTML
    this.renderProductDetails();
    
    // Add event listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // We'll fill this in later
  }
}
