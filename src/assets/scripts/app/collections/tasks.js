define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/task'
], function ($, _, Backbone, Config, TaskModel) {
  'use strict';

  var environment = document.querySelector('#environment'),
            data = environment.dataset;

  var TasksCollection = Backbone.Collection.extend({

    model: TaskModel,

    url: function() {
      return Config[data.type].api + "/api/v1/tasks";
    }

  });

  return TasksCollection;

});