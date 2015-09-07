/**
 * Created by AshZhang on 15/8/24.
 */


'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    express = require('express'),
    app = express(),
    Bourne = require('bourne'),
    DB_ROOT = path.resolve(__dirname, 'db'),
    DB_ID = 'id',
    API_BASE = /^\//,
    PORT = 9090;


// Settings
// ---------------------------

app.disable('x-powered-by');
app.use(compression());
app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/build'));


// Middleware
// ---------------------------

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// REST API
// ---------------------------

app.use(function (req, res, next) {
  var urlParams = req.url.replace(API_BASE, '').split('/');

  req.dbName = urlParams[0].split('?')[0];
  req.id = +urlParams[1];
  delete req.body.id;

  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  next();
});

// GET
app.get('/:a?/:b?/:c?/:d?', function (req, res) {
  var db = new Bourne(path.resolve(DB_ROOT, req.dbName + '.json')),
      query = {};

  if (!req.id) {
    res.json(db.data);
  } else {
    query[DB_ID] = req.id;

    db.findOne(query, function (err, result) {
      if (err || !result) return res.sendStatus(404);
      res.json(result);
    });
  }
});


// POST
app.post('/:a?/:b?/:c?/:d?', function (req, res) {
  var db = new Bourne(path.resolve(DB_ROOT, req.dbName + '.json'));

  if (Object.keys(req.body).length) {

    db.insert(req.body, function (err, doc) {
      if (err) return res.send(400);
      res.json(doc);
    });
  } else {
    res.sendStatus(400);
  }
});


// PUT
app.put('/:a?/:b?/:c?/:d?', function (req, res) {
  var db = new Bourne(path.resolve(DB_ROOT, req.dbName + '.json')),
      query = {};

  if (Object.keys(req.body).length) {
    query[DB_ID] = req.id;

    db.update(query, {
      $set: req.body
    }, function (err) {
      if (err) return res.send(400);
      res.sendStatus(200);
    });
  }
});


// DELETE
app.delete('/:a?/:b?/:c?/:d?', function (req, res) {
  var db = new Bourne(path.resolve(DB_ROOT, req.dbName + '.json')),
      query = {};

  query[DB_ID] = req.id;

  db.delete(query, function (err) {
    if (err) return res.send(400);
    res.sendStatus(200);
  });
});


// Listening
// ---------------------------

app.listen(app.get('port'), function () {
  console.log('Listening at port: ' + app.get('port'));
});