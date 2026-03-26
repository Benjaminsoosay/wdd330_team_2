// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// render a list with a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  // Clear out the parent element if requested
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Map the list into HTML strings using the provided template function
  const htmlStrings = list.map(templateFn);

  // Insert the combined HTML into the parent element
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// render a single template (for header/footer)
export function renderWithTemplate(template, parentElement, data, callback) {
  // Insert the template into the parent element
  parentElement.innerHTML = template;

  // If a callback is provided, call it
  if (callback) {
    callback(data);
  }
}

// load an external HTML template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load header and footer into the DOM
export async function loadHeaderFooter() {
  // Load header
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  // Load footer
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // Create alert container
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('custom-alert');
  alertDiv.textContent = message;

  // Insert at the top of the main element
  const main = document.querySelector('main');
  if (main) {
    main.insertBefore(alertDiv, main.firstChild);
  }

  // Scroll to top if requested
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Auto-remove after a few seconds (optional)
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}