(function () {
    'use strict';

    angular
        .module('smartbreachapp.dashboard').config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabstructure', {
                url: "/TabStructure/:employeeId",
                parent: 'dashboard.smartitems',
                resolve: {
                    modalInstance: ['$uibModal', function ($uibModal) {
                        return $uibModal.open(
                         {
                             component: 'modalTabStructure',
                             backdrop: 'static',
                             size: "lg",
                         });
                    }]
                }
            })
            .state('tabstructure.formbuilder',
            {
                url: "/FormBuilder",
                views: {
                    'tabbody@': {
                        template: "<dynamic-formbuilder></dynamic-formbuilder>"
                    }
                }
            })
            .state('tabstructure.formcontrols',
            {
                url: "/FormControls/:employeeId",
                views: {
                    'tabbody@': {
                        template: "<form-controls></form-controls>"
                    }
                }
            })
            .state('tabstructure.smartitems',
            {
                url: "/SmartItems",
                views: {
                    'tabbody@': {
                        template: "<smart-items></smart-items>"
                    }
                }
            })
    }
})();