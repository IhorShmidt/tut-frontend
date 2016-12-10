(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .factory('elBlogService', elBlogService);

  function elBlogService(Restangular) {


    function users() {
      return Restangular.all('users').getList()
        .then(function (res) {
          return res;
        })
    }

    function posts(user) {
      return Restangular.one('posts', user._id).getList()
        .then(function (res) {
          return res;
        })
    }


    return {
      users: users,
      posts: posts

    }
  }
})();
