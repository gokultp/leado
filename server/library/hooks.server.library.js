var HooksModel  = require('../models/hooks.server.model');
var Promise     = require('bluebird');

exports.getAllWebhooks  = function (page, limit) {
    var skip = (page -1) * limit;

    return new Promise(function (resolve, reject) {
        HooksModel.find({})
                    .skip(skip)
                    .limit(limit)
                    .exec(function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
    
}