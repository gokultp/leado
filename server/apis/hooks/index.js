var router          = require('express').Router(); 
var controller      = require('./controller'); 


router.get('/', controller.getAllHooks)
router.get('/:id', controller.getHook);
router.post('/:id/test', controller.testHook)
router.post('/update', controller.updateHook)
router.delete('/:id', controller.deleteHook)
router.post('/:id/', controller.doHookAction)



module.exports = router;