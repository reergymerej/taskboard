var Task = Backbone.Model.extend({
	defaults: function(){
		return {
			created: Date.now()
		}
	}
});

var TaskList = Backbone.Collection.extend({
	model: Task,
	url: '/Task'
});


var taskList = new TaskList();

$(function(){
	taskList.create({name: 'new'});
});