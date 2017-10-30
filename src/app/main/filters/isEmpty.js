(function() {
  'use strict';

  angular.module('globalKinetic').filter('isEmpty', function() {
    var bar;
    return function(obj) {
      for (bar in obj) {
        if (obj.hasOwnProperty(bar)) {
          return false;
        }
      }
      return true;
    };
  });
})();


