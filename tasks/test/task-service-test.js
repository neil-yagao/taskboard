var expect = require('chai').expect;
var TaskService = require('../src/tasks/task-services');
var UserService = require('../src/user/user-services');
var Task = require('../src/db/schema/task');
var Bids = require('../src/db/schema/bid');
var taskDetail = {
	name: 'test-task',
	description: 'this is a description on the task',
	skills: ['123'],
	budget: 'random',
	creator: {}
};

var bidDetail = {
	price: 'randome price',
	description: 'random description blabla',
	creator: {}
};

var id = '';

describe('TaskService', function() {
	this.timeout(5000);
	before(function(done) {
		require('../src/db/mongo-connection').then(() => {
			UserService.findUser({ username: 'testOnly' }).then(res => {
				taskDetail.creator = res;
				bidDetail.creator = res;
				done();
			});
		});
	});
	it('add new Task', function(done) {
		TaskService.insertTask(taskDetail)
			.then(res => {
				id = res._id;
				expect(res.name).to.equal(taskDetail.name);
				expect(res.description).to.equal(taskDetail.description);
				expect(res.budget).to.equal(taskDetail.budget);
				expect(res.skills).to.be.a('array');
				expect(res.skills.length).to.equal(1);
				expect(res.createdDate).to.be.a('date');
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it('find task via object id', function(done) {
		if (!id) {
			done(new Error('fail to save task directly failed.'));
		}
		TaskService.findTasks({ _id: id })
			.then(res => {
				var task = res[0];
				expect(task.name).to.equal(taskDetail.name);
				expect(task.description).to.equal(taskDetail.description);
				expect(task.budget).to.equal(taskDetail.budget);
				expect(task.skills).to.be.a('array');
				expect(task.skills.length).to.equal(1);
				expect(task.createdDate).to.be.a('date');
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it('bid on task', function(done) {
		if (!id) {
			done(new Error('fail to save task directly failed.'));
		}
		TaskService.bidOnProject(id, bidDetail)
			.then(task => {
				expect(task.bidDetails).to.be.a('array');
				expect(task.bidDetails.length).to.equal(1);
				expect(task.bids).to.equal(1);
				let savedBids = task.bidDetails[0];
				expect(savedBids._id).to.not.be.null;
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it('accept bid', function(done) {
		if (!id) {
			done(new Error('fail to save task directly failed.'));
		}
		TaskService.acceptBid(id, bidDetail)
			.then(task => {
				expect(task.acceptedBid).to.not.be.null;
				expect(task.acceptedBid._id).to.equal(bidDetail._id);
				expect(task.status).to.equal('ACCEPTED');
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it('found task created by me', function(done) {
		TaskService.tasksCreatedBy({ _id: taskDetail.creator._id }).then(
			tasks => {
				expect(tasks.length).to.equal(1);
				expect(tasks[0].bidDetails.length).to.equal(1);
				done();
			}
		);
	});

	it('found task bided by me', function(done) {
		TaskService.tasksBidedBy({ _id: taskDetail.creator._id })
			.then(tasks => {
				expect(tasks.length).to.equal(1);
				expect(tasks[0].myBid).to.not.be.null;
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	after(function(done) {
		Task.remove({ _id: id }, function() {
			Bids.remove({ price: bidDetail.price }, function() {
				console.log('cleared');
				done();
			});
		});
	});
});
