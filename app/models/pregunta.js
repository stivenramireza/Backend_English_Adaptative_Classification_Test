const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PreguntaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pregunta: {type: String, required: true}, // enunciado de la pregunta
    n_item: {type: Number, required: true}, // n_item de la pregunta
    parte: {type: Number}, required: true, // parte de la pregunta
    dificultad: {type: Number, required: true}, // dificultad de la pregunta
    opcion_correcta: {type: [String]}, // opciones de respuesta de la pregunta
    texto: {type: [String]} // opcion correcta de la pregunta
},
{
    timestamps: true
});

module.exports = mongoose.model('Pregunta', PreguntaSchema, 'questions'); 