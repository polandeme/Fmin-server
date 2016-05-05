/**
 * server
 */

var express = require('express');
var bodyParser = require('body-parser');

var apiV1Route = require('./routes/api_v1_route');

var app = express();

// app.use(require('connect'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', apiV1Route);
app.get('/', function(req, res) {
	res.send('hello express');
})

app.listen(3000, function() {
	console.log('listne success');
})