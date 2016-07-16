var token = '220902047:AAEvcj51oZuHAMfHlJ_2qp8HGLzVZLT04M4';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

console.log('bot server started...');

bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    "Teste"
  });
});
