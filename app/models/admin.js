const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const AdminSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true},
    docnumber: {type: String, required: true, unique: true},
    estado: {type: Boolean, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    genre: {type: String, required: true},
    birthdate: {type: String, required: true},
    currentdepartment: {type: String, required: true},
    currentcity: {type: String, required: true },
    phonenumber: {type: String},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, select: false},
    sede: {type: String, required: true},
    habilitar_examenes: {type: Boolean, required: true},
    administrador_general: {type: Boolean, required: true},
    gestionar_estadisticas: {type: Boolean, required: true},
    clasificar_aspirantes: {type: Boolean, required: true}
})

AdminSchema.pre('save', function (next) {
    let admin = this
    bcrypt.hash(admin.password, 10, function (err, hash) {
        if (err) return next(err)
        admin.password = hash
        next()
    });
})

module.exports = mongoose.model('Admin', AdminSchema, 'admins');
