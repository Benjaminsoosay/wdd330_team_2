import ProductData from './ProductData.mjs';

export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }
  
  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
  }
  
  renderList(products) {
    // Simple rendering for now
    this.element.innerHTML = products.map(product => `
      <div class="product-card">
        <h3>${product.Name}</h3>
        <p>${product.Description}</p>
        <p>Price: $${product.FinalPrice}</p>
      </div>
    `).join('');
  }
}
