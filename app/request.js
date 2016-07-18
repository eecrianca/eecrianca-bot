Question = require('./question');

const FINANCIAL_TYPE = "1",
  SECRETARY_TYPE = "2",
  COORDINATION_TYPE = "3"

const OPEN = "1",
CLOSED = "2"

let Request = class Request {
  constructor (attrs = {}, questions, success_message, name) {
    this._current_question_num = 0
    this.chat_id = attrs.chat_id;
    this.success_message = success_message;
    this.name = name;
    this.questions = questions;
    this.status = 1;
  }

  get current_question() {
    return this.questions[this._current_question_num];
  }

  next_question() {
    this._current_question_num += 1;

    return this.questions[this._current_question_num];
  }

  is_closed(){
    var closed = true;
    for (var q of this.questions){
      if (q.status != Question.ANSWERED){
        closed = false
      }
    }
    return closed;
  }

  //constants
  static get FINANCIAL_TYPE(){
    return FINANCIAL_TYPE;
  }

  static get SECRETARY_TYPE(){
    return SECRETARY_TYPE;
  }

  static get COORDINATION_TYPE(){
    return COORDINATION_TYPE;
  }
}

module.exports = Request;
