// ProductList.mjs
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // will hold the product data
  }

  async init() {
    // Fetch product data asynchronously
    this.products = await this.dataSource.getData();
    // Filter products by category
    this.products = this.products.filter(item => item.category === this.category);
    // Render the product list
    this.renderList();
  }

  renderList() {
    // Clear any existing content
    this.listElement.innerHTML = "";

    // Loop through products and create HTML cards
    this.products.forEach(product => {
      const card = this.renderProductCard(product);
      this.listElement.appendChild(card);
    });
  }

  renderProductCard(product) {
    // Create a simple product card using template literals
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
    `;
    return card;
  }
}
