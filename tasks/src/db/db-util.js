var mongojs = require('mongojs')
var db = {};
var moment = require('moment')
db.parseConditionId = function (condition) {
    if (condition['_id']) {
        condition['_id'] = mongojs.ObjectId(condition['_id'])
    }
}
db.addCreatedTimeAttribute = function (data) {
    if (!data.createdDate) {
        data.createdDate = moment().format(
            'YYYY-MM-DD HH:mm');
        data.createTimestamp = moment().format('x')
    }
}
module.exports = db;