var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
	'Task',
	new Schema(
		{
			id: Schema.Types.ObjectId,
			name: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			skills: {
				type: [String],
				required: true
			},
			budget: {
				type: String,
				required: true
			},
			bidDetails: {
				type: [
					{
						type: Schema.Types.ObjectId,
						ref: 'Bid'
					}
				]
			},
			bids: {
				type: Number
			},
			acceptedBid: {
				type: Schema.Types.ObjectId,
				ref: 'Bid'
			},
			creator: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			status: {
				type: String
			}
		},
		{
			timestamps: {
				createdAt: 'createdDate',
				updatedAt: 'updatedDate'
			}
		}
	)
);
