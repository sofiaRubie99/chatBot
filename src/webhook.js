const fetch = require('node-fetch');
const { TELEGRAM_TOKEN } = require('./config');  // Asegúrate de que la variable TELEGRAM_TOKEN esté en tu archivo config.js

// Función para configurar el webhook
function setupWebhook(app) {
  app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    const chatId = message.chat.id;
    const text = message.text;

    // Verificar el mensaje y responder según el comando
    if (text === '/getData') {
      // Lógica para obtener los productos
      const products = await fetchProducts();
      const productData = JSON.stringify(products); // O formato necesario

      // Enviar los productos al chat de Telegram
      await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          chat_id: chatId,
          text: `Here are the products:\n${productData}`,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    res.send(); // Responder a Telegram
  });
}
