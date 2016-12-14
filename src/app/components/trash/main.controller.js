(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, $timeout, webDevTec, toastr, $mdBottomSheet, $mdSidenav, elBlogService) {
    var vm = this;

    vm.awesomeThings  = [];
    vm.classAnimation = '';
    vm.creationDate   = 1480702611422;
    vm.toggleList     = toggleUsersList;
    vm.mainPage       = false;
    vm.showToastr = showToastr;
    vm.users = users();
    vm.posts = posts;
    vm.cons = cons;
    activate();
    vm.lastPosts = lastPosts();
    vm.goMain = goMain;

    function goMain() {
      $state.go('home')
    }

    function cons() {
    console.log('sdf');
    }

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    vm.selectUser = function (user) {
      vm.selected = user;
      posts(user);

      $mdBottomSheet.hide();
    };

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }


    vm.share = function (selectedUser) {

      $mdBottomSheet.show({
        controllerAs: "vm",
        controller  : ['$mdBottomSheet', ContactSheetController],
        templateUrl : './app/components/contactSheet/contactSheet.html',
        parent      : angular.element(document.getElementById('content'))
      });

      function ContactSheetController($mdBottomSheet) {
        var vm         = this;
        vm.user        = selectedUser;
        vm.items       = [
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





    function users() {
      elBlogService.users()
        .then(function (result) {
          vm.users = result;
          vm.selected = vm.users[0];

        });
    }

    function posts(user) {
      // console.log(user._id);
      elBlogService.posts(user)
         .then(function (result) {
           // console.log(result);
           vm.posts =  result;
         })
    }
    function lastPosts() {
      elBlogService.lastPosts()
        .then(function (result) {
          // console.log(result);
          vm.lastPosts =  result;
        })
    }


  }
})();
