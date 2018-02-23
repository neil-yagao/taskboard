const config = require('../../config/app');
var mongojs = require('mongojs')
var db = mongojs(config.db.address,[])

module.exports = db;
