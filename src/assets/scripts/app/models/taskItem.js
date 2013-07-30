define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var configs = {
    'api': 'http://localhost:57910'
  }

  var TaskItem = Backbone.Model.extend({

// <<<<<<< Updated upstream
//     url: 'http://localhost:57910/api/v1/task_items', //TODO: domain to config
// =======
    url: function(){
      return configs.api + "/api/v1/task_items";
    }

  });

  return TaskItem;

});