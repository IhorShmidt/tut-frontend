// (function () {
//   'use strict';
//
//   angular
//     .module('tutFrontend')
//     .controller('BlogNavbarCtrl', BlogNavbarCtrl);
//
//   /** @ngInject */
//   function BlogNavbarCtrl($state, $mdMedia, $timeout, toastr, $mdBottomSheet, $mdSidenav, $rootScope, postsDaoService, $mdDialog) {
//     var vm = this;
//
//     /**HOME PAGE**/
//     vm.goMain = goMain;
//     vm.mainPage = false;
//     vm.selectUser = selectUser;
//     vm.users = getUserList();
//     vm.toggleList = toggleUsersList;
//     vm.lastPosts = posts;
//     vm.getUserPost = getUserPost;
//
//
//     /**POST MODAL DIALOG**/
//     vm.showAdvanced = showAdvanced;
//     vm.status = '  ';
//     vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
//     vm.answer = answer;
//     vm.hide = hide;
//     vm.cancel = cancel;
//
//     /**LOGIN DIALOG**/
//     vm.showDialog = showDialog;
//     vm.login = login;
//     vm.loginFail = false;
//     vm.user = {};
//     vm.cleanInput = cleanInput;
//     vm.logout = logout;
//     vm.isLogin = false;
//
//     /**SIGNUP DIALOG**/
//     vm.submit = signup;
//     vm.showReg = showReg;
//
//     /** LOGIN DIALOG FUNCTIONS**/
//
//     function showDialog() {
//       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
//
//       $mdDialog.show({
//         controller: function () {
//           return vm;
//         },
//         controllerAs: 'home',
//         templateUrl: './app/components/sign-in/sign.in.html',
//         parent: angular.element(document.body),
//         targetEvent: event,
//         clickOutsideToClose: true,
//         fullscreen: useFullScreen
//       })
//         .then(function (answer) {
//           vm.status = 'You said the information was "' + answer + '".';
//         }, function () {
//           vm.status = 'You cancelled the dialog.';
//         });
//
//     }
//
//     function login(credentials, formIsValid) {
//       if (formIsValid) {
//         postsDaoService.login(credentials)
//           .then(function () {
//             vm.isLogin = true;
//             return $rootScope.$emit('login-success');
//           })
//           .then(function () {
//             vm.cleanInput(credentials);
//             return vm.hide();
//           })
//           .catch(function () {
//             vm.loginFail = true;
//             vm.cleanInput(credentials);
//             setTimeout(function () {
//               vm.loginFail = false;
//             }, 1000);
//           });
//       } else {
//         vm.showValidationError = true;
//         setTimeout(function () {
//           vm.showValidationError = false;
//         }, 3000);
//       }
//     }
//
//     function logout() {
//       postsDaoService.logout();
//       vm.isLogin = false;
//
//     }
//
//     vm.isLogin = function isLogin() {
//       postsDaoService.checkAuthOnRefresh();
//       return $rootScope.isAuthenticated;
//     }();
//
//     function cleanInput(credentials) {
//       credentials.password = '';
//       credentials.email = '';
//     }
//
//     /**SIGNUP DIALOG FUNCTIONS**/
//
//     function showReg() {
//       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
//
//       $mdDialog.show({
//         controller: function () {
//           return vm;
//         },
//         controllerAs: 'home',
//         templateUrl: './app/components/sign-up/sign.up.html',
//         parent: angular.element(document.body),
//         targetEvent: event,
//         clickOutsideToClose: true,
//         fullscreen: useFullScreen
//       })
//         .then(function (answer) {
//           vm.status = 'You said the information was "' + answer + '".';
//         }, function () {
//           vm.status = 'You cancelled the dialog.';
//         });
//
//     }
//
//     function signup(){
//       postsDaoService.createUser(vm.user)
//         .then(function() {
//           vm.user.email = '';
//           vm.user.password = '';
//         });
//
//       showDialog();
//     }
//
//     /**POST MODAL DIALOG FUNCTIONS**/
//     function showAdvanced(post) {
//       getUserPost(post);
//       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
//
//       $mdDialog.show({
//         controller: function () {
//           return vm;
//         },
//         controllerAs: 'home',
//         templateUrl: './app/components/user-post-modal/user.post.modal.html',
//         parent: angular.element(document.body),
//         targetEvent: post,
//         clickOutsideToClose: true,
//         fullscreen: useFullScreen
//       })
//         .then(function (answer) {
//           vm.status = 'You said the information was "' + answer + '".';
//         }, function () {
//           vm.status = 'You cancelled the dialog.';
//         });
//
//     }
//
//     function hide() {
//       $mdDialog.hide();
//     }
//
//     function cancel() {
//       $mdDialog.cancel();
//     }
//
//     function answer(answer) {
//       $mdDialog.hide(answer);
//     }
//
//
//     /**HOME PAGE FUNCTIONS**/
//     function getUserPost(post) {
//       vm.post = post;
//     }
//
//     function goMain() {
//       $state.go('home');
//       getLastUsersPosts();
//     }
//
//     function selectUser(user) {
//       vm.selected = user;
//       postsDaoService.getUserPosts(user)
//         .then(function (result) {
//           vm.lastPosts = result;
//         });
//       $mdBottomSheet.hide();
//     }
//
//     function toggleUsersList() {
//       $mdSidenav('left').toggle();
//     }
//
//
//     vm.share = function (selectedUser) {
//
//       $mdBottomSheet.show({
//         controllerAs: "vm",
//         controller: ['$mdBottomSheet', ContactSheetController],
//         templateUrl: './app/components/contactSheet/contactSheet.html',
//         parent: angular.element(document.getElementById('content'))
//       });
//
//       function ContactSheetController($mdBottomSheet) {
//         var vm = this;
//         vm.user = selectedUser;
//         vm.items = [
//           {name: 'Phone', icon: 'phone', icon_url: './assets/images/phone.svg'},
//           {name: 'Twitter', icon: 'twitter', icon_url: './assets/images/twitter.svg'},
//           {name: 'Google+', icon: 'google_plus', icon_url: './assets/images/google_plus.svg'},
//           {name: 'Hangout', icon: 'hangouts', icon_url: './assets/images/hangouts.svg'}
//         ];
//         vm.contactUser = function (action) {
//           $mdBottomSheet.hide(action);
//         };
//       }
//
//     };
//
//     function getUserList() {
//       postsDaoService.getUserList()
//         .then(function (result) {
//           vm.users = result;
//           vm.selected = vm.users;
//         });
//     }
//
//     function getUserPosts(user) {
//       postsDaoService.getUserPosts(user)
//         .then(function (result) {
//           vm.posts = result;
//         })
//     }
//
//     function getLastUsersPosts() {
//       postsDaoService.getLastUsersPosts()
//         .then(function (result) {
//           vm.lastPosts = result;
//         })
//     }
//   }
//
// })();
