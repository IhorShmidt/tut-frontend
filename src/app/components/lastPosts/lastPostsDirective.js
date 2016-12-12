(function() {
  'use strict';
  angular.module('tutFrontend').directive('elPosts', function() {
    return {

      scope: {
        main: '='
      },
      templateUrl:'app/components/lastPosts/lastPosts.html',
      controller: 'MainController',
      controllerAs: 'main',
      link: function(scope, element, attrs) {


      }
    }
  })
}());
