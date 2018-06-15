const config = require('../../config/app');
var mongoose = require('mongoose')
module.exports = mongoose.connect(config.db.address);