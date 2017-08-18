var ActionsLib        = require('../../library/actions.server.library');


exports.getAllActions   = function (req, res) {
    return ActionsLib.getAllActions()
        .then(function (data) {
            res.json({status: true, data: data})
        }).catch(function (err) {
            res.json({status: false, err: err.message});
        })
}