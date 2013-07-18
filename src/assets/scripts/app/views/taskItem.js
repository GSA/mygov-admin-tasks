define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'models/taskItem',
    'text!../templates/taskItem.ejs'
], function ($, _, Backbone, Task, TaskItemModel, TaskItemTemplate) {
    'use strict';

    var TaskItemView = Backbone.View.extend({

      events: {
        "mouseover li": "showEditTasks"
      },

      el: "ul#mygov-task-list",

      initialize: function (data) {
        this.model = new TaskItemModel(data);
      },

      template: _.template(TaskItemTemplate),

      render: function () {
        var taskItem = this.model.toJSON();
        var html = this.template(taskItem)

        $(this.el).append(html).hide().fadeIn();
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
      }

    });

    return TaskItemView;

});