const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const AdminSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true},
    docnumber: {type: String, required: true, unique: true},
    adminType: {type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    genre: {type: String, required: true},
    birthdate: {type: String, required: true},
    currentcity: {type: String, required: true },
    address: {type: String, required: true},
    phonenumber: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, select: false}
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