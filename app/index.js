const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./db');
require('dotenv').config();
const session = require('express-session');

let dbConn = 'mongodb://' + db.DB_USER + ":" + db.DB_PASSWORD + "@" + db.DB_HOST;
mongoose.connect(dbConn, {useNewUrlParser: true}).then( (req, res) => {
  console.log("Conectado a la base de datos exitosamente");
}).catch( err => {
  console.log("Error al conectarse a la base de datos: ", err);
});

const bodyParser = require('body-parser');
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

var sess = {
  secret: 'keyboard cat',
  cookie: {
    maxAge: 5 * 60000 
  },
  resave: true,
  saveUninitialized: true
}
server.use(session(sess));

server.use(routes);

const PORT = 8000;
const HOST = '0.0.0.0'; 

server.listen(PORT, HOST, function(req, res){
  console.log('\nApp web corriendo en el puerto:'+PORT+'\n');
});

server.get('/', (req, res) => {
  res.redirect('/signin');  
});

module.exports = server;
