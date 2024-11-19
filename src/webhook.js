// webhook.js
module.exports.setupWebhook = function(app) {
  app.post('/webhook', (req, res) => {
    // Aquí procesas el mensaje que viene de Telegram
    const message = req.body.message;
    const chatId = message.chat.id;
    const text = message.text;

    // Lógica para responder al mensaje
    res.send('Mensaje recibido');
  });
};
