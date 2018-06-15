var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema(
	{
		preference: {
			type: [String]
		},
		realName: String,
		nickName: String,
		skills: [String],
		certificate: [String],
		headImage: String,
		level: String,
		experience: Number
	},
	{
		timestamps: {
			createdAt: 'createdDate',
			updatedAt: 'updatedDate'
		}
	}
);
