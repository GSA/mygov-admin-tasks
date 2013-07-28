define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'models/taskItem',
    'collections/taskItems',
    'text!../templates/taskList.ejs',
    'views/taskItem'
], function ($, _, Backbone, TaskModel, TaskItemModel, TaskItemsCollection, TaskListTemplate, TaskItemView) {
    'use strict';

    var CreateTaskListView = Backbone.View.extend({

      events: {
        "click a.add-task-item": "addTaskItem",
        "keypress input[type=text]": "filterOnEnter",
        "focus input.add-task-item": "handleFormFocus",
        "blur input.add-task-item": "handleFormBlur",
        "click a.add-completed": "toggleFormButtons",
        "click a.add-more-tasks": "toggleFormButtons",
        "click a.save-all-tasks": "saveTask",
        'click a.add-task-title': "saveBasicTaskInfo"
      },

      el: "#container",

      initialize: function () {
        _.bindAll(this, 'saveTask', 'saveBasicTaskInfo');
        this.collection = new TaskItemsCollection();
      },

      template: _.template(TaskListTemplate, {}),

      render: function () {
          $(this.el).html(this.template).hide().fadeIn(300, function(){ $("input.add-task-title").select(); });
      },

      addTaskItem: function(e){
        if(e){
          e.preventDefault();
        }

        //Create a TaskItem model and add it to the collection of TaskItems
        var taskItem = new TaskItemModel({name: $('input.add-task-item').val() });
        this.collection.add(taskItem);

        //Add a task item to the current task
        var taskItemView = new TaskItemView(taskItem);
        taskItemView.render();
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
      },

      toggleFormButtons: function(e) {
        e.preventDefault();
        $('#add-tasks-form').toggle();
        $('#save-tasks-form').toggle();
        $("h2.task-step-instructions").html("Step 3: Save your task list");
      },

      saveTask: function(e) {
        e.preventDefault();
        var that = this;
        this.baseTaskModel.save(this.baseTaskModel.attributes, {
          success:function(task, response){
            console.log("response: ", response);
            console.log("task: ", task);
            that.saveTaskItems(task, that.collection);
          }
        });

      },

      saveBasicTaskInfo: function(e) {
        e.preventDefault();
        var taskName = $("input.add-task-title").val();
        var taskDescription = $("input.add-task-description").val();
        this.baseTaskModel = new TaskModel({name: taskName, description: taskDescription})

        $("h3.task-title-display").toggle()
        $("h3.task-title-display").html(taskName);
        $("h2.task-step-instructions").html("Step 2: Create your task list");

        $('#add-task-info-form').toggle()
        $('#add-tasks-form').toggle()
      },

      saveTaskItems: function(task, taskItems) {
        console.log("task attributes1: ", task.attributes);
        _.each(taskItems.models, function(item){
          var taskAttributes = $.extend(item.attributes, { 'task_id': task.id });
          console.log("task attributes2: ", taskAttributes);
          item.save(taskAttributes, {
            success: function(){
              //TODO: Invoke flash message
            },
            error: function(){
              console.log("**** failure ***");
            }
          });
        });
      }

    });

    return CreateTaskListView;

});