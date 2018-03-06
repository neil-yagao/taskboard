var dbObject = require( '../db/mongo-connection' )
var mongojs = require( 'mongojs' )
var JSONStream = require( 'JSONStream' )

var taskCollection = dbObject.collection( 'tasks' );
var taskServices = {
	insertTasks( tasks ) {
		if ( !tasks ) {
			return '';
		}
		taskCollection.insert( tasks )
	},
	findTasks( condition ) {
		if ( condition[ '_id' ] ) {
			condition[ '_id' ] = mongojs.ObjectId( condition[ '_id' ] )
		}
		return taskCollection.find( condition ).pipe( JSONStream.stringify() );
	},

	updateTask( update ) {
		var condition = update.condition;
		var operation = update.operation;
		if ( condition[ '_id' ] ) {
			condition[ '_id' ] = mongojs.ObjectId( condition[ '_id' ] )
		}
		taskCollection.update( condition, operation, {
			multi: true
		}, )
	}

}

module.exports = taskServices;