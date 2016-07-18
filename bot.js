let App = require('./app/app');

app = new App(process.env.TOKEN);

app.on_message((message, request) => {
  //não mexa na ordem nos ifs.
  if (request.current_question.status == Question.ASKED){
    request.current_question.answer = message.text;
    request.current_question.status = Question.ANSWERED;

    request.next_question();
  }

  if (request.current_question && request.current_question.status == Question.INITIAL){
    app.send_message(request.chat_id, request.current_question.text);

    request.current_question.status = Question.ASKED;
  }

  if (request.is_closed()){
    app.send_message(request.chat_id,
      request.success_message + "\n\nPara me chamar novamente basta mandar um Oi que eu volto. ;) \n\nXau! :*");
    app.remove_request(request);
  }
});

app.on_callback((message) => {
  let type = message.data;

  app.new_request(message.from.id, type);
});
