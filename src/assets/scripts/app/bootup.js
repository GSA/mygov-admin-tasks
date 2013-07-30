require.config({
    paths: {
        'jquery': '../vendor/jquery/jquery',
        'underscore': '../vendor/underscore-amd/underscore',
        'backbone': '../vendor/backbone-amd/backbone',
        'config': './config'
    }
});

define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function ($, _, Backbone, Router) {
    Router.initialize();
});
