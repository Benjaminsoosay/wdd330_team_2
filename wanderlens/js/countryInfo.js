export function renderCountry(country) {
  const container = document.getElementById("countryInfo");

  if (!country) {
    container.innerHTML = "<p>No country found</p>";
    return;
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currency = country.currencies
    ? Object.values(country.currencies)[0]?.name || "N/A"
    : "N/A";

  const capital = country.capital ? country.capital[0] : "N/A";

  const population = country.population
    ? country.population.toLocaleString()
    : "N/A";

  container.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.png}" width="100"/>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currency:</strong> ${currency}</p>
  `;
}