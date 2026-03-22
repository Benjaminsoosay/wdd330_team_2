import { loadHeaderFooter } from './utils.mjs';
import { getCart } from './cart.mjs';

// Load header and footer
loadHeaderFooter();

// Function to display order summary
function displayOrderSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
    const shipping = 10.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    const numberItemsElem = document.getElementById('numberItems');
    const cartTotalElem = document.getElementById('cartTotal');
    const shippingElem = document.getElementById('shipping');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');
    
    if (numberItemsElem) numberItemsElem.textContent = cart.length;
    if (cartTotalElem) cartTotalElem.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElem) shippingElem.textContent = `$${shipping.toFixed(2)}`;
    if (taxElem) taxElem.textContent = `$${tax.toFixed(2)}`;
    if (totalElem) totalElem.textContent = `$${total.toFixed(2)}`;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    
    const form = document.querySelector('form[name="checkout"]');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order placed successfully! Your cart has been cleared.');
            localStorage.removeItem('so-cart');
            window.location.href = '/cart/';
        });
    }
});
