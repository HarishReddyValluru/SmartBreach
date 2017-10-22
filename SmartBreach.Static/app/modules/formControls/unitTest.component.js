(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('unitTesting', {
            templateUrl: '/static/app/modules/formControls/layout/unitTest.html',
            controllerAs: 'vm',
            controller: ['$q', '$scope', '$rootScope', '$window', controller]
        });

    function controller($q, $scope, $rootScope, $window) {

        var vm = this;
        vm.mode = 'fun'; //Lets test if property name is set to Rahil
        vm.mode1 = 'funa';

    };
})();
