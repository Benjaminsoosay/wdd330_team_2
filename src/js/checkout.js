import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";  

loadHeaderFooter();


const order = new CheckoutProcess();


order.calculateSubtotal();


const zipInput = document.querySelector("#zip");
if (zipInput) {
    zipInput.addEventListener("blur", () => {
        if (zipInput.value) {
            order.calculateTotals();
        }
    });
}


const submitButton = document.querySelector("#checkoutSubmit");
const checkoutForm = document.querySelector("#checkout-form"); // Make sure your form has this ID

if (submitButton && checkoutForm) {
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        
        
        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }
        
        
        const originalText = submitButton.textContent;
        submitButton.textContent = "Processing...";
        submitButton.disabled = true;
        
        try {
            
            if (!zipInput.value) {
                alert("Please enter your zip code to calculate shipping and tax.");
                return;
            }
            
            order.calculateTotals();
            await order.checkout(checkoutForm);
            
        } catch (error) {
            console.error("Checkout error:", error);
            alert(`Checkout failed: ${error.message || "Please try again."}`);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}
