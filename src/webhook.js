// webhook.js
module.exports.setupWebhook = function(app) {
  // El endpoint para recibir los mensajes de Telegram
  app.post('/webhook', (req, res) => {
    // Aquí procesas los datos que Telegram envía
    const message = req.body.message;
    console.log('Nuevo mensaje recibido:', message);  // Solo para depuración
    res.send('OK');
  });
};
