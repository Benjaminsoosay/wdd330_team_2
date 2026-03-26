import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import productDetails from "./productDetail.mjs";

const dataSource = new ExternalServices('tents');

function addProductToCart(product) {
  // get cart array of items from local storage, or set to empty array if null
  const cartItems = getLocalStorage('so-cart') || [];

  // check if product already exists in cart
  const existingItem = cartItems.find(item => item.Id === product.Id);

  if (existingItem) {
    // increment quantity if already in cart
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // add new product with quantity 1
    product.quantity = 1;
    cartItems.push(product);
  }
}

  // New function: update quantity directly
function updateCartQuantity(productId, newQuantity) {
  const cartItems = getLocalStorage('so-cart') || [];

  const item = cartItems.find(p => p.Id === productId);
  if (item) {
    if (newQuantity <= 0) {
      // remove item if quantity is zero or less
      const updatedCart = cartItems.filter(p => p.Id !== productId);
      setLocalStorage('so-cart', updatedCart);
    } else {
      item.quantity = newQuantity;
      setLocalStorage('so-cart', cartItems);
    }
  }

  // save updated cart back to local storage
  setLocalStorage('so-cart', cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

const product = await dataSource.findProductById(id);