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

module.exports = app