(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('CreatePostCtrl', CreatePostCtrl);

  /** @ngInject */
  function CreatePostCtrl($state, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav, $rootScope, postsDaoService, $mdDialog) {
    var vm = this;


    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.answer = answer;
    vm.hide = hide;
    vm.cancel = cancel;
    vm.loginFail = false;
    vm.isLogin = false;
    vm.create = createPost;
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
        templateUrl: './app/components/create-post/create.post.html',
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

    function createPost() {
      postsDaoService.createPost(vm.post)
        .then(function () {
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
