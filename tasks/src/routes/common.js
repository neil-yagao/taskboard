module.exports.success = function(success, res) {
	res.json({
		success: true,
		msg: success
	});
};

module.exports.failure = function(failure, res) {
	res.json({
		success: false,
		msg: failure
	});
};
