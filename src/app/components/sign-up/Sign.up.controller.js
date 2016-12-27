(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('SignUpCtrl', SignUpCtrl);

  /** @ngInject */
  function SignUpCtrl($state, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav, $rootScope, postsDaoService, $mdDialog) {
    var vm = this;


    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.answer = answer;
    vm.hide = hide;
    vm.cancel = cancel;
    vm.loginFail = false;
    vm.isLogin = false;
    vm.submit = signup;
    vm.showReg = showReg;


    vm.isLogin = function isLogin() {
      postsDaoService.checkAuthOnRefresh();
      return $rootScope.isAuthenticated;
    }();

    function showReg() {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

      $mdDialog.show({
        controller: function () {
          return vm;
        },
        controllerAs: 'vm',
        templateUrl: './app/components/sign-up/sign.up.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
        .then(function (answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function () {
          vm.status = 'You cancelled the dialog.';
        });
    }

    function signup() {
      postsDaoService.createUser(vm.user)
        .then(function () {
          vm.user.email = '';
          vm.user.password = '';
          return vm.hide();

        });
    }

    function hide() {
      $mdDialog.hide();
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function answer(answer) {
      $mdDialog.hide(answer);
    }

  }

})();
