const response = await fetch(`${baseURL}product/${id}`);
const data = await convertToJson(response);
return data.Result;