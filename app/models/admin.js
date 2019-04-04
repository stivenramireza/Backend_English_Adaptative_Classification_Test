const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, unique: false, required: true },
    lastname: { type: String, unique: false, required: true },
    lastname: { type: String, unique: false, required: true },
    username: {type: String, unique: true, required: true },
    doctype: {type: String, required: true},
    docnumber: {type: String, required: true},
    birthdate: {type: Date, required: true},
    maritalstatus: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'users');