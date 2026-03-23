import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity || 1,  // Use stored quantity or default to 1
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    // Optionally calculate initial totals (without shipping/tax until zip is entered)
    // this.calculateOrderTotal(); // Uncomment if you want to show totals immediately
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    
    // Calculate total number of items (accounting for quantities)
    const totalItems = this.list.reduce((total, item) => total + (item.quantity || 1), 0);
    itemNumElement.innerText = totalItems;
    
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => (item.FinalPrice * (item.quantity || 1)));
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // calculate the shipping and tax amounts
    // Tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    
    // Shipping: $10 for first item + $2 for each additional item
    const totalItems = this.list.reduce((total, item) => total + (item.quantity || 1), 0);
    if (totalItems === 0) {
      this.shipping = 0;
    } else {
      this.shipping = 10 + (totalItems - 1) * 2;
    }
    
    // Calculate order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    // display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    
    // Validate form
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      throw new Error("Please fill out all required fields");
    }
    
    // Make sure totals are calculated before checkout
    // This ensures shipping/tax are up to date
    this.calculateOrderTotal();
    
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    
    console.log("Submitting order:", order);

    try {
      const response = await services.checkout(order);
      console.log("Order successful:", response);
      
      // Clear cart on successful order
      if (response && response.orderId) {
        localStorage.removeItem(this.key);
        alert("Order placed successfully! Thank you for your purchase.");
        // Redirect to success page or home page
        // window.location.href = "/success.html";
      }
      
      return response;
    } catch (err) {
      console.error("Checkout error:", err);
      alert(`Checkout failed: ${err.message || "Please try again."}`);
      throw err;
    }
  }
}
