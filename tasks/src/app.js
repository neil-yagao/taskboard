var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('../config/app')
var tasks = require('./routes/tasks');
var user = require('./routes/user');
require('./db/mongo-connection');

var app = express();
global.defaultSuccess = {
	success: true,
	msg: 'op success'
};
// omit due to
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(cookieParser());
app.use('/static',express.static(config.fileStore.location));

app.use('/tasks', tasks);
app.use('/users', user);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	//direct return error message
	res.status(err.status || 500);
	console.log('err', err);
	res.json({
		success: false,
		msg: err.message
	});
});

module.exports = app;
