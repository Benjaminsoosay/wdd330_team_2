import CheckoutProcess from "./CheckoutProcess.mjs";

// Initialize checkout process
const order = new CheckoutProcess("so-cart", "#order-summary");
order.init();                 // loads cart and updates item summary
order.calculateOrderTotal();  // calculates tax, shipping, and total

// Add event listener for zip code changes
const zipInput = document.querySelector("#zip");
if (zipInput) {
    zipInput.addEventListener("change", () => {
        if (zipInput.value) {
            order.calculateOrderTotal(); // recalculate totals (tax is fixed 6%, but shipping depends on item count)
        }
    });
}

// Handle form submission
const checkoutForm = document.querySelector("#checkout-form");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate all required fields
        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        // Get the submit button
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            // Disable button and show processing
            submitBtn.textContent = "Processing...";
            submitBtn.disabled = true;

            // Make sure zip is filled
            if (!zipInput || !zipInput.value) {
                alert("Please enter your zip code to calculate shipping and tax.");
                return;
            }

            // Recalculate totals one more time
            order.calculateOrderTotal();

            // Submit the order
            const result = await order.checkout();

            // Clear cart and show success
            if (result && result.orderId) {
                localStorage.removeItem('so-cart');
                alert(`Order placed successfully! Your order ID is: ${result.orderId}`);
                window.location.href = '/';
            } else {
                throw new Error('Order submission failed');
            }

        } catch (error) {
            console.error("Checkout error:", error);
            alert(`Checkout failed: ${error.message}`);
        } finally {
            // Re-enable the button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
