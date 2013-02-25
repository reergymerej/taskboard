var http = require('http'),
	fs = require('fs'),
	url = require('url');

//	custom modules
var rest = require('./rest');

var PUBLIC_DIR = './public';
var PORT = 1887;

//	create a server
var server = http.createServer();

//	handler for requests
server.on('request', function(req, res){

	var responseCode,
		requestedFile = url.parse(req.url).pathname,
		data = '';


	//	collect data posted with request
	req.on('data', function(chunk){
		data += chunk;
	});

	req.on('end', function(){
		
		//	Should this be handled by the routes?
		if(req.url.indexOf('/Task') === 0){
			rest.handle(req, res, data);
			return;
		};

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

});

//	start listening
server.listen(PORT);

console.log('listening on port ' + PORT);