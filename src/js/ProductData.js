const baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // No category or path needed anymore
  }
  
  async getData(category) {
    try {
      // Try API first
      const url = `${baseURL}products/search/${category}`;
      console.log('Fetching from API:', url);
      const response = await fetch(url);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.warn('API failed, falling back to local JSON:', error);
      // Fall back to local JSON
      const localResponse = await fetch(`/json/${category}.json`);
      const localData = await convertToJson(localResponse);
      return localData;
    }
  }
  
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.warn('API failed for product detail, falling back to local JSON');
      // You'll need to implement local product detail lookup
      const products = await this.getData('tents'); // This will use fallback
      return products.find(p => p.Id === id);
    }
  }
}
