(function() {
  'use strict';

  angular.module('globalKinetic').
    service('MainService', MainService);

  /** @ngInject */
  function MainService($q, geolocation) {
    this.getUserLocation = getUserLocation;

    function getUserLocation() {
      var deferred = $q.defer();
      geolocation.getLocation().then(function(data) {
          if (data) {
            deferred.resolve(data);
            console.log(data);
          } else {
            deferred.reject('Empty data');
          }
        },
        function(response) {
          deferred.reject(response);
        });
      return deferred.promise;
    }

  }
})();

