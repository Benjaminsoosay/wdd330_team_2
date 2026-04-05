const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const baseURL =
      import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com/';

    const url = `${baseURL}products/search/${category}`;
    console.log('Fetching from:', url);

    const response = await fetch(url);
    const data = await convertToJson(response);

    return data.Result;
  }
  async findProductById(id) {
    const baseURL =
      import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com/';

    const url = `${baseURL}product/${id}`;
    console.log('Fetching product from:', url); // for debugging

    const response = await fetch(url);
    const data = await convertToJson(response);

    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
