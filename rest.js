//	use this file to handle REST stuff

//	this is included in server.js, but node will cache it
var url = require('url'),
	querystring = require('querystring'),
	db = require('./db');

/**
* @param {request} req
* @param {response} res
* @param {string} [data]
**/
exports.handle = function(req, res, data){

	var verb = req.method,
		pathname = url.parse(req.url).pathname,
		parts = pathname.split('/'),
		id = parts.length > 2 ? parts[2] : null,
		responseCode = 200,
		responseData;

	//	convert the data to an object
	if(data){
		console.log('raw data: ', data);
		try {
			data = JSON.parse(data);
		} catch(err){
			console.log('that is not JSON, fool', data);
			responseCode = 500;
		}
	}

	//	what is the http verb?
	switch(verb){
		case 'GET':
			//	show the Task with matching id

			break;

		case 'POST':
			//	save new task specified by data
			db.insert(data, sendResponse);

		case 'PUT':
			db.update(data, sendResponse);

		case 'DELTE':
		default:
			console.log('verb: ' + verb);
	};

	//	send response
	function sendResponse(err, responseCode, responseData){

		if(err){
			throw err;
		}

		res.writeHead(responseCode, {
			'content-type': 'application/json'
		});
		res.end(JSON.stringify(responseData));
	}
};
