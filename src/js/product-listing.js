import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get category from URL
const category = getParam('category');

// Initialize data source
const dataSource = new ProductData();

// Get display element
const listElement = document.querySelector('.product-list');

// Create product list instance
const productList = new ProductList(category, dataSource, listElement);

// Load products
productList.init();

// Update title
const titleElement = document.getElementById('category-title');
if (titleElement && category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    titleElement.textContent = `Top Products: ${formattedCategory}`;
    document.title = `${formattedCategory} Products | Sleep Outside`;
}
