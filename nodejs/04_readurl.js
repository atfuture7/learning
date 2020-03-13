// read request
var http = require('http');
var url = require('url');

http.createServer( function (req, res) {
	res.writeHead( 200, {'Content-Type' : 'text/html'});
	var sUrl = req.url;
	var q = url.parse(sUrl, true).query;
	//var qKey = Object.keys(q);
	//res.write(Object.keys(q).toString());
	for (var index in q ){
		res.write("key:" + index + " = value: " + q[index] +"<br>\n");
	}
	res.end();
}).listen( 8080);

// 0312 example from https://www.w3schools.com/nodejs/nodejs_http.asp
// with modification
// retrieve keys of object:urlObject.query
