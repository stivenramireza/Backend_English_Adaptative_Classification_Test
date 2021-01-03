var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';
    
/** Configuraciòn de la base de datos */
var config = {
  development: {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    API_EACI: process.env.API_EACI
  },
  test: {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    API_EACI: process.env.API_EACI
  },
  production: {  
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    API_EACI: process.env.API_EACI
  }
};
module.exports = config[env];
