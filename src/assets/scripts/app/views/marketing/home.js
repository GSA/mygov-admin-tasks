define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../../../templates/marketing/home.html'
], function ($, _, Backbone, homeTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({

        el: $("#container"),

        template: '<h1>Temp home template view!!!!</h1>',
        // template: _.template(homeTemplate),

        initialize: function () {

            this.render();
        },

        render: function () {
            console.log("rendering homeview")
            this.$el.html(this.template).hide().fadeIn();
        }

    });

    return HomeView;

});