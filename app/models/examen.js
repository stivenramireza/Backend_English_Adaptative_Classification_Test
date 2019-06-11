const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExamenSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true},
    docnumber: {type: String, required: true}, 
    questions: {type: [String], maxItems: 21}, 
    responses: {type: [Boolean], maxItems: 21}, 
    grade: {type: Number, required: true},
    part1: {type: Number, required: true},
    part2: {type: Number, required: true},
    part3: {type: Number, required: true},
    classified_level: {type: String, required: true}, 
    final_level: {type: String, required: true},
    fecha: {type: Date, default: Date.now }, 
    hora_inicio: {type: String, required: true}, 
    hora_fin: {type: String, required: true},
    clasificador: {type: String, required: true}, 
    last_ability: {type: Number, required: true}, 
    parts: {type: [Number], maxItems: 21}
},
{
    timestamps: true
});

module.exports = mongoose.model('Examen', ExamenSchema, 'examenes');