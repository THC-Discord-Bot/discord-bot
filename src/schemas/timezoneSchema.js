const mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.timezoneSchema = new Schema({
  userID: Number,
  username: String,
  timezone: String
});

// var timezoneSchema = new Schema({
//   userID: Number,
//   timezone: String
// });

