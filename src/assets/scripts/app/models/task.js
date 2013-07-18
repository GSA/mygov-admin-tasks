define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var Task = Backbone.Model.extend({

    initialize: function () {
    },

    url: 'http://localhost:1234/api/v1/tasks' //TODO: domain to config

  });

  return Task;

});