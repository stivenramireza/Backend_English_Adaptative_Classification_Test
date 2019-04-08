const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExamenSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true}, // doctype del aspirante
    docnumber: {type: String, required: true, unique: true}, // docnumber del aspirante
    questions: [String], // preguntas que le salieron
    responses: [String], // respuestas que entregó a esas preguntas
    grade: {type: String, required: true}, // calificación total
    classified_level: {type: String, required: true}, // nivel de clasificación
    fecha: {type: Date, default: Date.now }, // fecha en la que realizó el examen
    hora_inicio: {type: String, required: true}, // hora en la que empezó el examen
    hora_fin: {type: String, required: true}, // hora en la que terminó el examen
    duracion_examen: {type: String, required: true}, // duración total del examen
    clasificador: {type: String, required: true} // clasificador del aspirante
},
{
    timestamps: true
});

module.exports = mongoose.model('Examen', ExamenSchema, 'examenes');