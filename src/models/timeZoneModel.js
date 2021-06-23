const mongoose = require('mongoose');
const timeZoneSchema = require('../schemas/timeZoneSchema.js');

module.exports.timeZoneModel = mongoose.model('timeZoneModel', timeZoneSchema.timeZoneSchema );