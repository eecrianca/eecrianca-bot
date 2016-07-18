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


var express = require('express');
var packageInfo = require('./package.json');

var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
//
// app.post('/' + token, function (req, res) {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });
