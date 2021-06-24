const mongoose = require('mongoose');
const userWarnSchema = require('../schemas/userWarnSchema.js');

module.exports.userWarnModel = mongoose.model('userWarnModel', userWarnSchema.userWarnSchema);