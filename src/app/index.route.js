(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url  : '/',
        views: {
          ''          : {
            templateUrl : 'app/components/lastPosts/lastPosts.html',
            controller  : 'MainController',
            controllerAs: 'main'
          },
          'posts@home': {
            templateUrl: 'app/components/lastPosts/lastPosts.html'
          },
          'post@posts': {
            templateUrl: 'app/components/lastPosts/post.html',
            controller: 'MainController',
            controllerAs: 'main'
          }
        }
      })
      .state('post', {
        parent: 'home',
        views : {
          'details@home': {
            templateUrl: 'app/components/lastPosts/post.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
