var router          = require('express').Router(); 
var controller      = require('./controller'); 


router.get('/', controller.getAllActions)



module.exports = router;