(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('HomeCtrl', HomeCtrl);

  /** @ngInject */
  function HomeCtrl($state, $timeout, toastr, $mdBottomSheet, $mdSidenav, postsDaoService) {
    var vm = this;

    vm.cons = cons;
    vm.goMain = goMain;
    vm.mainPage = false;
    vm.init = getUserPosts;
    vm.selectUser = selectUser;
    vm.users = getUserList();
    vm.toggleList = toggleUsersList;
    vm.lastPosts = getLastUsersPosts();

    function goMain() {
      $state.go('home');
      getLastUsersPosts();
    }

    function cons() {
      console.log('sdf');
    }

    function selectUser(user) {
      vm.selected = user;
      // posts(user);
      // console.log(user._id);
      postsDaoService.getUserPosts(user)
        .then(function (result) {
          // console.log(result);
          vm.lastPosts = result;
        })

      $mdBottomSheet.hide();
    };

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
      // console.log(user._id);
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
