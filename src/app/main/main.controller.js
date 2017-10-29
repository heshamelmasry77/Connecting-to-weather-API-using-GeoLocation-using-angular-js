(function() {
  'use strict';

  angular.module('globalKinetic').controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,toastr, $http, geolocation) {
    var vm = this;
    //
    // vm.classAnimation = '';
    //
    // vm.showToastr = showToastr;
    //
    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }
    geolocation.getLocation().then(function(data) {
      $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
      console.log($scope.coords);
    });

  }
})();
