var mongoose = require('mongoose');
var path = require('path');

var dbDomain = process.env.dbDomain || '127.0.0.1';
var dbUser = process.env.dbUser || 'localUser';
var dbPassword = process.env.dbPassword || 'localPassword';

var db = mongoose.connection;
db.on('error', console.error);

db.once('open', function(){
  console.log('Connected to mongo database')
});

mongoose.connect(dbDomain);

module.exports = db;
