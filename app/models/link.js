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

var Link = mongoose.model('url', urlSchema);

urlSchema.on('init', function(linkModel){
  linkModel.on('creating', function(model, attrs, options){
    var shasum = crypto.createHash('sha1');
    shasum.update(linkModel.url);
    linkModel.code = shasum.digest('hex').slice(0, 5);
  });
});


// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
