var apis = require('express').Router(); 
var hooks = require('./hooks');
var actions = require('./actions')

apis.use('/hooks', hooks);

apis.use('/actions', actions);


module.exports = apis;