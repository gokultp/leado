var router          = require('express').Router(); 
var controller      = require('./controller'); 


router.get('/', controller.getAllHooks)

module.exports = router;