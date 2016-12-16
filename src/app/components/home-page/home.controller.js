(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('HomeCtrl', HomeCtrl);

  /** @ngInject */
  function HomeCtrl($state, posts, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav,$rootScope, postsDaoService, $mdDialog) {
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

    /**LOGIN DIALOG**/
    vm.showDialog = showDialog;
    vm.login = login;
    vm.loginFail = false;
    vm.user = {};
    /** LOGIN DIALOG FUNCTIONS**/

    function showDialog(post) {
      getUserPost(post);
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

      $mdDialog.show({
        controller: function () {
          return vm;
        },
        controllerAs: 'home',
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
            return $rootScope.$emit('logon-success');
          })
          .catch(function () {
            vm.loginFail = true;
          });
      } else {
        vm.showValidationError = true;
        setTimeout(function () {
          vm.showValidationError = false;
        }, 3000);
      }
    }

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
      console.log('asdas');
      $mdDialog.hide(answer);
    }


    /**HOME PAGE FUNCTIONS**/
    function getUserPost(post) {
      vm.post = post;
    }

    function goMain() {
      $state.go('home');
      getLastUsersPosts();
    }

    function selectUser(user) {
      vm.selected = user;
      postsDaoService.getUserPosts(user)
        .then(function (result) {
          vm.lastPosts = result;
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

    // var dbPost = [{
    //   ttitle: "." +
    //   "" +
    //   ""
    // }];
    //
    // var dbUser = [
    //   {
    //     name   : 'Ihor',
    //     avatar : './assets/images/user.svg',
    //     content: "elorme, d'lorm, or De l'Orme (1584–1678), was a medical doctor. Charles was the son of Jean Delorme (a professor at Montpellier University), who was the primary doctor to Marie de' Medici. This ultimately opened doors for Charles' medical career soon after he graduated from the University of Montpellier in 1607 at the age of 23. He first came to Paris after graduation to practice medicine under the watchful eye of his father, until he was ready to elorme, d'lorm, or De l'Orme (1584–1678), was a medical doctor. Charles was the son of Jean Delorme (a professor at"
    //   },
    //   {
    //     name   : 'Vitalik',
    //     avatar : './assets/images/pacman.svg',
    //     content: "elorme, d'lorm, or De l'Orme (1584–1678), was a medical doctor. Charles was the son of Jean Delorme (a professor at Montpellier University), who was the primary doctor to Marie de' Medici. This ultimately opened doors for Charles' medical career soon after he graduated from the University of Montpellier in 1607 at the age of 23. He first came to Paris after graduation to practice medicine under the watchful eye of his father, until he was ready to "
    //   },
    //   {
    //     name   : 'Volkov',
    //     avatar : './assets/images/happy2.svg',
    //     content: "elorme, d'lorm, or De l'Orme (1584–1678), was a medical doctor. Charles was the son of Jean Delorme (a professor at Montpellier University), who was the primary doctor to Marie de' Medici. This ultimately opened doors for Charles' medical career soon after he graduated from the University of Montpellier in 1607 at the age of 23. He first came to Paris after graduation to practice medicine under the watchful eye of his father, until he was ready to"
    //   },
    //   {
    //     name   : 'Vova',
    //     avatar : './assets/images/user.svg',
    //     content: "elorme, d'lorm, or De l'Orme (1584–1678), was a medical doctor. Charles was the son of Jean Delorme (a professor at Montpellier University), who was the primary doctor to Marie de' Medici. This ultimately opened doors for Charles' medical career soon after he graduated from the University of Montpellier in 1607 at the age of 23. He first came to Paris after graduation to practice medicine under the watchful eye of his father, until he was ready to"
    //   }
    // ];

    function getUserList() {
      postsDaoService.getUserList()
        .then(function (result) {
          vm.users = result;
          vm.selected = vm.users[0];
        });
    }

    function getUserPosts(user) {
      postsDaoService.getUserPosts(user)
        .then(function (result) {
          // console.log(result);
          vm.posts = result;
        })
    }

    function getLastUsersPosts() {
      postsDaoService.getLastUsersPosts()
        .then(function (result) {
          // console.log(result);
          vm.lastPosts = result;
        })
    }
  }

})();
