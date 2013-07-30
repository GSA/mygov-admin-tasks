define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function ($, _, Backbone, Config) {
  'use strict';

  var environment = document.querySelector('#environment'),
              data = environment.dataset;

  var Task = Backbone.Model.extend({

    initialize: function () {
    },

    url: function() {
      return Config[data.type].api + "/api/v1/tasks";
    },

    parse: function(response){
      return response.task;
    }
  });

  return Task;

});