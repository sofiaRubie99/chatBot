// webhook.js
const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_TOKEN } = require('./config');

const bot = new TelegramBot(TELEGRAM_TOKEN);

// Configura el webhook de Telegram
module.exports.setupWebhook = function (app) {
  const url = process.env.WEBHOOK_URL; // URL de tu servidor en Render

  // Configura el webhook con la URL de tu servidor
  bot.setWebHook(`${url}/webhook`);

  // Maneja los mensajes de Telegram
  app.post('/webhook', (req, res) => {
    const message = req.body.message;
    console.log('Nuevo mensaje recibido:', message);
    res.send('OK');
  });
};
