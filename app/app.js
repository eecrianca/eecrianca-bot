let Telegram = require('telegram-bot-api');
let Request = require('./request');
let FinancialRequest = require('./financial_request');
let SecretaryRequest = require('./secretary_request');
let CoordinationRequest = require('./coordination_request');
let Question = require('./question');
let MenuItem = require('./menu_item');

const INITIAL_MENU = {
  text: 'Olá, tudo bom? Deseja fazer uma solicitação? Escolha um setor para continuar.',
  markup: {
    inline_keyboard: [
      [ { text: FinancialRequest.NAME, callback_data: Request.FINANCIAL_TYPE },
        { text: SecretaryRequest.NAME, callback_data: Request.SECRETARY_TYPE }
      ],
      [ { text: CoordinationRequest.NAME, callback_data: Request.COORDINATION_TYPE } ]
    ]
  }
};

let App = class App {
  constructor(token){
    if (!token){
      throw "The token parametes cannot be blank";
    }

    this.requests = new Array();
    if(process.env.NODE_ENV === 'production') {
      this.api = new Telegram({ token: token });
      this.api.setWebhook(process.env.HEROKU_URL + token);

      console.log('Init by webhook');
    }
    else {
      this.api = new Telegram({ token: token, updates: { enabled: true } });
      console.log('Init by pulling');
    }

    console.log('Telegram bot server started...');
  }

  process_update(update) {
    const message = update.message;
    this.api.emit('update', message);
  }

  send_message(chat_id, text, markup = [], then_func) {
    this.api.sendMessage({
      chat_id: chat_id,
      text: text,
      reply_markup: markup
    })
    .then(function(message) {
      if (then_func) {
        return then_func(message);
      }
    })
    .catch(function(err) {
      return console.log(err);
    });
  }

  new_request(chat_id, type){

    let request;
    if (type == Request.FINANCIAL_TYPE)
      request = new FinancialRequest(chat_id);

    if (type == Request.SECRETARY_TYPE)
      request = new SecretaryRequest(chat_id);

    if (type == Request.COORDINATION_TYPE)
      request = new CoordinationRequest(chat_id);

    let text = "Você selecionou " + request.name + ". Digite OK para confirmar ou CANCELAR para voltar ao inicio."

    this.send_message(request.chat_id, text);

    this.requests.push(request);
  }

  remove_request(request) {
    var i = this.requests.findIndex(
      x => x.chat_id === request.chat_id);
    if (i !== -1)
      return this.requests.splice(i, 1);
  }

  on_message(message_func){
    let app = (this);
    let new_func = function(message){
      if (!message){
        return
      }

      let request = app.requests.find(x => x.chat_id == message.chat.id)

      if (!request) {
        app.send_message(message.chat.id, INITIAL_MENU.text, JSON.stringify(INITIAL_MENU.markup));
      }

      //se o usuário digitar cancelar
      if (message.text.downcase === "cancelar") {
        app.remove_request(request);
        request = null;
      }

      if (request) {
        message_func(message, request);
      }
    }
    this.api.on('message', new_func);
  }

  on_callback(func){
    this.api.on('inline.callback.query',func);
  }
}

module.exports = App;
