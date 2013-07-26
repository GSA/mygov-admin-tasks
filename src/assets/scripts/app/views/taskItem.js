define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'models/taskItem',
    'text!../templates/taskItemTemplate.ejs'
], function ($, _, Backbone, Task, TaskItemModel, TaskItemTemplate) {
    'use strict';

    var TaskItemView = Backbone.View.extend({

      events: {
        "mouseover li": "showEditTasks",
        "click a.remove-task-item": "removeTask"
      },

      tagName: 'li',

      initialize: function (model) {
        this.model = model;
      },

      template: _.template(TaskItemTemplate),

      render: function () {
        var html = this.template(this.model.toJSON());

        $("ul#mygov-task-list").append($(this.el).append(html)).hide().fadeIn();
        this.resetForm();
      },

      showEditTasks: function() {
        $(this.template).find('.edit-task-items').show();
      },

      hideEditTasks: function() {
        $(this.template).find('.edit-task-items').hide();
      },

      resetForm: function() {
        $('input.add-task-item').val("Add another task item");
      },

      removeTask: function(e) {
        e.preventDefault();
        this.model.destroy();
        this.remove();
      }


    });

    return TaskItemView;

});