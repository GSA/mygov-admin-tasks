define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var Task = Backbone.Model.extend({

    initialize: function () {
    },

    url: 'http://localhost:57910/api/v1/tasks', //TODO: domain to config

    parse: function(response){
      return response.task;
    }


  });

  return Task;

});