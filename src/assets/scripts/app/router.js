define([
    'jquery',
    'underscore',
    'backbone',
    'views/createTaskList'
], function ($, _, Backbone, taskListView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        // This is really just an API Manager, perhaps the name
        // should be changed to reflect that.

        routes: {
            // Expects #/api/...
            'api/home': 'home'
        },

        home: function () {
            var createTaskList = new taskListView()
            createTaskList.render();
        }

    });

    var initialize = function () {
        var router = new AppRouter();
        Backbone.history.start();

        router.on('defaultAction', function (actions) {
            console.log("no route:", actions);
        });
    }

    return {
        initialize: initialize
    }
});