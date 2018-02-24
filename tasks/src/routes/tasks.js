var express = require('express');
var router = express.Router();
var taskService = require('../tasks/task-services')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var result = taskService.findTasks({})
  res.json({'result':result})
});

module.exports = router;
