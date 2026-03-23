const baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
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
      // Fall back to local JSON - search through all categories
      const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
      for (const category of categories) {
        try {
          const products = await this.getData(category);
          const product = products.find(p => p.Id === id);
          if (product) return product;
        } catch (e) {
          // Continue to next category
        }
      }
      return null;
    }
  }
  
  async checkout(orderData) {
    try {
      const response = await fetch(`${baseURL}checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error('Checkout failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in checkout:', error);
      throw error;
    }
  }
}
