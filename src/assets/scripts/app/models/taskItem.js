define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var TaskItem = Backbone.Model.extend({

    url: 'http://localhost:1234/api/v1/task_items' //TODO: domain to config

  });

  return TaskItem;

});