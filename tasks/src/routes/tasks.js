var express = require('express');
var router = express.Router();
var taskService = require('../tasks/task-services')

/* GET users listing. */
router.get('/', function (req, res, next) {
    var result = taskService.findTasks({}).pipe(res)
});

router.get('/:id', function (req, res, next) {
    var result = taskService.findTasks({
        _id: req.params.id
    }).pipe(res)
})

router.post('/', function (req, res, next) {
    taskService.insertTask(req.body)
    res.json(defaultSuccess)
})

router.post('/:id', function (req, res, next) {
    taskService.updateTask(req.body, res)
})

module.exports = router;