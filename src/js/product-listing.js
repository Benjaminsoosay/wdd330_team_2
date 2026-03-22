import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

// Display category name
const categoryName = document.getElementById('category-name');
if (categoryName && category) {
    const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    categoryName.textContent = formattedCategory;
}

const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();
