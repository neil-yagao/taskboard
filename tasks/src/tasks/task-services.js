var tasks = require('../db/schema/task');
var bids = require('../db/schema/bid');
const TASK_ACCEPTED = 'ACCEPTED';
var taskServices = {
	insertTask(task) {
		if (!task) {
			return '';
		}
		return tasks.create(task);
	},
	findTasks(condition) {
		if (condition.ignoreDetail) {
			delete condition.ignoreDetail;
			return tasks.find(condition);
		}
		return tasks
			.find(condition)
			.populate('creator')
			.populate({
				path: 'bidDetails',
				populate: {
					path: 'creator'
				}
			});
	},
	bidOnProject(taskId, bidDetail) {
		return new Promise(function(resolve, reject) {
			tasks
				.findById(taskId)
				.then(task => {
					if (!task.bidDetails) {
						task.bidDetails = [];
					}
					bidDetail.task = task._id;
					bids.create(bidDetail).then(bidDetail => {
						task.bidDetails.push(bidDetail._id);
						task.bids = task.bids ? task.bids + 1 : 1;
						task.save(function(err, doc) {
							if (err) {
								reject(err);
							}
							doc.populate('bidDetails').then(res => {
								resolve(res);
							});
						});
					});
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	acceptBid(taskId, bidDetail) {
		return new Promise(function(resolve, reject) {
			tasks.findById(taskId).then(task => {
				task.acceptedBid = bidDetail._id;
				task.status = TASK_ACCEPTED;
				task.save(function(err, t) {
					if (err) {
						reject(err);
						return;
					}
					console.log('t', t);
					resolve(t);
				});
			});
		});
	},
	tasksCreatedBy(creator) {
		return tasks.find({ creator: creator }).populate('bidDetails');
	},
	tasksBidedBy(creator) {
		return new Promise(function(resolve, reject) {
			bids
				.find({ creator: creator })
				.populate({
					path: 'task',
					populate: {
						path: 'bidDetails',
						match: { creator: creator }
					}
				})
				.populate('creator')
				.exec(function(err, bids) {
					if (err) {
						reject(err);
						return;
					}
					resolve(bids);
				});
		});
	}
};

module.exports = taskServices;
