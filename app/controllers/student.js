const Student = require('../models/student');
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadTest(req, res){
    res.render("../views/test/test.ejs")
}

function loadLoginCandidate(req, res){
    res.render("../views/login-candidate/login-candidate.ejs")
}

function login(req, res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    Student.findOne({doctype: fromNumberToDocType(req.body.doctype), docnumber: req.body.docnumber}).then((found_student, err) => {
        if(!found_student){
            res.status(401).json({
                message: 'Auth error, student not found.',
                errors: errors.array()
            });
        }else{
            const token = jwt.sign(
                {
                    docnumber: req.body.docnumber,
                },  
                (process.env.JWT_KEY || 'mykey'), 
                {
                    expiresIn: "1h"
                }
            );
            res.status(200).json({
                message: 'Student authenticated.',
                token: token,
                errors: errors.array()
            });
        }
    });
}

function register(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const new_student = new Student({
        //assign request fields to the user attributes
        _id : mongoose.Types.ObjectId(),
        doctype: fromNumberToDocType(req.body.doctype),
        docnumber: req.body.docnumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        genre: fromNumberToGenre(req.body.genre),
        birthdate: req.body.birthdate,
        currentcity: req.body.currentcity,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    });
    //save in the database
    new_student.save().then(saved_student => {
        //return 201, message and user details
        res.status(201).json({
            message: 'Student created!',
            student: saved_student,
            errors: errors.array()
        });
    }).catch((err) => {
        console.log(err);
    });
}

function fromNumberToDocType(_number){
    switch(_number){
        case 1:
            return "Cédula de Ciudadanía";
        case 2:
            return "Cédula de Ciudadanía Ecuatoriana";
        case 3:
            return "Cédula de Extranjería";
        case 4:
            return "Cédula de Guatemala";
        case 5:
            return "Cédula de Panamá";
        case 6:
            return "Código de Estudiante";
        case 7:
            return "Documento Nacional de Identidad";
        case 8:
            return "Documento Personal Identificación";
        case 9:
            return "Nro Único Identificación Personal";
        case 10:
            return "Otro";
        case 11:
            return "Pasaporte";
        case 12:
            return "Registro";
        default:
            return "Tarjeta de Identidad";
    }
    return "";
}

function fromNumberToGenre(_number){
    switch(_number){
        case 1:
            return "Masculino";
        case 2:
            return "Femenino";
        default: 
            return "Otro";
    }
    return "";
}
module.exports = {
    loadTest,
    loadLoginCandidate,
    login,
    register
};


