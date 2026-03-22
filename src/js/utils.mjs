// src/js/utils.mjs

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}
