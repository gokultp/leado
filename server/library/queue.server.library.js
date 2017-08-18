var RequestModel  = require('../models/hookrequest.server.model');
var Promise     = require('bluebird');
var mongoose    = require('mongoose');


exports.getActionById   =   function (id) {
    return new Promise(function (resolve, reject) {
        RequestModel.findOneAndUpdate({
                        _id :mongoose.Types.ObjectId(id),
                        attempts : {$lt: 3}
                    }, {$inc: {attempts: 1}}
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}


exports.updateActionById   =   function (id, update) {
    return new Promise(function (resolve, reject) {
        RequestModel.findByIdAndUpdate(mongoose.Types.ObjectId(id)
                    , {$set: update}
                    , function(err, data) {
                        if(err){
                            return reject(err)
                        }
                        return resolve(data);
                    })
    })
}

exports.saveAction  = function (data) {
    var action     = new RequestModel(data);
    
    return  new Promise(function (resolve, reject) {
        action.save(function (err, res) {
            if(err){
                return reject(err)
            }
            return resolve(res);
        })
    })
}


exports.enqueue = function (connection,qName, payload) {
    
       
    return connection.createConfirmChannel().then(function(ch) {
        var strPayload      = JSON.stringify(payload);
        ch.sendToQueue(qName, new Buffer(strPayload))
        var await = ch.waitForConfirms();
        return await.then(function(ok) {
            ch.close()
            return ok
        }).catch(function (err) {
            ch.close()
            return Promise.reject(err);
        })
                    
    })
        
    
}