const express = require('express');
const path = require('path');
const logger = require('morgan');
const api = require('./api');
const bodyParser = require('body-parser');
const app = express();

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'ruey61312'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
*/
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api', api);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/wordreview',function(req,res){
  //var wordcards = JSON.stringify(req.body);
  var wordcards = req.body;
  console.log(wordcards);
  console.log(typeof(wordcards));
  var json2csv = require('json2csv');
  var fields = ['name','trans','testTime','number','total'];
  var fs = require('fs');
  var path = require('path');
  var filePath = path.join(__dirname, 'test.csv');
  var opts = {
    data: wordcards,
    fields: fields,
    quotes: ''
  };
  json2csv(opts,function(err, csv){
    if(err)console.log(err);
    console.log(csv);
    fs.writeFile(filePath,csv,function(err){
      if(err)throw err;
      console.log('file saved');
    });
  });
  /*
  fs.writeFile(filePath, JSON.stringify(req.body), function (err) {
    if (err) return console.log(err);
    console.log('write done');
  });
  */
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
