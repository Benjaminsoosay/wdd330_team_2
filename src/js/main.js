// main.js
import ProductList from "./productList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector("#product-list");
const dataSource = new ExternalServices();

const productList = new ProductList("electronics", dataSource, listElement);
productList.init();

loadHeaderFooter();

document.querySelector('#searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.querySelector('#searchInput').value.trim();

  if (!query) return;

  // Redirect to product list page with query as a parameter
  window.location.href = `/product-listing.html?search=${encodeURIComponent(query)}`;
});