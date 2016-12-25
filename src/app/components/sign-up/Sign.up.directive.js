(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .directive('signUpButton', signUpButton);

  /** @ngInject */
  function signUpButton() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/sign-up/sign.up.button.html',
      // scope: {
      //     creationDate: '='
      // },
      controller: 'SignUpCtrl',
      controllerAs: 'signup'
      // bindToController: true
    };

    return directive;

    /** @ngInject */
    // function NavbarController(moment) {
    //   var vm = this;
    //
    //   // "vm.creationDate" is available by directive option "bindToController: true"
    //   vm.relativeDate = moment(vm.creationDate).fromNow();
    // }
  }

})();
