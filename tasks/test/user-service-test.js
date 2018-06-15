var expect = require('chai').expect;
var UserService = require('../src/user/user-services');
require('../src/db/mongo-connection');
var req = require('./console-response');
var User = require('../src/db/schema/user');

var testUser = {
	username: 'testOnly',
	password: '123456',
	email: 'neilhu68@yahoo.com'
};
var userDefaultProfile = {
	preference: ['java', 'javascript'],
	realName: 'neil hu',
	skills: ['java', 'linux', 'vue', 'javascript'],
	certificate: ['English'],
	level: 1,
	experience: 100
};
describe('UserService', function() {
	describe('registerUser-newUser', function() {
		var userId = '';
		it('should find register user correctly', function(done) {
			UserService.registerUser(testUser, req)
				.then(res => {
					expect(res.username).to.equal(testUser.username);
					expect(res.password).to.equal(testUser.password);
					expect(res.email).to.equal(testUser.email);
					expect(res.createdDate).to.be.a('date');
					expect(res.profile).to.not.be.null;
					userId = res._id;
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		it('should throw a error', function(done) {
			UserService.registerUser(testUser, req)
				.then(res => {
					throw 'should not be successful register';
				})
				.catch(err => {
					expect(err).to.not.be.null;
					done();
				});
		});
		it('should find user via username correctly', function(done) {
			UserService.findUser({ username: testUser.username })
				.then(res => {
					expect(res.username).to.equal(testUser.username);
					expect(res.password).to.equal(testUser.password);
					expect(res.email).to.equal(testUser.email);
					expect(res.createdDate).to.be.a('date');
					expect(res.profile).to.not.be.null;
					expect(res.profile).to.be.a('object');
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		it('should login user via username correctly', function(done) {
			UserService.loginUser(
				{ loginId: testUser.username, password: testUser.password },
				req
			)
				.then(res => {
					expect(res.username).to.equal(testUser.username);
					expect(res.password).to.equal(testUser.password);
					expect(res.email).to.equal(testUser.email);
					expect(res.createdDate).to.be.a('date');
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		it('should login user via email correctly', function(done) {
			UserService.loginUser(
				{ loginId: testUser.email, password: testUser.password },
				req
			)
				.then(res => {
					expect(res.username).to.equal(testUser.username);
					expect(res.password).to.equal(testUser.password);
					expect(res.email).to.equal(testUser.email);
					expect(res.createdDate).to.be.a('date');
					done();
				})
				.catch(err => {
					done(err);
				});
		});

		it('change user profile', function(done) {
			UserService.changeUserProfile(userId, userDefaultProfile)
				.then(res => {
					expect(res._id).to.equal(userId);
					var profile = res.profile;
					expect(profile).to.be.a('object');
					expect(profile.preference).to.be.a('array');
					expect(profile.skills).to.be.a('array');
					expect(profile.certificate).to.be.a('array');
					expect(profile.realName).to.equal(
						userDefaultProfile.realName
					);
					expect(profile.nickName).to.equal(res.username);
					expect(profile.level).to.equal(userDefaultProfile.level);
					expect(profile.experience).to.equal(
						userDefaultProfile.experience
					);
					done();
				})
				.catch(err => {
					done(err);
				});
		});

		after(function() {
			User.remove({ username: testUser.username }, function() {
				console.log('cleared');
			});
		});
	});
});
