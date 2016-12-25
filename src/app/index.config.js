(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .config(config)
    .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
    .config(function (RestangularProvider,  API_EP) {
      RestangularProvider.setBaseUrl(API_EP);
      var token = localStorage.getItem('jwt');
      token = JSON.parse(token);
      RestangularProvider.setDefaultHeaders({Authorization: token});
    });

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
