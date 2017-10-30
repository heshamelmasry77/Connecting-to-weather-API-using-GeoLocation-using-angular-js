(function() {
  'use strict';

  angular.module('globalKinetic').controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, toastr, $http, $uibModal, MainService) {
    var vm = this;
    vm.coords = {};
    //
    // vm.classAnimation = '';
    //
    // vm.showToastr = showToastr;
    //
    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }
    vm.init = init;
    // vm.getUserLocation = getUserLocation;
    vm.test = test;

    function init() {
      // vm.getUserLocation();
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
          // this.init = function() {
          //   this.enteredMaxOffer = vm.maxOffer;
          // };
          this.okAction = function() {
            MainService.getUserLocation().then(function(data) {
              vm.coords = {
                lat: data.coords.latitude,
                long: data.coords.longitude,
              };
              console.log(vm.coords);
              $uibModalInstance.close();
              toastr.success('We got location!');
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
