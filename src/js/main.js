// main.js
import ProductList from "./productList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector("#product-list");
const dataSource = new ProductData();

const productList = new ProductList("electronics", dataSource, listElement);
productList.init();

loadHeaderFooter();
