(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('HomeCtrl', HomeCtrl);


  /** @ngInject */
  function HomeCtrl($state, posts, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav, $rootScope, postsDaoService, $mdDialog, PagerService, $anchorScroll, $location, $filter) {
    var vm = this;


    /**HOME PAGE**/
    vm.goMain = goMain;
    vm.mainPage = false;
    vm.selectUser = selectUser;
    vm.users = getUserList();
    vm.toggleList = toggleUsersList;
    vm.lastPosts = posts;
    vm.getUserPost = getUserPost;


    /**POST MODAL DIALOG**/
    vm.showAdvanced = showAdvanced;
    vm.status = '  ';
    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.answer = answer;
    vm.hide = hide;
    vm.cancel = cancel;
    vm.scroll = function () {
      $anchorScroll();
    };
    vm.pagination = function () {
      vm.postsLength = vm.lastPosts.length;
      vm.dummyItems = _.range(vm.postsLength); // dummy array of items to be paged
      vm.pager = {};
      vm.setPage = setPage;

      initController();

      function initController() {
        vm.setPage(1);
      }

      function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
          return;
        }
        vm.pager = PagerService.GetPager(vm.dummyItems.length, page);
        vm.items = vm.lastPosts.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        vm.scroll();
      }
    };
    vm.pagination();


    /**SEARCH INPUT**/
    vm.searchPost = '';
    vm.query = '';
    vm.select = function (item) {
      vm.showAdvanced(item);
      vm.query = '';
    };

    /**POST MODAL DIALOG FUNCTIONS**/
    function showAdvanced(post) {
      getUserPost(post);
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

      $mdDialog.show({
        controller: function () {
          return vm;
        },
        controllerAs: 'home',
        templateUrl: './app/components/user-post-modal/user.post.modal.html',
        parent: angular.element(document.body),
        targetEvent: post,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
        .then(function (answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function () {
          vm.status = 'You cancelled the dialog.';
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


    /**HOME PAGE FUNCTIONS**/
    function getUserPost(post) {
      vm.post = post;
    }

    function goMain() {
      vm.lastPosts = posts;
      $state.go('home');
      vm.pagination();
      getLastUsersPosts();

    }

    function selectUser(user) {
      vm.selected = user;
      postsDaoService.getUserPosts(user)
        .then(function (result) {
          vm.lastPosts = result;
          vm.pagination();
        });
      $mdBottomSheet.hide();
    }

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }


    vm.share = function (selectedUser) {

      $mdBottomSheet.show({
        controllerAs: "vm",
        controller: ['$mdBottomSheet', ContactSheetController],
        templateUrl: './app/components/contactSheet/contactSheet.html',
        parent: angular.element(document.getElementById('content'))
      });

      function ContactSheetController($mdBottomSheet) {
        var vm = this;
        vm.user = selectedUser;
        vm.items = [
          {name: 'Phone', icon: 'phone', icon_url: './assets/images/phone.svg'},
          {name: 'Twitter', icon: 'twitter', icon_url: './assets/images/twitter.svg'},
          {name: 'Google+', icon: 'google_plus', icon_url: './assets/images/google_plus.svg'},
          {name: 'Hangout', icon: 'hangouts', icon_url: './assets/images/hangouts.svg'}
        ];
        vm.contactUser = function (action) {
          $mdBottomSheet.hide(action);
        };
      }

    };

    function getUserList() {
      postsDaoService.getUserList()
        .then(function (result) {
          vm.users = result;
          vm.selected = vm.users;
        });
    }

    function getUserPosts(user) {
      postsDaoService.getUserPosts(user)
        .then(function (result) {
          vm.posts = result;

        })
    }

    function getLastUsersPosts() {
      postsDaoService.getLastUsersPosts()
        .then(function (result) {
          vm.lastPosts = result;
          console.log(vm.lastPosts);
        })
    }

  }

})();
