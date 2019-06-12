const Admin = require("../models/admin")
const bcrypt = require('bcrypt');
const service = require("../services")
const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');

/**
 * Functión que permite registrar un administrador en la base de datos
 * @param  {json} req
 * @param  {json} res
 * @returns JSON del administrador registrado
 */
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
        currentdepartment: req.body.currentdepartment,
        currentcity: req.body.currentcity,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        sede: req.body.sede,
        habilitar_examenes: req.body.habilitar_examenes,
        reactivar_examenes: req.body.reactivar_examenes,
        gestionar_estadisticas: req.body.gestionar_estadisticas,
        clasificar_aspirantes: req.body.clasificar_aspirantes
    });
    new_admin.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al crear el administrador: ${err}`,
            status: 'failed'
        })
        return res.status(200).send({
            message: 'Registro exitoso del administrador',
            token: service.createToken(new_admin),
            status: 'success'
        })
    })
}

/**
 * Función que permite loguear a un administrador al sistema
 * @param  {json} req
 * @param  {json} res
 * @returns JSON del administrador logueado
 */
function loguearAdmin(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    Admin.findOne({ username: req.body.username }).select('username password habilitar_examenes administrador_general gestionar_estadisticas clasificar_aspirantes').exec(function (err, new_admin) {
        if (err) return res.status(500).send({ 
            message: err,
            status: 'failed'
        })
        if (new_admin == null) {
            return res.status(404).send({ 
                message: 'Admin incorrecto',
                status: 'failed'
            })
        }
        req.session.user = {};
        req.session.user.type = 2;
        req.session.user.habilitar_examenes = new_admin.habilitar_examenes;
        req.session.user.administrador_general = new_admin.administrador_general;
        req.session.user.gestionar_estadisticas = new_admin.gestionar_estadisticas;
        req.session.user.clasificar_aspirantes = new_admin.clasificar_aspirantes;
        if (bcrypt.compareSync(req.body.password, new_admin.password)) {
            req.new_admin = new_admin
            res.status(200).send({
                message: 'Login correcto del administrador',
                token: service.createToken(new_admin),
                status: 'success'
            })
        }else {
            res.status(500).send({
                message: 'Login incorrecto del administrador',
                token: service.createToken(new_admin),
                status: 'failed'
            })
        }
    })
}

/**
 * Función que recibe un número y lo convierte en un string del tipo de documento
 * @param  {int} _number
 * @returns Tipo de documento
 */
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

/**
 * Función que recibe un número y lo convierte en un string de un tipo de género
 * @param  {int} _number
 * @returns Género
 */
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

/**
 * Función que permite obtener la información del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns JSON de la información del administrador
 */
function getInfoAdmin(req, res) {
    let username = req.query.username;
    Admin.find({ username: username }, (err, info_admin) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`, status: 'failed' })
        if (!info_admin) return res.status(404).send({ message: `El admin no está registrado en la BD`, status: 'failed' })
        res.status(200).send({ info_admin, status: 'success' })
    })
}

/**
 * Función que permite actualizar la información del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns JSON de la actualización del administrador
 */
function updateInfoAdmin(req, res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    let idAdmin = req.query.idAdmin;
    let update = req.body
    Admin.update({_id: idAdmin}, update, (err, adminUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la información del admin: ${err}`, status: 'failed' })
        res.status(200).send({ new_admin: adminUpdated, status: 'success' })
    })
}

/**
 * Función que permite editar la información del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns JSON de la edición del administrador
 */
function editarAdmin(req, res){
    let docnumber = req.query.docnumber;
    Admin.findOne({docnumber: docnumber }, (err, info_admin) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`, status: 'failed' })
        if (!info_admin) return res.status(404).send({ message: `El admin no está registrado en la BD`, status: 'failed' })
        res.status(200).send({ info_admin, status: 'success' })
    })
}

module.exports = {
    registrarAdmin,
    loguearAdmin,
    getInfoAdmin,
    updateInfoAdmin,
    editarAdmin
}
