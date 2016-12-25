(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($state, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav, $rootScope, postsDaoService, $mdDialog) {
    var vm = this;

    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.answer = answer;
    vm.hide = hide;
    vm.cancel = cancel;
    vm.showDialog = showDialog;
    vm.login = login;
    vm.loginFail = false;
    vm.user = {};
    vm.cleanInput = cleanInput;
    vm.logout = logout;
    vm.isLogin = false;


    function showDialog() {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

      $mdDialog.show({
        controller: function () {
          return vm;
        },
        controllerAs: 'vm',
        templateUrl: './app/components/sign-in/sign.in.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
        .then(function (answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function () {
          vm.status = 'You cancelled the dialog.';
        });

    }

    function login(credentials, formIsValid) {
      if (formIsValid) {
        postsDaoService.login(credentials)
          .then(function () {
            vm.isLogin = true;
            return $rootScope.$emit('login-success');
          })
          .then(function () {
            vm.cleanInput(credentials);
            return vm.hide();
          })
          .catch(function () {
            vm.loginFail = true;
            vm.cleanInput(credentials);
            setTimeout(function () {
              vm.loginFail = false;
            }, 1000);
          });
      } else {
        vm.showValidationError = true;
        setTimeout(function () {
          vm.showValidationError = false;
        }, 3000);
      }
    }

    function logout() {
      postsDaoService.logout();
      vm.isLogin = false;

    }

    vm.isLogin = function isLogin() {
      postsDaoService.checkAuthOnRefresh();
      return $rootScope.isAuthenticated;
    }();

    function cleanInput(credentials) {
      credentials.password = '';
      credentials.email = '';
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
