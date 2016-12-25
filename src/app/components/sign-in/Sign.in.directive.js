(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .directive('signInButton', signInButton);

  /** @ngInject */
  function signInButton() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/sign-in/sign.in.button.html',
      // scope: {
      //     creationDate: '='
      // },
      controller: 'SignInCtrl',
      controllerAs: 'signin'
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
