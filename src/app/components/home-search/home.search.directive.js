(function() {
  'use strict';

  angular
    .module('tutFrontend')
    .directive('xngFocus', function () {
      return function (scope, element, attrs) {
        return scope.$watch(attrs.xngFocus, function (newValue) {
          console.log(newValue);
          return newValue && element[0].focus();
        });
      };
    });


})();
