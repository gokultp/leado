var router          = require('express').Router(); 
var controller      = require('./controller'); 


router.get('/', function (req, res) {
    res.json({name: 'Gokul'})
})

module.exports = router;