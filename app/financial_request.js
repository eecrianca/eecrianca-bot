let Request = require('./request')
let Question = require('./question')

const NAME = "Financeiro",
SUCCESS_MESSAGE = 'Sua solicitação foi efetuada com sucesso. Em até 72h ela será atendida.';

let FinancialRequest = class FinancialRequest extends Request {
  constructor (attrs = {}) {
    let questions = [ new Question ("Informe seu nome completo: "),
      new Question("Descreva sua solicitação... ") ]

    super(attrs, questions, SUCCESS_MESSAGE, NAME)
  }
}

module.exports = FinancialRequest;
