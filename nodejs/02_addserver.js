// first server

var http = require('http');
var dt = require('./03_newmodule');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	res.write("The date and time are currently " + dt.myDateTime() );
	
	res.end('Hello World');
}).listen(8080);

// 0312 example from https://www.w3schools.com/nodejs/nodejs_get_started.asp