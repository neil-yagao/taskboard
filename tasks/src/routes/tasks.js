var express = require('express');
var router = express.Router();
var taskService = require('../tasks/task-services');
var successHandle = require('./common').success;
var errorHandle = require('./common').failure;
/* GET users listing. */
router.get('/', function (req, res) {
	taskService.findTasks({ignoreDetail:true})
		.then(task => successHandle(task, res))
		.catch(err => errorHandle(err, res));
});

router.get('/:id', function (req, res) {
	taskService.findTasks({
		_id: req.params.id
	}).then(task => successHandle(task, res))
		.catch(err => errorHandle(err, res));
});

router.post('/', function (req, res) {
	taskService.insertTask(req.body)
		.then(task => successHandle(task, res))
		.catch(err => errorHandle(err, res));
});

router.put('/:id/bids', function (req, res) {
	taskService.bidOnProject(req.params.id,req.body)
		.then(task => successHandle(task, res))
		.catch(err => errorHandle(err, res));
});

router.post('/:id/bids',function(req,res){
	taskService.acceptBid(req.params.id,req.body)
		.then(task =>{
			successHandle(task,res);
		});
});

router.get('/user/:id/bided-tasks',function(req,res){
	taskService.tasksBidedBy(req.params.id)
		.then(task =>{
			successHandle(task,res);
		});
});

router.get('/user/:id/created-tasks',function(req,res){
	taskService.tasksCreatedBy(req.params.id)
		.then(task =>{
			successHandle(task,res);
		});
});
module.exports = router;