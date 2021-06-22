const mongoose = require('mongoose');
const timezoneSchema = require('../schemas/timezoneSchema.js');

module.exports.timezoneModel = mongoose.model('timezoneModel', timezoneSchema.timezoneSchema );