const DEFAULT_LIMIT     = 10;
const DEFAULT_PAGE      = 1;

var HooksLib        = require('../../library/hooks.server.library');
exports.getAllHooks =   function (req, res) {
    var limit   = req.query.limit || DEFAULT_LIMIT;
    var page    = req.query.page || DEFAULT_PAGE;

    return HooksLib.getAllWebhooks(page, limit).then(function (data) {
        res.json({status: true, data: data})
    }).catch(function (err) {
        res.json({status: true, err: err.message});
    })
}