'use strict'

const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const api = require("./routes")

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', api)

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/login/login.html")
})

// Error 404 Not Found
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle Errors
app.use(function(err, req, res, next) {
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
      if(err[0] && err[0].msg){
      res.status(500).json({message: "There was an error : " + err[0].msg});
      }
  });

module.exports = app