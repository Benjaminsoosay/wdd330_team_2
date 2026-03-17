// main.js
import ProductList from "./productList.mjs";
import ExternalDataSource from "./ExternalDataSource.mjs";
import { qs, loadTemplate, renderWithTemplate } from "./utils.mjs";

const listElement = document.querySelector("#product-list");
const dataSource = new ExternalDataSource();

const productList = new ProductList("electronics", dataSource, listElement);
productList.init();

async function loadHeaderFooter() {
  // Load header
  const header = await loadTemplate("/partials/header.html");
  renderWithTemplate(header, qs("#main-header"));

  // Load footer
  const footer = await loadTemplate("/partials/footer.html");
  renderWithTemplate(footer, qs("#main-footer"));
}

loadHeaderFooter();
