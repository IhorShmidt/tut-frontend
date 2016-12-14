(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('UserPostsCtrl', UserPostsCtrl);

  /** @ngInject */
  function UserPostsCtrl($state, $timeout, webDevTec, toastr, $mdBottomSheet, $mdSidenav, elBlogService) {
    var vm = this;
  }
})();
