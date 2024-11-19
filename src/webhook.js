const fetch = require('node-fetch');
const { TELEGRAM_TOKEN } = require('./config');
const { fetchProducts } = require('./services/productService');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

function setupWebhook(app) {
  app.post('/webhook', async (req, res) => {
    try {
      const message = req.body.message;

      if (!message || !message.chat || !message.text) {
        res.status(200).send(); // Confirmamos la recepción del webhook aunque no haya datos relevantes
        return;
      }

      const chatId = message.chat.id;
      const text = message.text;

      if (text === '/getData') {
        try {
          const products = await fetchProducts();

          const productList = products
            .map(
              (product, index) =>
                `${index + 1}. ${product.name} - $${product.price}`
            )
            .join('\n');

          const replyText = productList || 'No products found.';

          await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
              chat_id: chatId,
              text: `Here are the products:\n${replyText}`,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error fetching products:', error);

          await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
              chat_id: chatId,
              text: 'There was an error retrieving the products. Please try again later.',
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      } else if (text === '/location') {
        // Enviar una ubicación predefinida
        const latitude = 37.7749; // Ejemplo: San Francisco, CA
        const longitude = -122.4194;

        await fetch(`${TELEGRAM_API_URL}/sendLocation`, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Respuesta para comandos desconocidos
        await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chatId,
            text: `Sorry, I didn't understand the command: "${text}".`,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      res.status(200).send(); // Confirmamos que el webhook procesó la solicitud
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).send(); // Indicamos un error en el servidor
    }
  });
}

module.exports = { setupWebhook };
