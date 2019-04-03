/**
 * /app/routes/routes.js
 * Export an express route.
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const mongoose = require('mongoose');

 //to encrypt
const bcrypt = require('bcrypt');
const userCtlr = require('../controllers/user');
const studentCtrlr = require('./../controllers/student');
const loginCtlr = require('../controllers/login')

 // It will contain all the end points
const router = express.Router();

const {check, validationResult} = require('express-validator/check');

//router.get('/test/pre-started', userCtlr.loadTest);

//router.get('/login/candidate', userCtlr.loadLoginCandidate);

router.get('/signin/candidate', studentCtrlr.loadLoginCandidate);
router.get('/signin/admin', userCtlr.loadLoginAdmin);
router.get('/signin', loginCtlr.loadLogin);
router.post('/signin/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), //validate,
    check('docnumber').isNumeric().isLength({min: 5})
], studentCtrlr.login);
router.post('/register/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), //validate,
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('birthdate').matches("[0-9]+\/[0-9]+\/[0-9]+").isLength({min: 6}),
    check('currentcity').isAlphanumeric().isLength({min: 3}),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber').isMobilePhone().isLength({max: 12}),
    check('email').isEmail().isLength({min: 7})
], studentCtrlr.register);
router.get('/candidate/profile', studentCtrlr.userProfile);
//router.get('/student/logout', studentCtrlr.logout);
module.exports = router;