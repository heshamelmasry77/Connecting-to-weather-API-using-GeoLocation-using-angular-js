(function() {
  'use strict';

  angular.module('globalKinetic').
    service('MainService', MainService);

  /** @ngInject */
  function MainService($http, $q, geolocation) {
    this.getUserLocation = getUserLocation;
    this.getWeatherByGeographicCoordinates = getWeatherByGeographicCoordinates;

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

    function getWeatherByGeographicCoordinates(lat, lon, apiKey) {
      var deferred = $q.defer();
      if (lat && lon && apiKey) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat +
          '&lon=' + lon + '&appid=' + apiKey).then(
          function(data) {
            if (data) {
              deferred.resolve(data.data.main);
            } else {
              deferred.reject('Empty data');
            }
          },
          function(response) {
            deferred.reject(response);
          }
        );
      } else {
        deferred.reject('some of the inputs is undefined');
      }
      return deferred.promise;
    }
  }
})();

