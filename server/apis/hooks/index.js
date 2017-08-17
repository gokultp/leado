var router = require('express').Router(); 

router.get('/', function (req, res) {
    res.json({name: 'Gokul'})
})

module.exports = router;