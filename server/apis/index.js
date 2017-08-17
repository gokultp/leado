var apis = require('express').Router(); 
var hooks = require('./hooks');

apis.use('/hooks', hooks);

module.exports = apis;