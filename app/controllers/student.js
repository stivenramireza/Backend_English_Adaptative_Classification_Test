const Student = require('../models/student');
const service = require("../services")
const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');

function getInfoCandidate(req, res) {
    let docnumber = req.query.docnumber;
    Student.findOne({ docnumber: docnumber }, (err, info_candidate) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`, status: 'failed' })
        if (!info_candidate) return res.status(404).send({ message: `El aspirante no está registrado en la BD`, status: 'failed' })
        res.status(200).send({ info_candidate, status: 'success' })
    })
}

function updateInfoCandidate(req, res){
    let idCandidate = req.query.idCandidate;
    let update = req.body
    Student.update({_id: idCandidate}, update, (err, candidateUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la información del aspirante: ${err}`, status: 'failed' })
        res.status(200).send({ new_candidate: candidateUpdated, status: 'success' })
    })
}

function updateCandidateByDoc(req, res){
    let docnumber = req.query.docnumber;
    let update = req.body
    Student.update({docnumber: docnumber}, update, (err, candidateUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la información del aspirante: ${err}`, status: 'failed' })
        res.status(200).send({ new_candidate: candidateUpdated, status: 'success' })
    })
}

function login(req, res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    //console.log("################## REQ ###################");
    //console.log(req.body);
    Student.findOne({ doctype: fromNumberToDocType(req.body.doctype), docnumber: req.body.docnumber }).select('doctype +docnumber').exec(function (err) {
        if (err) return res.status(500).send({ 
            message: err,
            status: 'failed' 
        })
        req.session.user = {};
        req.session.user.docnumber = req.body.docnumber;
        req.session.user.doctype =   req.body.doctype;
        req.session.user.views = 1;
        req.session.user.type = 1;
        return res.status(200).send({
            message: 'Login exitoso del aspirante',
            docnumber: req.body.docnumber,
            status: 'success'
        })
    })
}

function register(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const new_candidate = new Student({
        _id : mongoose.Types.ObjectId(),
        doctype: fromNumberToDocType(req.body.doctype),
        docnumber: req.body.docnumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        genre: fromNumberToGenre(req.body.genre),
        birthdate: req.body.birthdate,
        currentdepartment: req.body.currentdepartment,
        currentcity: req.body.currentcity,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        mobilephonenumber: req.body.mobilephonenumber,
        email: req.body.email,
        examen_activo: req.body.examen_activo
    });
    new_candidate.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al crear el aspirante: ${err}`,
            status: 'failed' 
        })
        return res.status(200).send({
            message: 'Registro exitoso del aspirante',
            token: service.createToken(new_candidate),
            status: 'success'
        })
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
    _number = parseInt(_number);
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
    login,
    register,
    getInfoCandidate,
    updateInfoCandidate,
    updateCandidateByDoc
};


