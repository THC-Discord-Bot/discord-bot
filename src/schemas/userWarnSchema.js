const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports.userWarnSchema = new Schema({
  userID: Number,
  username: String,
  warnings: Number
});
