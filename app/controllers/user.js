const bcrypt = require('bcrypt');
const User = require("../models/user")
const service = require("../services")
const fs = require('fs');

function loadTest(req, res){
    res.render("../views/test/test.ejs")
}

function loadLoginCandidate(req, res){
    res.render("../views/login-user/login-user.ejs")
}

function loadLoginAdmin(req, res){
    res.render("../views/login-admin/login-admin.ejs")
}

function registrar(req, res) {
    const user = new User({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    user.save((err) => {
        if (err) return res.status(500).send({
             message: `Error al registrarse: ${err}` 
        })
        return res.status(200).send({ 
            token: service.createToken(user) })
        })
    }

function loguear(req, res) {
    User.findOne({ username: req.body.username }).select('username +password').exec(function (err, user) {
        if (err) return res.status(500).send({ 
            message: err 
        })
        if (user == null) {
            return res.status(404).send({ 
                message: 'Usuario incorrecto' 
            })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.user = user
            res.status(200).send({
                message: 'Login correcto',
                token: service.createToken(user),
            })
        }else {
            res.status(500).send({
                message: 'Login incorrecto',
                token: service.createToken(user),
            })
        }
    })
}

module.exports = {
    registrar,
    loguear,
    loadTest,
    loadLoginCandidate,
    loadLoginAdmin
}