var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var apis       = require('./server/apis'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/apis', apis);


var port = process.env.PORT || 8080;        

app.listen(port);
console.log('Listening on ' + port);
