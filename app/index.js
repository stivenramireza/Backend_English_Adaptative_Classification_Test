const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./db');

// Conexión a la base de datos
let dbConn = 'mongodb://user1:123456a@ds025232.mlab.com:25232/eacidb';
//let dbConn = "mongodb://" + db.DB_USER + ":" + db.DB_PASSWORD + "@" + db.DB_HOST;
mongoose.connect(dbConn, {useNewUrlParser: true}).then( (req, res) => {
  console.log("Conectado a la base de datos exitosamente");
}).catch( err => {
  console.log("Error al conectarse a la base de datos: ", err);
});

 // Middleware
const bodyParser = require('body-parser');
server.use(express.static(path.join(__dirname, 'views')));
server.use(bodyParser.urlencoded( { extended: false } ) );
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

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
