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

    urlRoot: function() {
      return Config[data.type].api + "/api/v1/tasks";
    },

    parse: function(response){
      return response.task;
    },

    toJSON: function() {
      var json = { task: this.attributes };
      return json;
    }
  });

  return Task;

});