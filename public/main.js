var Task = Backbone.Model.extend({
	url: '/Task',
	defaults: function(){
		return {
			created: Date.now()
		}
	},
	idAttribute: '_id'
});

var TaskList = Backbone.Collection.extend({
	model: Task,
	url: '/Task'
});


var taskList = new TaskList();

$(function(){
	taskList.create({name: 'new'});
});