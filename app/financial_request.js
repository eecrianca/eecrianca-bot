let Request = require('./request')
let Question = require('./question')

const NAME = "Financeiro",
SUCCESS_MESSAGE = 'Sua solicitação foi efetuada com sucesso. Em até 72h ela será atendida.';

let FinancialRequest = class FinancialRequest extends Request {
  constructor (chat_id) {
    let questions = [ new Question ("Informe seu nome completo: "),
      new Question("Descreva sua solicitação... ") ]

    super(chat_id, questions, SUCCESS_MESSAGE, NAME)
  }

  static get NAME(){
    return NAME;
  }
}

module.exports = FinancialRequest;
