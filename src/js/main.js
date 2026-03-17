// main.js
import ProductList from "./productList.mjs";
import ExternalDataSource from "./ExternalDataSource.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector("#product-list");
const dataSource = new ExternalDataSource();

const productList = new ProductList("electronics", dataSource, listElement);
productList.init();

loadHeaderFooter();
