const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/name/";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_API_KEY = "yhNn7ljUk4pEoE5zSpBXRp8KzZtiBo7u7AsTIo_-5L0"; // get from Unsplash

export async function fetchCountryData(country) {
  try {
    const res = await fetch(`${REST_COUNTRIES_URL}${country}`);
    const data = await res.json();
    return data[0]; // take first result
  } catch (error) {
    console.error("Error fetching country:", error);
  }
}

export async function fetchPhotos(query) {
  try {
    const res = await fetch(
      `${UNSPLASH_URL}?query=${query}&client_id=${UNSPLASH_API_KEY}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}