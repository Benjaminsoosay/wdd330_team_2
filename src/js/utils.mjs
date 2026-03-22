// Add these functions to your existing utils.mjs

export async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text();
    return html;
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');
    
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    
    if (headerElement) {
        renderWithTemplate(headerTemplate, headerElement);
    }
    if (footerElement) {
        renderWithTemplate(footerTemplate, footerElement);
    }
}
