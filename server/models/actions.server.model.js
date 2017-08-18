var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
    name            : String,
    url             : String,
    method          : String,
    fields          : [String],
    customHeaders   : {}

});

module.exports = mongoose.model('actiondetails', ActionSchema);