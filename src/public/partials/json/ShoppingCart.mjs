import { getLocalStorage } from './utils.mjs';

export default class ShoppingCart {
  constructor(cartElement) {
    this.cartElement = cartElement;
    this.items = getLocalStorage('so-cart') || [];
  }

  async init() {
    const template = await this.getCartTemplate();
    this.renderCart(template);
  }

  async getCartTemplate() {
    const res = await fetch('/partials/cart-item.html');
    return await res.text();
  }

  renderCart(template) {
    if (this.items.length === 0) {
      this.cartElement.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    let html = '';
    this.items.forEach(item => {
      html += this.renderCartItem(template, item);
    });
    
    this.cartElement.innerHTML = html;
    this.calculateTotal();
  }

  renderCartItem(template, item) {
    // Replace placeholders with actual data
    return template
      .replace('{{name}}', item.name)
      .replace('{{price}}', item.FinalPrice)
      .replace('{{image}}', item.Images.PrimaryMedium);
  }

  calculateTotal() {
    // Calculate and display total
  }
