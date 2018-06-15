var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profile = require('./user-profile');
module.exports = mongoose.model(
	'User',
	new Schema(
		{
			id: Schema.Types.ObjectId,
			username: {
				type: String,
				unique: true
			},
			password: String,
			email: String,
			profile: Profile
		},
		{
			timestamps: {
				createdAt: 'createdDate',
				updatedAt: 'updatedDate'
			}
		}
	)
);
