// first server

// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer(function (req, res) {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body "Hello World"
  res.end("Hello World\n");
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 20240310 old version is not working. 
//	over write with the frame from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

// 20200312 example from https://www.w3schools.com/nodejs/nodejs_get_started.asp
