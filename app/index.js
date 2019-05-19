const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
var passport = require('passport');
var expressSession = require('express-session');

// Conexión a la base de datos
//let dbConn = 'mongodb://user1:123456a@ds025232.mlab.com:25232/eacidb';
let dbConn = "mongodb://" + config.DB_USER + ":" + config.DB_PASSWORD + "@" + config.DB_HOST;
mongoose.connect(dbConn, {useNewUrlParser: true}).then( (req, res) => {
  console.log("Conectado a la base de datos exitosamente");
}).catch( err => {
  console.log("Error al conectarse a la base de datos: ", {$err});
});

 // Middleware
const bodyParser = require('body-parser');
server.use(express.static(path.join(__dirname, 'views')));
server.use(bodyParser.urlencoded( { extended: false } ) );
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Configuring Passport
server.use(expressSession({secret: 'mikey'}));
server.use(passport.initialize());
server.use(passport.session());

 // Attach routes as middleware
server.use(routes);

const PORT = 8000;
const HOST = '0.0.0.0'; 

server.listen(PORT, HOST, function(req, res){
  console.log('\nApp web corriendo en http://localhost:'+PORT+'\n');
});

server.get('/', (req, res) => {
  res.redirect('/signin');  
});

module.exports = server;