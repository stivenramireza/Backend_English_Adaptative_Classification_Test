const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExamenSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true}, // doctype del aspirante
    docnumber: {type: String, required: true}, // docnumber del aspirante
    questions: [Number], // preguntas que le salieron
    responses: [Boolean], // respuestas que entregó a esas preguntas
    grade: {type: Number, required: true},
    part1: {type: Number, required: true},
    part2: {type: Number, required: true},
    part3: {type: Number, required: true}, // calificación total
    classified_level: {type: String, required: true}, // nivel de clasificación
    fecha: {type: Date, default: Date.now }, // fecha en la que realizó el examen
    hora_inicio: {type: String, required: true}, // hora en la que empezó el examen
    hora_fin: {type: String, required: true}, // hora en la que terminó el examen
    clasificador: {type: String, required: true}, // clasificador del aspirante
    last_ability: {type: Number, required: true}, // curva de aprendizaje del aspirante en el examen
    parts: [Number] // niveles de dificultad de las preguntas
},
{
    timestamps: true
});

module.exports = mongoose.model('Examen', ExamenSchema, 'examenes'); // exportar