const fetch = require('node-fetch');
const BACKEND_URL = 'https://sweet-dreams-app-v01-526d0a7b9b94.herokuapp.com/v1/product'; 
const BEARER_TOKEN = process.env.BEARER_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InNvZmlhLnJ1YmllQGdtYWlsLmNvbSIsImV4cCI6MTczMjg1MTY1NH0._svVYXjh0vuz-RVir_EBzKDrBfu-t07PWZTobYsiLEpufqXYKGLEGxIvTghSxSWHcQlV8pvaUY3Wzqcp03IEHA'; // Asegúrate de que el token esté configurado correctamente

async function fetchProducts() {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products');
  }
}

module.exports = { fetchProducts };
