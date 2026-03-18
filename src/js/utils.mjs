// In src/js/utils.mjs
export async function loadTemplate(path) {
    // Remove leading slash for Render
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const response = await fetch(cleanPath);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${cleanPath}`);
    }
    return await response.text();
}

export async function loadHeaderFooter() {
    try {
        // Use paths without leading slash for Render
        const headerTemplate = await loadTemplate("partials/header.html");
        const footerTemplate = await loadTemplate("partials/footer.html");
        
        const headerElement = document.getElementById("main-header");
        const footerElement = document.getElementById("main-footer");
        
        if (headerElement) {
            headerElement.innerHTML = headerTemplate;
        }
        
        if (footerElement) {
            footerElement.innerHTML = footerTemplate;
        }
    } catch (error) {
        console.error("Error loading header/footer:", error);
        // Display error on page for debugging
        document.body.insertAdjacentHTML('afterbegin', `<div style="color:red">Error: ${error.message}</div>`);
    }
}
