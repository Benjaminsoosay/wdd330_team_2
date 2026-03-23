import ExternalServices from './ExternalServices.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import { getLocalStorage } from './utils.mjs';

// Get cart items from localStorage
const cartItems = getLocalStorage('so-cart') || [];

// Initialize checkout process
const checkout = new CheckoutProcess(cartItems);

// Calculate and display subtotal on page load
checkout.calculateSubtotal();
checkout.calculateTaxAndShipping();
checkout.calculateOrderTotal();

// Handle zip code change for shipping recalculation
document.getElementById('zip').addEventListener('change', () => {
    checkout.calculateTaxAndShipping();
    checkout.calculateOrderTotal();
});

// Handle form submission
const form = document.getElementById('checkout-form');
const externalServices = new ExternalServices();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData.entries());
    
    try {
        const result = await checkout.checkout(orderData, externalServices);
        
        // Clear cart on successful checkout
        localStorage.removeItem('so-cart');
        
        // Redirect to success page
        window.location.href = '/checkout/success.html';
    } catch (error) {
        alert('There was an error processing your order. Please try again.');
        console.error(error);
    }
});
