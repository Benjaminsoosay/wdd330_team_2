export default class CheckoutProcess {
    constructor(cartItems) {
        this.cartItems = cartItems;
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
    }
    
    // Calculate and display subtotal when page loads
    calculateSubtotal() {
        this.subtotal = this.cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        document.getElementById('subtotal').textContent = `$${this.subtotal.toFixed(2)}`;
        return this.subtotal;
    }
    
    // Calculate tax and shipping
    calculateTaxAndShipping() {
        // Tax: 6% of subtotal
        this.tax = this.subtotal * 0.06;
        
        // Shipping: $10 for first item + $2 for each additional item
        const totalItems = this.cartItems.reduce((count, item) => count + item.quantity, 0);
        this.shipping = 10 + (totalItems - 1) * 2;
        
        // Update display
        document.getElementById('tax').textContent = `$${this.tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${this.shipping.toFixed(2)}`;
        
        return { tax: this.tax, shipping: this.shipping };
    }
    
    // Calculate order total
    calculateOrderTotal() {
        this.total = this.subtotal + this.tax + this.shipping;
        document.getElementById('orderTotal').textContent = `$${this.total.toFixed(2)}`;
        return this.total;
    }
    
    // Package items for server
    packageItems() {
        return this.cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
    }
    
    // Prepare and send checkout data
    async checkout(formData, externalServices) {
        const items = this.packageItems();
        
        const order = {
            orderDate: new Date().toISOString(),
            fname: formData.fname,
            lname: formData.lname,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            cardNumber: formData.cardNumber,
            expiration: formData.expiration,
            code: formData.code,
            items: items,
            orderTotal: this.total.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2)
        };
        
        try {
            const result = await externalServices.checkout(order);
            return result;
        } catch (error) {
            console.error('Checkout failed:', error);
            throw error;
        }
    }
}
