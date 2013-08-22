define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'models/taskItem',
    'collections/taskItems',
    'text!../templates/taskList.ejs',
    'text!../templates/mainNavTemplate.ejs',
    'views/taskItem',
    'views/saveTaskListSuccess',
    'views/listAllTasks'

], function (
  $
  , _
  , Backbone
  , TaskModel
  , TaskItemModel
  , TaskItemsCollection
  , TaskListTemplate
  , MainNavTemplate
  , TaskItemView
  , SaveSuccessView
  , ListAllTasks
  ) {
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
        "click a.add-task-title": "saveBasicTaskInfo",

        "click #main-nav a[name=view-all-tasks]": "listAllTasks",
        "click #main-nav a[name=create-new-task-list]": "createNewTaskList"
      },

      el: "#container",

      initialize: function () {
        _.bindAll(this, 'saveTask', 'saveBasicTaskInfo', 'saveTaskItems');
        this.collection = new TaskItemsCollection();
      },

      template: _.template(TaskListTemplate, {}),
      mainNavTemplate: _.template(MainNavTemplate),

      render: function () {
        $(this.el).html(this.template).hide().fadeIn(300, function(){ $("input.add-task-title").select(); });
        this.renderNavigation();
      },

      addTaskItem: function(e){
        if(e){
          e.preventDefault();
        }

        var taskItem = new TaskItemModel({name: $('input.add-task-item').val() });
        this.collection.add(taskItem);

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
            that.saveTaskItems(task, that.collection);
          },
          error: function(){
            console.log("Error saving the task"); //TODO: Display error message
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

      saveTaskItems: function(task,taskItems) {
        var that = this;
        var errors = [];
        var taskCount = 0;

        _.each(taskItems.models, function(item){
          var taskAttributes = $.extend(item.attributes, { 'task_id': task.id });
          item.save(taskAttributes, {
            success: function(){
              // TODO: de-yuckify. Maybe use promises
              taskCount++;
              if (taskCount == taskItems.models.length) {
                that.displaySaveSuccess(task,taskItems);
              };
            },
            error: function(model,response){
              var returnedErrors = $.parseJSON(response.responseText).errors;

              //TODO: Separate into a utility
              for(var k in returnedErrors){
                if(returnedErrors.hasOwnProperty(k)){
                  errors.push(k + ": " + returnedErrors[k]);
                }
              }

              that.displaySaveError(errors);
            }
          });

        });
      },

      displaySaveError: function(errors){
        console.log("Failed to save tasks. Errors: ", errors);
      },

      displaySaveSuccess: function(task,task_items){
        var successView = new SaveSuccessView(task,task_items);
        successView.render();
      },

      renderNavigation: function(){
        $("#main-nav").append(this.mainNavTemplate);
      },

      listAllTasks: function(e){
        e.preventDefault();

        var listAllTasksView = new ListAllTasks();
        listAllTasksView.render();
      },

      createNewTaskList: function(e){
        e.preventDefault();
        this.render();
      }

    });

    return CreateTaskListView;

});