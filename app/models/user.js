var mongoose = require('mongoose');
var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  timestamps: Date
})

userSchema.methods.comparePassword = function(attemptedPassword, callback){
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch){
    callback(isMatch);
  });
};
userSchema.methods.hashPassword = function(callback){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      callback();
    });
};

userSchema.pre('save', function(next){
  this.hashPassword(function(){
    next();
  });
});

var User = mongoose.model('user', userSchema);

module.exports = User;
