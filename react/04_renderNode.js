var http = require('http');
var fs = require('fs');

serverLis = function (req, res) {
	fs.readFile( './03_es6.html', function (err, data) {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(data);
		res.end();
	});
}

http.createServer( serverLis).listen(8080);