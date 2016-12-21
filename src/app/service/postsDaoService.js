(function () {
  'use strict';

  angular
    .module('tutFrontend')
    .factory('postsDaoService', postsDaoService);

  function postsDaoService($rootScope, Restangular, jwtHelper, store, authManager) {

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

    function checkAuthOnRefresh() {
      var token = store.get('jwt');
      if (token) {
        console.log('token');
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }


    function logout() {
      store.remove('jwt');
      store.remove('user');
      authManager.unauthenticate();
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

    function createUser(data) {
        return Restangular.all('users').post(data).
          then(function(res) {
          return res;
        })
    }


    return {
      getUserList: getUserList,
      getUserPosts: getUserPosts,
      getLastUsersPosts: getLastUsersPosts,
      getUserPost: getUserPost,
      login: login,
      logout: logout,
      checkAuthOnRefresh: checkAuthOnRefresh,
      createUser: createUser
    }
  }
})();
