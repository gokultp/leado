var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TriggerSchema = new Schema({
    name            : String,
    url             : String,
    filter          : [],
    published       : {
        type : Boolean,
        default : false
    },
    sampleData : {},
    action  : String,
    mapping : {},
    actionId : Schema.Types.ObjectId

});

module.exports = mongoose.model('hookdetails', TriggerSchema);