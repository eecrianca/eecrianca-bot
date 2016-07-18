
const INITIAL = "1",
      ASKED = "2",
      ANSWERED = "3";

let Question = class Question {
  constructor (text = "") {
    this.text = text;
    this.answer = null;
    this.status = 1;
  }

  //constants
  static get INITIAL() {
    return INITIAL;
  }

  static get ASKED() {
    return ASKED;
  }

  static get ANSWERED() {
    return ANSWERED;
  }

}

module.exports = Question;
