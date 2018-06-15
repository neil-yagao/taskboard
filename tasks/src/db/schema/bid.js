var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Bid', new Schema({
	id: Schema.Types.ObjectId,
	price: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	task: {
		type: Schema.Types.ObjectId,
		ref: 'Task'
	}
}, {
	timestamps: {
		createdAt: 'createdDate',
		updatedAt: 'updatedDate'
	}
}));