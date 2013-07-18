define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone, homeTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({

        el: $("#container"),

        template: '<h1>Temp home template view!!!!</h1>',

        initialize: function () {
            console.log("****initializing homeview");
        },

        render: function () {
            console.log("**** rendering homeview")
            this.$el.html(this.template).hide().fadeIn();
        }

    });

    return HomeView;

});