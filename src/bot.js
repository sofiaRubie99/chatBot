// bot.js
const express = require('express');
const bodyParser = require('body-parser');
const { setupWebhook } = require('./webhook');
const { TELEGRAM_TOKEN } = require('./config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Asegúrate de que puedas manejar el cuerpo JSON de Telegram

// Configura las rutas para los webhooks de Telegram
setupWebhook(app);

// Ruta raíz para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Aquí puedes configurar el webhook de Telegram, pero este paso generalmente se hace manualmente con el método de Telegram para setear el webhook
});







