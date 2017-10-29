(function() {
  'use strict';

  angular
    .module('globalKinetic')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, $http) {
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


  }
})();
