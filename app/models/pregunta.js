const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Modelo de datos de la Pregunta */
const PreguntaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pregunta: {type: String, required: true},
    parte: {type: Number, required: true},
    n_item: {type: Number, required:true, unique:true},
    dificultad: {type: Number, required: true},
    opcion_correcta: {type: [String], required: true},
    texto: {type: [String], required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('Pregunta', PreguntaSchema, 'questions');
