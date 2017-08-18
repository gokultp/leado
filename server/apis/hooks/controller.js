const DEFAULT_LIMIT     = 10;
const DEFAULT_PAGE      = 1;
const URL                = process.env.CLOUDAMQP_URL || 'amqp://localhost';
const QUEUE_NAME         = 'hooks';
var amqp                 = require('amqplib');

var HooksLib        = require('../../library/hooks.server.library');
var QueueLib        = require('../../library/queue.server.library');

var connection
// Consumer 
amqp.connect(URL).then(function(conn) {
    connection = conn;
});


exports.getAllHooks =   function (req, res) {
    var limit   = Number(req.query.limit || DEFAULT_LIMIT);
    var page    = Number(req.query.page || DEFAULT_PAGE);

    return HooksLib.getAllWebhooks(page, limit).then(function (data) {
        res.json({status: true, data: data})
    }).catch(function (err) {
        res.json({status: false, err: err.message});
    })
}

exports.testHook    = function (req, res) {
    return HooksLib.saveSampleData(req.params.id, req.body)
        .then(function () {
            res.json({status: true})
        })
        .catch(function (err) {
            res.json({status: false});
        })
}

exports.getHook     = function (req, res) {
    return HooksLib.getHookById(req.params.id)
        .then(function (data) {
            res.json({status: true, data: data})
        }).catch(function (err) {
            res.json({status: false, err: err.message});
        })
}

exports.updateHook  = function (req, res) {

    if(!req.body.id && req.body.update && req.body.update.name){
        return HooksLib.createHook(req.body.update)
            .then(function (data) {
                res.json({status: true, data: data})
            }).catch(function (err) {
                res.json({status: false, err: err.message});
            })
    }

    if(req.body.id){
        return HooksLib.updateHook(req.body.id, req.body.update)
            .then(function (data) {
                res.json({status: true, data: data})
            }).catch(function (err) {
                res.json({status: false, err: err.message});
            })
    }

    res.json({status: false});
    return;

    
}


exports.deleteHook  =function (req, res) {
    return HooksLib.deleteHook(req.params.id)
        .then(function (data) {
            res.json({status: true, data: data})
        }).catch(function (err) {
            res.json({status: false, err: err.message});
        })
}

exports.doHookAction    = function (req, res) {
    return QueueLib.saveAction({
        hookId : req.params.id,
        data: req.body
    }).then(function (data) {
        return QueueLib.enqueue(connection, QUEUE_NAME, {actionId: data._id})
            .then(function (params) {
                res.json({status: 'enqueued'})
            })
    })
}

