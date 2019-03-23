var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost/database-geolocator',
    SECRET_TOKEN: 'tokenGeolocator' 
  },

  test: {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://mongo-server/database-geolocator',
    SECRET_TOKEN: 'tokenGeolocator'
  },

  production: {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://mongo-server/database-geolocator',
    SECRET_TOKEN: 'tokenGeolocator'
  }
};

module.exports = config[env];