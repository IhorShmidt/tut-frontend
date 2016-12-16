(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .factory('postsDaoService', postsDaoService);

  function postsDaoService(Restangular,jwtHelper, store) {

    function login(credentials) {
      return Restangular.one('auth').customPOST(credentials)
        .then(function (response) {
          console.log(response);
          store.set('jwt', response.accessToken);
          var decodedToken = jwtHelper.decodeToken(response.accessToken);
          console.log(decodedToken);
          store.set('user', {
            id: decodedToken.userId,
            firstName: response.firstName,
            lastName: response.lastName
          });
          authManager.authenticate();
        })
    }

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

    function getUserPost(id) {
      console.log("sercice " + id);
      return Restangular.one('posts', id).customGET()
        .then(function (res) {
          console.log(res);

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
      getLastUsersPosts: getLastUsersPosts,
      getUserPost: getUserPost,
      login: login
    }
  }
})();
