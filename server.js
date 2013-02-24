var http = require('http'),
	fs = require('fs'),
	url = require('url');

//	custom modules
var router = require('./router');

var PUBLIC_DIR = './public';
var PORT = 1887;

//	create a server
var server = http.createServer();

//	handler for requests
server.on('request', function(req, res){

	var responseCode,
		requestedFile = url.parse(req.url).pathname;

	//	Should this be handled by the routes?
	console.log(typeof router.routes[req.url] === 'function');

	//	give a default page
	if(requestedFile === '/'){
		requestedFile = '/index.html';
	}

	//	What file are they requesting?
	console.log('requested: ' + requestedFile);
	
	//	does file exist?
	fs.exists(PUBLIC_DIR + requestedFile, function(exists){

		if(exists){
			responseCode = 200;			
		} else {
			responseCode = 404;
			requestedFile = '/404.html';
		};

		//	read the file
		fs.readFile(PUBLIC_DIR + requestedFile, function(err, contents){

			//	send the response
			res.writeHead(responseCode, {
				// 'content-type': 'text/html'
			});
			res.end(contents);
		});
	});
});

//	start listening
server.listen(PORT);

console.log('listening on port ' + PORT);