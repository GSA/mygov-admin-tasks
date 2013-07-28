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
        "click a.remove-task-item": "removeTask",
        "click a.edit-task-item": "editTask",
        "click a.cancel-edit-task-item": "toggleTasks",
        "click a.save-edit-task-item": "saveEditedTask",
        "hover span.task-wrapper": "doSomething"

      },

      tagName: 'li',

      initialize: function (model) {
        this.model = model;
      },

      template: _.template(TaskItemTemplate),

      render: function () {
        var html = this.template(this.model.toJSON());

        $("ul#mygov-task-list").append($(this.el).append(html)).find('li:last').hide().fadeIn();
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
        $(this.el).fadeOut(300, function(){
          this.remove();
        });
      },

      editTask: function(e) {
        e.preventDefault();
        var taskDetails = $(this.el).find('.task-details')
        taskDetails.toggle();

        var taskEditElement = $(this.el).find('.task-edit')
        taskEditElement.toggle();
        taskEditElement.find('input').val(taskDetails.find('.task-item-name').html());
        taskEditElement.find('input').select().css('outline','none');
      },

      toggleTasks: function(e) {
        e.preventDefault(); //TODO: DRY this up
        var taskDetails = $(this.el).find('.task-details')
        taskDetails.toggle();

        var taskEditElement = $(this.el).find('.task-edit')
        taskEditElement.toggle();
      },

      saveEditedTask: function(e) {
        e.preventDefault(); //TODO: DRY this up
        var taskEditElement = $(this.el).find('.task-edit')
        var newValue = taskEditElement.find('input').val();
        var taskDetails = $(this.el).find('.task-details .task-item-name').html(newValue);
        this.model.set({name: newValue})

        this.toggleTasks(e);
      },

      doSomething: function(){
        $(this.el).find('span.edit-task-items').toggle();
      }



    });

    return TaskItemView;

});