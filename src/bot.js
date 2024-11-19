//Punto de entrada del bot
const express = require('express');
const bodyParser = require('body-parser');
const { setupWebhook } = require('./webhook');
const { fetchProducts } = require('./services/productService');
const { formatResponse } = require('./utils/formatResponse');
require('dotenv').config(); 
const app = express();
const port = 3000;

app.use(bodyParser.json());


setupWebhook(app);


app.get('/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.listen(port, () => {
  console.log(`Bot server running on port ${port}`);
});

