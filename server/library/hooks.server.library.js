var HooksModel  = require('../models/hooks.server.model');
var Promise     = require('bluebird');
var mongoose    = require('mongoose');

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


exports.saveSampleData  = function (id, sampleData) {
    return new Promise(function (resolve, reject) {
        HooksModel.findByIdAndUpdate(mongoose.Types.ObjectId(id)
                    , {$set: {sampleData: sampleData}}
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}

exports.getHookById = function (id) {
    return new Promise(function (resolve, reject) {
        HooksModel.findById(mongoose.Types.ObjectId(id)
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}


exports.updateHook  = function (id, update) {
    return new Promise(function (resolve, reject) {
        HooksModel.findByIdAndUpdate(mongoose.Types.ObjectId(id)
                    , {$set: update}
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}

exports.deleteHook  = function (id) {
    return new Promise(function (resolve, reject) {
        HooksModel.remove({_id: mongoose.Types.ObjectId(id)}
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}

exports.createHook  = function (data) {
    var webhook     = new HooksModel(data);
    if(process.env.NODE_ENV == "production"){
        webhook.url = "http://leado.herokuapp.com/apis/hooks/" + webhook._id;
    }
    else{
        webhook.url = "http://localhost:8080/apis/hooks/" + webhook._id;
    }
    return  new Promise(function (resolve, reject) {
        webhook.save(function (err, hook) {
            if(err){
                return reject(err)
            }
            return resolve(hook);
        })
    })
        
}