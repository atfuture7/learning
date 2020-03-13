// read file 
var http = require('http');
var fs = require('fs');

http.createServer( function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./05_sample.html', function (err, data) {
		res.write(data);
		res.write('test end');
		// res must end in catch function. 
		res.end();
	});
}).listen(8080);

// 0312 example from https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// special restriction on ERR_STREAM_WRITE_AFTER_END