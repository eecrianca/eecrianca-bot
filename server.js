// 'use strict';
//
// const express = require('express');
//
// // Constants
// const PORT = 3000;
//
// // App
// const app = express();
// app.get('/', function (req, res) {
//   res.send('Hello world\n');
// });
//
// app.listen(PORT);
// console.log('Running on http://localhost:' + PORT);


let express = require('express');
let packageInfo = require('./package.json');
let Bot = require('./app/app');

let app = express();
let bot = new Bot(process.env.TOKEN);

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/' + process.env.TOKEN, function (req, res) {
  if (req.body){
    console.log('Webhook post ' + req.body.text);
  }
  bot.process_update(req.body);
  res.sendStatus(200);
});

bot.on_message((message, request) => {
  //não mexa na ordem nos ifs.
  if (request.current_question.status == Question.ASKED){
    request.current_question.answer = message.text;
    request.current_question.status = Question.ANSWERED;

    request.next_question();
  }

  if (request.current_question && request.current_question.status == Question.INITIAL){
    bot.send_message(request.chat_id, request.current_question.text);

    request.current_question.status = Question.ASKED;
  }

  if (request.is_closed()){
    bot.send_message(request.chat_id,
      request.success_message + "\n\nPara me chamar novamente basta mandar um Oi que eu volto. ;) \n\nXau! :*");
    bot.remove_request(request);
  }
});

bot.on_callback((message) => {
  let type = message.data;

  bot.new_request(message.from.id, type);
});
