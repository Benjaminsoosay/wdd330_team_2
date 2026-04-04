export function renderPhotos(photos) {
  const container = document.getElementById("photoGallery");

  if (!photos || photos.length === 0) {
    container.innerHTML = "<p>No photos found</p>";
    return;
  }

  container.innerHTML = photos
    .map(photo => `
      <img src="${photo.urls.small}" alt="${photo.alt_description}" />
    `)
    .join("");
}