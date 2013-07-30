define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/saveTaskListSuccessTemplate.ejs'
], function ($, _, Backbone, SaveTaskListSuccessTemplate  ) {

var saveTaskListSuccess = Backbone.View.extend({

  el: "#container",

  initialize: function(task,task_items){
    this.collection = task_items;
    this.model = task;
  },

  render: function() {
    $(this.el).html(_.template(SaveTaskListSuccessTemplate, { taskList: this.model.toJSON(), taskItems: this.collection.toJSON() })).hide().fadeIn();
  }

});

return saveTaskListSuccess;

});
