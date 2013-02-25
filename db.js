var databaseUrl = 'taskboard';
var collections = ['tasks'];
var db = require('mongojs').connect(databaseUrl, collections);


function insert(data, callback){

	db.tasks.insert(data, function(err, tasks){
		console.log('inserted tasks', tasks);
		callback(err, 200, tasks[0]);
	});
};

function update(data, callback){
	console.log('update', data);
	db.tasks.update({_id: data._id}, data, function(err, updated){
		console.log('updated:', updated);
		callback(null, 204, updated);
	});
}

exports.insert = insert;
exports.update = update;