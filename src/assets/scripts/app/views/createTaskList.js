define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'text!../templates/taskList.ejs',
    'views/taskItem'
], function ($, _, Backbone, Task, TaskListTemplate, TaskItemView) {
    'use strict';

    var CreateTaskListView = Backbone.View.extend({

      events: {
        "click a.mygov-button": "addTaskItem",
        "keypress input[type=text]": "filterOnEnter",
        "focus input.add-task-item": "handleFormFocus",
        "blur input.add-task-item": "handleFormBlur"

      },

      el: "#container",

      initialize: function () {
          //Instantiate a new Task model
          var task = new Task();

      },

      template: _.template(TaskListTemplate, {
        something: 'something new',
        task: new Task({name: "My Stubbed Task", description: "My Stubbed Description"})
      }),

      render: function () {
          $(this.el).html(this.template).hide().fadeIn();
      },

      addTaskItem: function(e){
        if(e){
          e.preventDefault();
        }

        //Add a task item to the current task
        var taskItem = new TaskItemView({ name: $('input.add-task-item').val() });
        taskItem.render();
        $('input.add-task-item').blur();
      },

      handleFormFocus: function(){
        var formElement = $('input.add-task-item');

        if (formElement.val() == "Add another task item") {
          formElement.val('');
        }
      },

      handleFormBlur: function(){
        var formElement = $('input.add-task-item');

        if (formElement.val() == "") {
          formElement.val('Add another task item');
        }
      },

      filterOnEnter: function(e) {
        if (e.keyCode != 13) return;
        this.addTaskItem();
      }

    });

    return CreateTaskListView;

});