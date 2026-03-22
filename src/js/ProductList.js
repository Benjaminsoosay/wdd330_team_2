@'
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  
  renderList(list) {
    const html = list.map(product => `
      <li class="product-card">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
      </li>
    `).join('');
    this.listElement.innerHTML = html;
    
    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const productId = e.target.dataset.id;
        const product = list.find(p => p.Id === productId);
        if (product) {
          // Import addToCart dynamically to avoid circular dependencies
          const { addToCart } = await import('./cart.mjs');
          addToCart(product);
          alert(`${product.Name} added to cart!`);
        }
      });
    });
  }
}
'@ | Out-File -FilePath src/js/ProductList.js -Encoding utf8
