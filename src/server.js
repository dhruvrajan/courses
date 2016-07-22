var express = require('express');
var path = require('path');
var parser = require('body-parser');
var mongodb = require('mongodb');

var app = express();
var port = process.env.PORT || 3000;

// General configuration
app.use(express.static('public'));

// MongoDB configuration
// TODO: move db authentication info somewhere else
var db = null;
var courses = null;
var uri = 'mongodb://shrey:test@ds015335.mlab.com:15335/utcourses';
var MongoClient = mongodb.MongoClient;

// AJAX configuration
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/key', function(req, res) {
  // TODO: add search by course name
  var query = req.body['search'];
  var cursor = courses.find({'name': new RegExp(query, 'i')});
  cursor.toArray().then(function(docs) {
    res.json(docs);
  });
});

MongoClient.connect(uri, function(err, _db) {
  if (!err) {
    db = _db;
    courses = db.collection('courses');
    app.listen(port, function() {
      console.log('Node.js server started');
    });
  }
});
