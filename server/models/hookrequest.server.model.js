var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    hookId  : Schema.Types.ObjectId,
    data    : {},
    filterPassed : {
        type: Boolean,
        default: false
    },
    actionCompleted : {
        type: Boolean,
        default: false
    },
    attempts  : {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('hookrequestdetails', RequestSchema);