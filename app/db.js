var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';
var config = {
  development: {
    PORT: process.env.PORT,
    DB_HOST: process.env.MONGODB_URI,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_TOKEN: process.env.JWT_TOKEN
  },
  test: {
    PORT: process.env.PORT,
    DB_HOST: process.env.MONGODB_URI,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_TOKEN: process.env.JWT_TOKEN
  },
  production: {  
    PORT: process.env.PORT,
    DB_HOST: process.env.MONGODB_URI,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_TOKEN: process.env.JWT_TOKEN
  }
};
console.log(config[env]);
module.exports = config[env];
