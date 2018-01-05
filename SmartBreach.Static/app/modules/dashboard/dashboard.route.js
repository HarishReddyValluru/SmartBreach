(function () {
    'use strict';

    angular
        .module('smartbreachapp.dashboard').config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/Dashboard', '/Dashboard/SmartItems');

        $stateProvider
            .state('dashboard',
            {
                abstract: true,
                url: "/Dashboard",
                template: '<smart-dashboard></smart-dashboard>'
            })
            .state('dashboard.smartitems',
            {
                url: "/SmartItems",
                template: "<smart-items></smart-items>"
            })
            .state('dashboard.formbuilder',
            {
                url: "/FormBuilder",
                template: "<dynamic-formbuilder></dynamic-formbuilder>",
                params: {
                    EntityName: ""
                }
            })
            .state('dashboard.formcontrols',
            {
                url: "/FormControls/:employeeId",
                template: "<form-controls></form-controls>"
            })
            .state('dashboard.angularexamples',
            {
                url: "/AngularExamples",
                template: "<angular-examples></angular-examples>"
            })
            .state('dashboard.directivefunctionalities',
            {
                url: "/DirectiveFunctionalities",
                template: "<directive-functionalities></directive-functionalities>"
            })
            .state('dashboard.directiveformcontrols',
            {
                url: "/DirectiveFormControls",
                template: "<directive-formcontrols></directive-formcontrols>"
            })

    }
})();