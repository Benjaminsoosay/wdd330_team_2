// Existing functions
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Add this function for URL parameters
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// Template functions for header/footer
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
