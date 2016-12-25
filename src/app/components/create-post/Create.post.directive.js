(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .directive('createPost', createPost);

  /** @ngInject */
  function createPost() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/create-post/create.post.button.html',
      controller: 'CreatePostCtrl',
      controllerAs: 'create'
    };
    return directive;
  }

})();
