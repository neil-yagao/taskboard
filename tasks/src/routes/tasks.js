var express = require( 'express' );
var router = express.Router();
var taskService = require( '../tasks/task-services' )

/* GET users listing. */
router.get( '/', function ( req, res, next ) {
	var result = taskService.findTasks( {} ).pipe( res )
} );

router.get( '/:id', function ( req, res, next ) {
	var result = taskService.findTasks( {
		id: req.params.id
	} ).pipe( res )
} )

router.post( '/', function ( req, res, next ) {
	console.log( 'req body', req.body );
	taskService.insertTasks( req.body )
	res.json( defaultSuccess )
} )


module.exports = router;