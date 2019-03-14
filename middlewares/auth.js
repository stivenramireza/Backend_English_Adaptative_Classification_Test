
const services = require('../services')

function isAuth(req, res, next) {
    if (!req.headers.authorization) return res.status(403).send({ message: "Not authorization" })
    const token = req.headers.authorization
    services.decodeToken(token) 
            .then(response =>{
                req.username = response
                next()
            })
            .catch(response =>{
                res.status(response.status)
            })
}

module.exports = isAuth