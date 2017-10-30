(function() {
  'use strict';

  angular.module('globalKinetic').controller('MainController', MainController);

  /** @ngInject */
  function MainController($uibModal, MainService) {
    var vm = this;
    vm.weatherData = {};
    vm.coords = {};
    vm.init = init;
    vm.test = test;

    function init() {
      vm.test();
    }

    // function getUserLocation() {
    //   var deferred = $q.defer();
    //   geolocation.getLocation().then(function(data) {
    //       if (data) {
    //         deferred.resolve(data);
    //         vm.coords = {
    //           lat: data.coords.latitude,
    //           long: data.coords.longitude,
    //         };
    //       } else {
    //         deferred.reject('Empty data');
    //       }
    //
    //       console.log(vm.coords);
    //     },
    //     function(response) {
    //       deferred.reject(response);
    //     });
    //   return deferred.promise;
    // }

    function test() {
      $uibModal.open({
        templateUrl: 'app/main/modals/askPermissionModal.html',
        backdrop: 'static',
        controller: function($uibModalInstance, toastr) {
          console.log('hello ' + vm.coords);
          this.okAction = function() {
            this.showLoader = {};
            this.showLoader = true;
            MainService.getUserLocation().then(function(data) {
              vm.coords = {
                lat: data.coords.latitude,
                long: data.coords.longitude,
              };
              vm.apiKey = '53f9d8e4213222cf517d86dc406d67fc';
              // console.log(vm.coords);

              $uibModalInstance.close();
              toastr.success('We got location!');
              MainService.getWeatherByGeographicCoordinates(vm.coords.lat,
                vm.coords.long, vm.apiKey).then(function(data) {
                vm.weatherData = data;
                console.log(vm.weatherData);

              }).catch(function(error) {
                toastr.error('Something went wrong with getting weather data');
                console.log(error);
              });
            }).catch(function(error) {
              toastr.error('Something went wrong :(');
              console.log(error);

            });

          };
          this.cancelAction = function() {
            console.log('Don\'t do action');
            console.log(vm.weatherData);
            $uibModalInstance.close();
            toastr.warning('You canceled getting location');
          };
        },
        controllerAs: 'modalActions',
      });
    }
  }
})();
