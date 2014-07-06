var mongoose = require('mongoose');
var path = require('path');

var dbDomain = process.env.dbDomain || '127.0.0.1';
var dbUser = process.env.dbUser || 'localUser';
var dbPassword = process.env.dbPassword || 'localPassword';

// var db = Bookshelf.initialize({
//   client: 'mongodb',
//   connection: {
//     host: dbDomain,
//     user: 'chocochip',
//     password: 'mmmelty',
//     database: 'shortlydb',
//     charset: 'utf8',
//   }
// });

var db = mongoose.connection;
db.on('error', console.error);

db.once('open', function(){
  console.log('Connected to mongo database')
});

mongoose.connect(dbDomain);

module.exports = db;



// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
