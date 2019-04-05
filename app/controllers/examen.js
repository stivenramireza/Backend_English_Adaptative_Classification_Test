const Student = require('../models/student');
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadPreStarted(req, res){
    res.render('../views/test-prestarted/html/test-prestarted.ejs');
}

function loadTest(req, res){
    res.render('../views/examen/html/examen.ejs');
}

module.exports = {
    loadPreStarted,
    loadTest
};