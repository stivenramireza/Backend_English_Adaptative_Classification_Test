/**
 * /app/index.js
 * Exports an express server.
*/

const express = require('express');
const server = express();
const routes = require('./routes/routes');
const config = require('./config');
const mongoose = require('mongoose');


// Connection String
let dbConn = "mongodb://" + config.DB_USER + ":" + config.DB_PASSWORD + "@" + config.DB_HOST;


mongoose.connect(dbConn, {useNewUrlParser: true}).then( () => {
  console.log(`Connected to ${dbConn} successfully...`);
}).catch( err => {
  console.log(`Error connecting to ${dbConn}, cause: ${err}`);
  //process.exit();
});

 // Middleware
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded( { extended: false } ) );
server.use(bodyParser.json());

 // Attach routes as middleware

server.use(routes);

const PORT = 8000;
const HOST = '0.0.0.0'; // Listen from everywhere

server.listen(PORT, HOST, function(){
  console.log(`Listening to ${PORT} on ${HOST}.\n`);
});

 server.get('/', (req, res) => {
   res.send('EACI Team App Test 1');
 });

module.exports = server;