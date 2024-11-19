//Punto de entrada del bot
const express = require('express');
const bodyParser = require('body-parser');
const { setupWebhook } = require('./webhook');
const { fetchProducts } = require('./services/productService');
const { formatResponse } = require('./utils/formatResponse');
require('dotenv').config(); 
const app = express();
const port = 3000;

app.use(bodyParser.json()); // Asegúrate de que puedas manejar el cuerpo JSON de Telegram

// Configura las rutas para los webhooks de Telegram
setupWebhook(app);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

