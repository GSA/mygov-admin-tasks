define([], function () {
  'use strict';

  var configs = {
    'uat': {
      'api': 'http://ec2-184-73-26-235.compute-1.amazonaws.com'
    },
    'production': {
      'api': ''
    },
    'local': {
      'api': 'http://localhost:57910'
    }
  };

  return configs;

});