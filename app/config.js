var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.MONGODB_URI || 'mongodb://user1:123456a@ds025232.mlab.com:25232/eacidb',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    SECRET_TOKEN: process.env.JWT_TOKEN || 'mikey' 
  },
  test: {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.MONGODB_URI || 'mongodb://user1:123456a@ds025232.mlab.com:25232/eacidb',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    SECRET_TOKEN: process.env.JWT_TOKEN || 'mikey'
  },
  production: {
    // Not yet
  }
};

module.exports = config[env];