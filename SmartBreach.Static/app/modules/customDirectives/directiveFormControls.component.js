﻿(function () {
    'use strict'

    angular.module('smartbreachapp.pages')
        .component('directiveFormcontrols', {
            templateUrl: 'static/app/modules/customDirectives/layout/directiveFormcontrols.html',
            controller: ['$scope', controller]
        })

    function controller($scope) {
        $scope.name = "Harish";

    }


})();