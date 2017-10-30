(function() {
  'use strict';

  angular.module('globalKinetic')
  .run(runBlock);


  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
