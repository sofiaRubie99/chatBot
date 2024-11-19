//Punto de entrada del bot
const express = require('express');
const bodyParser = require('body-parser');
const { setupWebhook } = require('./webhook');

const app = express();

// Configura body-parser para poder recibir el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Configura el webhook
setupWebhook(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
