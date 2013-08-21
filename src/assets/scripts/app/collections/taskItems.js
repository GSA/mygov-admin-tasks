define([
  'jquery',
  'underscore',
  'backbone',
  'models/task',
  'models/taskItem'
], function ($, _, Backbone, TaskModel, TaskItemModel) {
  'use strict';

  var TaskItemsCollection = Backbone.Collection.extend({

    model: TaskItemModel

  });

  return TaskItemsCollection;

});