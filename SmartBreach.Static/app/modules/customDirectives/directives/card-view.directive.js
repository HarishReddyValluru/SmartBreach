(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .directive('cardViewList', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                controller: ['$scope', controller],
                controllerAs: 'vm'


            }
        });

})();