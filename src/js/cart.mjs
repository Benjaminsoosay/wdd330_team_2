import { getLocalStorage } from "./utils.mjs";

// Add to cart function
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cart.push(product);
    localStorage.setItem('so-cart', JSON.stringify(cart));
    console.log('Added to cart:', product.Name);
}

// Export getCart function
export function getCart() {
    return JSON.parse(localStorage.getItem('so-cart')) || [];
}

// ... rest of your cart code (renderCartContents, etc.)
