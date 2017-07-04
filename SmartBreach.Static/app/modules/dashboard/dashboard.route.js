(function () {
    'use strict';

    angular
        .module('smartbreachapp.dashboard').config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/Dashboard', '/Dashboard/FormBuilder');

        $stateProvider
            .state('dashboard',
            {
                abstract: true,
                url: "/Dashboard",
                template: '<smart-dashboard></smart-dashboard>'
            })
            .state('dashboard.formbuilder',
            {
                url: "/FormBuilder",
                template: "<dynamic-formbuilder></dynamic-formbuilder>"
            })
            .state('dashboard.formcontrols',
            {
                url: "/FormControls",
                template: "<form-controls></form-controls>"
            })
            .state('dashboard.smartitems',
            {
                url: "/SmartItems",
                template: "<smart-items></smart-items>"
            })

    }
})();