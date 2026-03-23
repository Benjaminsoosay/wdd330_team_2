// ExternalServices.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`API Error: ${res.status} - ${res.statusText}`);
  }
}

export default class ExternalServices {
  constructor() {
    // No initialization needed
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    
    try {
      const response = await fetch(`${baseURL}checkout`, options);
      return await convertToJson(response);
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    }
  }
}
