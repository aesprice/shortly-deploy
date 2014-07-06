var mongoose = require('mongoose');
var db = require('../config');
var crypto = require('crypto');

var urlSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  url: String,
  base_url: String,
  code: Number,
  title: String,
  visits: {type: Number, default: 0},
  timestamps: Date
});

urlSchema.on('init', function(linkModel){
  linkModel.on('creating', function(model, attrs, options){
    var shasum = crypto.createHash('sha1');
    shasum.update(linkModel.url);
    linkModel.code = shasum.digest('hex').slice(0, 5);
  });
});

var Link = mongoose.model('url', urlSchema);

module.exports = Link;
