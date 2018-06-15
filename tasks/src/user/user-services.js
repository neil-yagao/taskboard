var User = require('../db/schema/user');

var userService = {
	registerUser(user) {
		var userModel = new User(user);

		return new Promise(function (resolve, reject) {

			userModel.profile = {
				nickName:user.username,
				level:'初学乍练',
				experience:0
			};
			userModel.save(function (err, user) {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
	},
	findUser(user) {
		return User.findOne(user);
	},
	loginUser(user) {
		var condition = {
			$or: [{
				email: user.loginId
			}, {
				username: user.loginId
			}],
			password: user.password
		};
		return new Promise(function (resolve,reject) {
			User.findOne(condition).then(function (doc,err) {
				if (err) {
					reject(err);
				} else {
					if (doc) {
						resolve(doc);
					} else {
						reject( '登录信息错误');
					}
				}
			});
		});
	},
	changeUserProfile(userId, profile) {
		return new Promise(function (resolve, reject) {
			User.findById(userId, function (err, doc) {
				if (err) {
					reject(err);

				}
				doc.profile = profile;
				doc.save(function (err, newDoc) {
					if (err) {
						reject(err);
					} else {
						resolve(newDoc);
					}
				});
			});
		});

	},
	changeUserHeader(userId,head){
		return User.findById(userId).then(function(doc){
			if(!doc.profile){
				doc.profile = {};
			}
			doc.profile.headImage = head;
			return doc.save();
		});
	}
};

module.exports = userService;