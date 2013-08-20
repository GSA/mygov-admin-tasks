define([
    'jquery',
    'underscore',
    'backbone',
    'models/task',
    'models/taskItem',
    'collections/tasks',
    'text!../templates/basicTaskItemTemplate.ejs',
], function ($, _, Backbone, Task, TaskItemModel, TasksCollection, BasicTaskItemTemplate) {
    'use strict';

    var BasicTaskItemView = Backbone.View.extend({

      events: {
        "click a.remove-task-item": "removeTask",
        "click a.view-task-item-details": "viewTask",
        "click a.cancel-edit-task-item": "toggleTasks",
      },

      tagName: 'li',

      template: _.template(BasicTaskItemTemplate),

      render: function () {
        var html = this.template(this.model.toJSON()); //CURRENT -- should this be a modeL?
        $("ul#mygov-task-list").append($(this.el).append(html)).find('li:last').hide().fadeIn();
      },

      removeTask: function(e) {
        e.preventDefault();
        var _this = this;
        var thisModel = this.collection.get(this.model.id);

        // this.collection.remove(thisModel);

        this.model.destroy({
          success: function(){
            //TODO: Display messaging
          } ,
          error: function(){
            //TODO: Display messaging
          }
        });
          this.remove();
      },

      viewTask: function(e) {
        e.preventDefault();
        this.$el.find('#basic-task-item-details').toggle();
        var viewText = this.$el.find('.view-task-item-details')
        if (viewText.text() == "View"){
          viewText.text("Hide");
        } else {
          viewText.text("View");
        };
      },

      toggleTasks: function(e) {
        e.preventDefault(); //TODO: DRY this up
        var taskDetails = $(this.el).find('.task-details')
        taskDetails.toggle();

        var taskEditElement = $(this.el).find('.task-edit')
        taskEditElement.toggle();
      },

    });

    return BasicTaskItemView;

});