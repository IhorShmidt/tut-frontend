(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,authManager, $rootScope, postsDaoService, $state) {
  }


})();
