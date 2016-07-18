let Request = require('./request')
let Question = require('./question');

const NAME = "Secretaria",
SUCCESS_MESSAGE = 'Sua solicitação foi efetuada com sucesso. Em até 72h ela será atendida.';

var SecretaryRequest = class SecretaryRequest extends Request {
  constructor (chat_id) {
    let questions = [ new Question ("Informe seu nome completo: "),
      new Question("Descreva sua solicitação... ") ]

    super(chat_id, questions, SUCCESS_MESSAGE, NAME)
  }

  static get NAME(){
    return NAME;
  }
}

module.exports = SecretaryRequest;
