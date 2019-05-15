const service = require("../services")
const {validationResult} = require('express-validator/check');
const mongoose = require('mongoose');

function registrarPregunta(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const nueva_pregunta = new Student({
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
            token: service.createToken(nueva_pregunta),
            status: 'success'
        })
    })
}

function getInfoPregunta(req, res){
    console.log("get")
    let n_item = req.query.n_item;
    Examen.findOne({ n_item: n_item }, (err, info_pregunta) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!info_pregunta) return res.status(404).send({ 
            message: `La pregunta no está registrada`, 
            status: 'failed'
        })
        res.status(200).send({ info_pregunta })
    })
}

module.exports = {
    registrarPregunta,
    getInfoPregunta
}