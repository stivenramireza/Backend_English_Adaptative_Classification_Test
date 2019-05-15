const Pregunta = require('../models/pregunta');
const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');

function registrarPregunta(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const nueva_pregunta = new Pregunta({
        _id : mongoose.Types.ObjectId(),
        pregunta: req.body.pregunta,
        n_item: req.body.n_item,
        parte: req.body.parte,
        dificultad: req.body.dificultad,
        opcion_correcta: req.body.opcion_correcta,
        texto: req.body.texto
    });
    //save in the database
    nueva_pregunta.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al registrar la pregunta: ${err}`,
            status: 'failed'
        })
        return res.status(200).send({
            message: 'Registro exitoso de la pregunta',
            status: 'success'
        })
    })
}

function obtenerPregunta(req, res){
    let n_item = req.query.n_item;
    Pregunta.findOne({ n_item: n_item }, (err, info_pregunta) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!info_pregunta) return res.status(404).send({ message: `La pregunta no está registrada en la BD` })
        res.status(200).send({ info_pregunta })
    })
}

function actualizarPregunta(req, res){
    let item_pregunta = req.query.item_pregunta;
    let update = req.body
    Pregunta.update({n_item: item_pregunta}, update, (err, questionUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la pregunta en la BD: ${err}` })
        console.log(questionUpdated)
        res.status(200).send({ new_candidate: questionUpdated })
    })
}

module.exports = {
    registrarPregunta,
    obtenerPregunta,
    actualizarPregunta
};