const DEFAULT_LIMIT     = 10;
const DEFAULT_PAGE      = 1;

var HooksLib        = require('../../library/hooks.server.library');
exports.getAllHooks =   function (req, res) {
    var limit   = Number(req.query.limit || DEFAULT_LIMIT);
    var page    = Number(req.query.page || DEFAULT_PAGE);

    return HooksLib.getAllWebhooks(page, limit).then(function (data) {
        res.json({status: true, data: data})
    }).catch(function (err) {
        res.json({status: true, err: err.message});
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

