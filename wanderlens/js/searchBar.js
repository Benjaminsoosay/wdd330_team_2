import { fetchCountryData, fetchPhotos } from "./apiService.js";
import { renderCountry } from "./countryInfo.js";
import { renderPhotos } from "./photoGallery.js";

export function initSearch() {
  const btn = document.getElementById("searchBtn");
  const input = document.getElementById("searchInput");

  // Button click
  btn.addEventListener("click", async () => {
    const query = input.value.trim();
    if (!query) return;

    // Loading state
    document.getElementById("countryInfo").innerHTML = "Loading...";
    document.getElementById("photoGallery").innerHTML = "";

    const countryData = await fetchCountryData(query);
    const photos = await fetchPhotos(query);

    renderCountry(countryData);
    renderPhotos(photos);
  });

  // Enter key support
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btn.click();
    }
  });
}