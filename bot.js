let $initial_menu, $questions, $requests, Request, Telegram, api, methods, token;

Telegram = require('telegram-bot-api');
Request = require('./app/request');
FinancialRequest = require('./app/financial_request');
SecretaryRequest = require('./app/secretary_request');
Question = require('./app/question');
MenuItem = require('./app/menu_item');

token = '220902047:AAEvcj51oZuHAMfHlJ_2qp8HGLzVZLT04M4';

api = new Telegram({
  token: token,
  updates: {
    enabled: true
  }
});

$requests = [];

console.log('bot server started...');

api.on('message', function(message) {
  if (!message)
    return

  var chat_id, current_question;
  chat_id = message.chat.id

  let request = $requests.find(x => x.chat_id == chat_id)

  if (!request) {
    methods.sendMessage(chat_id, $initial_menu.text, JSON.stringify($initial_menu.markup));
  }

  if (message.text.downcase == "cancelar") {
    methods.remove_request(request);
    request = null;
  }

  if (request) {
    //não mexa na ordem nos ifs.
    if (request.current_question.status == Question.ASKED){
      request.current_question.answer = message.text;
      request.current_question.status = Question.ANSWERED;

      request.next_question();
    }

    if (request.current_question && request.current_question.status == Question.INITIAL){
      methods.sendMessage(request.chat_id, request.current_question.text, []);

      request.current_question.status = Question.ASKED;
    }

    if (request.is_closed()){
      methods.sendMessage(request.chat_id,
        request.success_message + "\n\nPara me chamar novamente basta mandar um Oi que eu volto. ;) \n\nXau! :*", []);
      methods.remove_request(request);
      return
    }
  }
});

api.on('inline.callback.query', function(msg) {
  let data = msg.data;

  attrs = {
    chat_id: msg.from.id
  }

  let request;
  if (data == Request.FINANCIAL_TYPE)
    request = new FinancialRequest(attrs);

  if (data == Request.SECRETARY_TYPE)
    request = new SecretaryRequest(attrs);

  text = "Você selecionou " + request.name + ". Digite OK para confirmar ou CANCELAR para voltar ao inicio."

  methods.sendMessage(request.chat_id, text , []);
  $requests.push(request);

});

methods = {
  sendMessage: function(chat_id, text, markup, then_func) {
    var m = api.sendMessage({
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
  },
  remove_request: function(request) {
    var i = $requests.findIndex(
      x => x.chat_id === request.chat_id);
    if (i !== -1)
      return $requests.splice(i, 1);
  }
};

$initial_menu = {
  id: 'initial',
  text: 'Olá, tudo bom? Deseja fazer uma solicitação? Escolha um setor para continuar.',
  markup: {
    inline_keyboard: [
      [ { text: 'Financeiro', callback_data:      Request.FINANCIAL_TYPE },
        { text: 'Secretaria', callback_data: Request.SECRETARY_TYPE }
      ],
      [ { text: 'Coordenação', callback_data: Request.COORDINATION_TYPE } ]
    ]
  }
};
