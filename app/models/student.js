const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctype: {type: String, required: true},
    docnumber: {type: String, required: true, unique: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    genre: {type: String, required: true},
    birthdate: {type: String, required: true},
    currentcity: {type: String, required: true },
    address: {type: String, required: true},
    phonenumber: {type: String, required: true},
    email: {type: String, required: true, unique: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema, 'students');