(function () {
    'use strict';

    angular.module('smartbreachapp').component('appLoader', {
            templateUrl: '/static/app/app-loader.component.html',
            transclude: true,
            controller: ['$scope', '$timeout', controller]
        });

    function controller($scope, $timeout) {

        var $ctrl = this;

        $ctrl.status = "Loading";

        $timeout(function () {
            $ctrl.status = "Loaded";
        }, 1000);

    }

})();