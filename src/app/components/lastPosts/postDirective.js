(function() {
  'use strict';
  angular.module('tutFrontend').directive('elPost', function() {
    return {

      scope: {
        main: '='
      },
      templateUrl:'app/components/lastPosts/post.html',
      controller: 'MainController',
      controllerAs: 'main',
      link: function(scope, element, attrs) {


      }
    }
  })
}());
