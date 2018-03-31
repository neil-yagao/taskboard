var dbObject = require('../db/mongo-connection')
var JSONStream = require('JSONStream')
var dbUtil = require('../db/db-util')
var taskCollection = dbObject.collection('tasks');
var taskServices = {
    insertTask(task) {
        if (!task) {
            return '';
        }
        dbUtil.addCreatedTimeAttribute(task);
        taskCollection.insert(task)
    },
    findTasks(condition) {
        dbUtil.parseConditionId(condition);
        return taskCollection.find(condition).pipe(
            JSONStream.stringify());
    },

    updateTask(update, res) {
        var condition = update.condition;
        var operation = update.operation;
        dbUtil.parseConditionId(condition);
        console.log('condition', condition);
        console.log('operation', operation)
        taskCollection.update(condition, operation, {
            multi: true
        }, function (err, doc) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            }
            res.json({
                success: true,
                msg: doc
            })
        })
    }

}

module.exports = taskServices;