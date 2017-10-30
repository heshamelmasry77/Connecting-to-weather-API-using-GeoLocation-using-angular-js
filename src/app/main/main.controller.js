(function() {
  'use strict';

  angular.module('globalKinetic').controller('MainController', MainController);

  /** @ngInject */
  function MainController($uibModal, MainService) {
    var vm = this;
    vm.weatherData = {};
    vm.coords = {};
    vm.init = init;
    vm.GetCurrentWeather = GetCurrentWeather;

    function init() {
      vm.GetCurrentWeather();
    }

    function GetCurrentWeather() {
      $uibModal.open({
        templateUrl: 'app/main/modals/askPermissionModal.html',
        backdrop: 'static',
        controller: function($uibModalInstance, toastr) {
          this.okAction = function() {
            this.showLoader = {};
            this.showLoader = true;
            MainService.getUserLocation().then(function(data) {
              vm.coords = {
                lat: data.coords.latitude,
                long: data.coords.longitude,
              };
              vm.apiKey = '53f9d8e4213222cf517d86dc406d67fc';

              $uibModalInstance.close();
              toastr.success('We got your location! here are the weather details for you ');
              MainService.getWeatherByGeographicCoordinates(vm.coords.lat,
                vm.coords.long, vm.apiKey).then(function(data) {
                vm.weatherData = data;

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
            $uibModalInstance.close();
            toastr.warning('You canceled getting location');

          };
        },
        controllerAs: 'modalActions',
      });
    }
  }
})();
