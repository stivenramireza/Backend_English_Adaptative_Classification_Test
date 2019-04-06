const Student = require('../models/student');
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadLogin(req, res){
    res.render('../views/main/main.ejs');
}

module.exports = {
    loadLogin
};