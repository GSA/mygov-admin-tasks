define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'collections/tasks',
    'views/basicTaskItem',
    'text!../templates/listAllTasks.ejs'
], function ($, _, Backbone, TaskModel, TasksCollection, BasicTaskItemView, ListAllTasksTemplate) {

var showAllTasks = Backbone.View.extend({

  el: "#main-content",

  initialize: function(){
    this.collection = new TasksCollection();
  },

  render: function() {
    var _this = this;

    this.collection.fetch({
      success: function(collection, response){
        $(_this.el).html(_.template(ListAllTasksTemplate, {tasks: collection.models}));

        _.each(collection.models, function(task){
          var basicTaskView = new BasicTaskItemView({collection: collection, model: task});
          basicTaskView.render();
        });

      },
      error: function(){
        console.log("** something went horribly wrong!");
      }
    });
  }

});

return showAllTasks;

});
