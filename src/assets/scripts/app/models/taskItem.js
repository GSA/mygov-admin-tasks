define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function ($, _, Backbone, Config) {
  'use strict';

  var environment = document.querySelector('#environment'),
              data = environment.dataset;

  var TaskItem = Backbone.Model.extend({

    url: function(){
      return Config[data.type].api + "/api/v1/task_items";
    }

  });

  return TaskItem;

});