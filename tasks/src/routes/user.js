var express = require( 'express' );
var router = express.Router();
var userService = require('../user/user-services.js')


router.post('/', function(req,resp,next){
  userService.registerUser(req.body,resp);
})

router.post('/login',function(req,res,next){
  userService.loginUser(req.body,res)
})
module.exports = router;
