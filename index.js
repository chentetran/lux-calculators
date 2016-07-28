var express = require('express');
var bodyParser = require('body-parser'); // Required if we need to use HTTP query or post parameters

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); //serve static content

// Homepage
app.get('/', function(req, res) {
	res.set('Content-Type', 'text/html');
	return res.sendFile(__dirname + '/public/index.html');
});

app.get('/retirement', function(req, res) {
	res.set('Content-Type', 'text/html');
	return res.sendFile(__dirname + '/public/retirement.html');
});

app.post('/retirement', function(req, res) {

});

app.listen(process.env.PORT || 3000);