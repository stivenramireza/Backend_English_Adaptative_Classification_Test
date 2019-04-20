const Admin = require("../models/admin")
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const path = require('path');

const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadLoginAdmin(req, res){
    res.render("../views/login-admin/login-admin.ejs");
}

function loadProfile(req, res){
    res.render("../views/admin-profile/admin-profile.ejs");
}

function logout(req, res){
    res.redirect('/');
}

function loadProfileRegister(req, res){
    res.render("../views/admin-profile/admin-register.ejs");
}

function loadExamEnable(req, res){
    res.render("../views/admin-profile/admin-exam-enable.ejs");
}

function loadExamReactivate(req, res){
    res.render("../views/admin-profile/admin-exam-reactivate.ejs");
}

function loadGrade(req, res){
    res.render("../views/admin-profile/admin-grade.ejs");
}


function registrarAdmin(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const new_admin = new Admin({
        _id : mongoose.Types.ObjectId(),
        doctype: fromNumberToDocType(req.body.doctype),
        docnumber: req.body.docnumber,
        estado: req.body.estado,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        genre: fromNumberToGenre(req.body.genre),
        birthdate: req.body.birthdate,
        currentcity: req.body.currentcity,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        mobilephonenumber: req.body.mobilephonenumber,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        habilitar_examenes: req.body.habilitar_examenes,
        reactivar_examenes: req.body.reactivar_examenes,
        gestionar_estadisticas: req.body.gestionar_estadisticas,
        clasificar_aspirantes: req.body.clasificar_aspirantes
    });
    //save in the database
    new_admin.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al crear el administrador: ${err}` 
        })
        return res.status(200).send({
            message: 'Registro exitoso del administrador',
            token: service.createToken(new_admin)
        })
    })
}

function loguearAdmin(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    Admin.findOne({ username: req.body.username }).select('username +password').exec(function (err, new_admin) {
        if (err) return res.status(500).send({ 
            message: err 
        })
        if (new_admin == null) {
            return res.status(404).send({ 
                message: 'Admin incorrecto' 
            })
        }
        if (bcrypt.compareSync(req.body.password, new_admin.password)) {
            req.new_admin = new_admin
            res.status(200).send({
                message: 'Login correcto del administrador',
                token: service.createToken(new_admin),
                status: "success"
            })
        }else {
            res.status(500).send({
                message: 'Login incorrecto del administrador',
                token: service.createToken(new_admin),
                status: "failed"
            })
        }
    })
}

function fromNumberToDocType(_number){
    _number = parseInt(_number);
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
    registrarAdmin,
    loguearAdmin,
    loadLoginAdmin,
    loadExamEnable,
    loadExamReactivate,
    loadGrade,
    loadProfile,
    logout,
    loadProfileRegister
}