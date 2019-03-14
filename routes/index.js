const express = require('express')
const userController = require("../controllers/user")
const api  = express.Router()
const auth = require('../middlewares/auth')

api.post("/signup", userController.registrar)
api.post('/login', userController.loguear)
api.post("/location", auth, userController.agregarGPSLocation)
api.get("/locations", auth, userController.obtenerGPSLocation)
api.get("/logout", auth, userController.cerrarSesion)

module.exports = api