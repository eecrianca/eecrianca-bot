let Request = require('./request')
let Question = require('./question');

const NAME = "Secretaria",
SUCCESS_MESSAGE = 'Sua solicitação foi efetuada com sucesso. Em até 72h ela será atendida.';

var SecretaryRequest = class SecretaryRequest extends Request {
  constructor (attrs = {}) {
    let questions = [ new Question ("Informe seu nome completo: "),
      new Question("Descreva sua solicitação... ") ]

    super(attrs, questions, SUCCESS_MESSAGE, NAME)
  }
}

module.exports = SecretaryRequest;
