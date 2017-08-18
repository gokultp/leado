const URL            = process.env.CLOUDAMQP_URL || 'amqp://localhost';
const QUEUE_NAME     = 'hooks';
var QueueLib         = require('../library/queue.server.library');
var HooksLib         = require('../library/hooks.server.library');
var ActionsLib       = require('../library/actions.server.library');
var request			 = require('request-promise');
var amqp             = require('amqplib');

var Filter           = require('../helpers/filters.server.helper');
const PLACEHOLDER	 = /\{{2}([^}]+)\}{2}/g
var mongoose   = require('mongoose');


mongoose.connect(process.env.DB || 'mongodb://localhost/leado');


var connection
// Consumer 
amqp.connect(URL).then(function(conn) {
    connection = conn;
    return conn.createChannel();

}).then(function(ch) {

    ch.prefetch(10);
    return ch.assertQueue(QUEUE_NAME).then(function(ok) {
        
        console.log('Listening queue')

    
        return ch.consume(QUEUE_NAME, function(msg) {
            if (msg !== null) {
                return runActions(ch, msg)
                .catch(function (err) {
                    console.error(err)
                })
            }
            return
        
                
           
        })
       
    });
}).catch(console.warn);


var runActions  = function (ch, msg) {
    var payload  = JSON.parse(msg.content.toString());
    console.log('Got Job -------------', payload.actionId);
    return QueueLib.getActionById(payload.actionId)
        .then(function (actionData) {
            
            if(!actionData){
                return ch.reject(msg, false);                
            }
            return executeAction(actionData).then(function () {
                return ch.ack(msg)
            }).catch(function (params) {
                return ch.reject(msg, true);                
            })
            
    })
}

var executeAction   = function (requestData) {
    return HooksLib.getHookById(requestData.hookId).then(function (webhook) {
        var filter  = new Filter(webhook.filter);
        var result  = filter.apply(requestData.data);

        QueueLib.updateActionById(requestData._id, {filterPassed: result});
        
        if(result){
            return ActionsLib.getActionById(webhook.actionId).then(function (action) {
                var options     = new Object();
                options.url     = action.url;
                options.method  = action.method;
                options.headers = action.customHeaders;
                
                
                var payload     = new Object();

                for( k in webhook.mapping){
                    var data    = webhook.mapping[k];
                    placeHolders    = data.match(PLACEHOLDER);
                    placeHolders.forEach(function(key) {
                        var fieldName = key.substring(2,key.length-2);
                        var regex   = new RegExp(key, 'g')
                        
                        data = data.replace(regex, requestData.data[fieldName])
                    });
                    payload[k]  = data;
                }

                options.form    = payload;
                return request(options);


            })

        }
        return Promise.resolve({});
    })
}