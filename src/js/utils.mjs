// Render a template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

// Load a template file
export async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
    }
    const template = await response.text();
    return template;
}

// Load header and footer
export async function loadHeaderFooter() {
    try {
        // Load templates
        const headerTemplate = await loadTemplate("/partials/header.html");
        const footerTemplate = await loadTemplate("/partials/footer.html");
        
        // Get elements
        const headerElement = document.getElementById("main-header");
        const footerElement = document.getElementById("main-footer");
        
        // Render header and footer
        if (headerElement) {
            renderWithTemplate(headerTemplate, headerElement);
        }
        
        if (footerElement) {
            renderWithTemplate(footerTemplate, footerElement);
        }
        
        // If you have cart functionality, update cart count
        updateCartCount(); // We'll create this function below
        
    } catch (error) {
        console.error("Error loading header/footer:", error);
    }
}

// Optional: Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    const cartIcon = document.querySelector('.cart svg');
    if (cartIcon && cart.length > 0) {
        // Add a cart count badge if needed
        let badge = document.querySelector('.cart-count');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-count';
            document.querySelector('.cart').appendChild(badge);
        }
        badge.textContent = cart.length;
    }
}
