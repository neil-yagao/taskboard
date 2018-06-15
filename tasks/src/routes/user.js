var express = require('express');
var router = express.Router();
var userService = require('../user/user-services.js');
var common = require('./common');
var multer = require('multer');
var config = require('../../config/app');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, config.fileStore.location);
	},
	filename: function(req, file, cb) {
		cb(null,toFileName(req));
	}
});
var upload = multer({ storage: storage });

router.post('/', function(req, res) {
	userService
		.registerUser(req.body)
		.then(user => common.success(user, res))
		.catch(err => common.failure(err, res));
});

router.post('/login', function(req, res) {
	userService
		.loginUser(req.body)
		.then(user => common.success(user, res))
		.catch(err => common.failure(err, res));
});

router.post('/:id/profile', function(req, res) {
	userService
		.changeUserProfile(req.params.id, req.body)
		.then(user => common.success(user, res))
		.catch(err => common.failure(err, res));
});

router.get('/:id', function(req, res) {
	userService
		.findUser({ _id: req.params.id })
		.then(user => common.success(user, res));
});

router.post('/:id/head', upload.array('file'), function(req, res) {
	console.log('req', req.body);
	userService.changeUserHeader(req.params.id,toFileName(req) );
	common.success({}, res);
});


function toFileName(req){
	return req.params.id + '-' + req.body.name;
}
module.exports = router;
