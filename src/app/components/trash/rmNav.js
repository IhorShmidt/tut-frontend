(function () {
  'use strict';
  angular
    .module('tutFrontend')
    .directive('rmNav', rmNav);
  function rmNav() {

    return {
      templateUrl: 'app/main/rmNav.html',
      controller: 'MainController',
      controllerAs: 'main'
    };

  }
})();
