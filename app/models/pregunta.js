const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PreguntaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pregunta: {type: String, required: true},
    parte: {type: Number, required: true},
    dificultad: {type: Number, required: true},
    opcion_correcta: {type: [String], required: true},
    texto: {type: [String], required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('Pregunta', PreguntaSchema, 'questions');