var ActionsModel    = require('../models/actions.server.model');
var mongoose        = require('mongoose');
var Promise         = require('bluebird');



exports.getAllActions  = function () {

    return new Promise(function (resolve, reject) {
        ActionsModel.find({},function(err, data) {
            if(err){
                return reject(err)
            }
            return resolve(data);
        })
    })
    
}


exports.getActionById  = function (id) {
    
        return new Promise(function (resolve, reject) {
            ActionsModel.findById(mongoose.Types.ObjectId(id),function(err, data) {
                if(err){
                    return reject(err)
                }
                return resolve(data);
            })
        })
        
    }
