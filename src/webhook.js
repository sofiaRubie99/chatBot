const fetch = require('node-fetch');
const { TELEGRAM_TOKEN } = require('./config');  // Asegúrate de que la variable TELEGRAM_TOKEN esté en tu archivo config.js

// Función para configurar el webhook
function setupWebhook(app) {
  app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    const chatId = message.chat.id;
    const text = message.text;

    if (text === '/getData') {
      try {
        const products = await fetchProducts();
        const productData = JSON.stringify(products);  // O formatea como lo necesites

        // Responde al usuario con los datos de los productos
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chatId,
            text: `Here are the products:\n${productData}`,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

      } catch (error) {
        // En caso de error, envía un mensaje de error al usuario
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chatId,
            text: 'There was an error retrieving the products.',
          }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    res.send();  // Asegúrate de responder a Telegram para evitar que se quede esperando
  });
}

module.exports = { setupWebhook };
