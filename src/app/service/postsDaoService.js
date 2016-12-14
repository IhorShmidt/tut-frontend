(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .factory('postsDaoService', postsDaoService);

  function postsDaoService(Restangular) {


    function getUserList() {
      return Restangular.all('users').getList()
        .then(function (res) {
          return res;
        })
    }

    function getUserPosts(user) {
      return Restangular.one('posts', user._id).getList()
        .then(function (res) {
          return res;
        })
    }

    function getLastUsersPosts() {
      return Restangular.all('posts').getList()
        .then(function (res) {
          return res;
        })
    }


    return {
      getUserList: getUserList,
      getUserPosts: getUserPosts,
      getLastUsersPosts: getLastUsersPosts
    }
  }
})();
