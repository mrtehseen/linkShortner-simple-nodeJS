'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var parseBody = require('body-parser');
var app = express();

var urlHandler = require('./controllers/urlHandler.js');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect("mongodb+srv://tehseen:1234@cluster0-7aqup.mongodb.net/test?retryWrites=true&w=majority");

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(parseBody.urlencoded({'extended': false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Link Shortning End Point

app.post('/api/shorturl/new', urlHandler.addUrl);
  
app.get('/api/shorturl/:shurl', urlHandler.processShortUrl);



app.listen(port, function () {
  console.log('Node.js listening ...');
});