const service = require("../services");
const Examen = require('../models/examen');
const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');

function loadPreStarted(req, res){
    res.render('../views/test-prestarted/test-prestarted.ejs');
}

function loadTest(req, res){
    res.render('../views/examen/examen.ejs');
}

function loadResult(req, res){
    res.render('../views/examen-results/examen-results.ejs');
}

function activarExamen(req, res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const new_examen = new Examen({
        _id : mongoose.Types.ObjectId(),
        doctype: fromNumberToDocType(req.body.doctype),
        docnumber: req.body.docnumber,
        questions: req.body.questions,
        responses: req.body.responses,
        grade: req.body.grade,
        classified_level: req.body.currenclassified_leveltcity,
        fecha: req.body.fecha,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin,
        duracion_examen: req.body.duracion_examen,
        clasificador: req.body.clasificador
    });
    //save in the database
    new_examen.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al activar el examen del aspirante: ${err}` 
        })
        return res.status(200).send({
            message: 'Activación exitosa del examen del aspirante',
            token: service.createToken(new_candidate)
        })
    })
}

module.exports = {
    loadPreStarted,
    loadTest,
    loadResult,
    activarExamen
};