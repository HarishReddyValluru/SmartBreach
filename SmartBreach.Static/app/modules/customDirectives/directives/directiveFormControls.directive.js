(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .directive('smartInput', function () {
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function (scope, element, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (value) {
                        console.log(value);
                    });
                    
                }
            }

        });

   


})();