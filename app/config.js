var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.MONGODB_URI || 'mongodb+srv://sramir70:pass123@eafitclasscluster-bvmzy.mongodb.net/test?retryWrites=true',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    SECRET_TOKEN: process.env.JWT_TOKEN || 'mikey' 
  },
  test: {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.MONGODB_URI || 'mongodb+srv://sramir70:pass123@eafitclasscluster-bvmzy.mongodb.net/test?retryWrites=true',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    SECRET_TOKEN: process.env.JWT_TOKEN || 'mikey'
  },
  production: {
    // Not yet
  }
};

module.exports = config[env];