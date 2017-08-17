var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var apis       = require('./server/apis'); 
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/apis', apis);


app.use(express.static(__dirname + '/public')); 

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


mongoose.connect(process.env.DB || 'mongodb://localhost/leado');


var port = process.env.PORT || 8080;        

app.listen(port);
console.log('Listening on ' + port);
