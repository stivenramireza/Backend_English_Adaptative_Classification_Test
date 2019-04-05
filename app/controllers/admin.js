const Admin = require("../models/admin")
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadLoginAdmin(req, res){
    res.render("../views/login-admin/login-admin.ejs")
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
        adminType: req.body.adminType,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        genre: fromNumberToGenre(req.body.genre),
        birthdate: req.body.birthdate,
        currentcity: req.body.currentcity,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //save in the database
    new_admin.save().then(saved_admin => {
        //return 201, message and user details
        res.status(201).json({
            message: 'Admin created!',
            admin: saved_admin,
            errors: errors.array()
        });
    }).catch((err) => {
        console.log(err);
    });
}

function loguearAdmin(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    console.log(fromNumberToDocType(req.body.doctype) + " : " + req.body.docnumber);
    Admin.findOne({username: req.body.username, password: req.body.password}).then((found_admin, err) => {
        if(!found_admin){
            res.status(401).json({
                message: 'Auth error, admin not found.',
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
            res.status(400).json({
                token: token,
                message: "Token has been sent."
            });
        }
    });
}

function userProfile(req, res) {
    var token = req.headers['x-access-token'];
    if(!token){
        //res.status(401).send({
        //    error: "It's required an authorization token."   
        //});
        res.status(401).send({
            admit: false,
            message: "Invalid token"
        });
    }else{
        jwt.verify(token, (process.env.JWT_KEY || 'mykey'), (err, admin) => {
            if(err){
                console.log("Verified.");
                res.status(400).json({
                    admit: false,
                    message: "The token doesn't exist."
                });
            }else{
                Admin.findOne({docnumber: admin.docnumber}, (err, admin) => {
                    if(!admin){
                        res.status(500).json({
                            admit: false,
                            message: "The admin doesn't exists"
                        });
                    }else{
                        res.status(201).json({
                            admit: true,
                            message: "Admin logged in."
                        });
                    }
                });
            }
        });
    }
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
    userProfile
}