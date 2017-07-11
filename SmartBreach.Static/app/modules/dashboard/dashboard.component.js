(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('smartDashboard', {
            templateUrl: '/static/app/modules/dashboard/layout/dashboard.html',
            controller: ['$scope', '$rootScope', controller],
            controllerAs: 'vm'
        });

    function controller($scope, $rootScope) {

        var vm = this;
        vm.scope = $scope;
        vm.tgState = true;

        vm.menus = [
            {
                id: 'smartItems', name: 'Smart Items', state: 'dashboard.smartitems', cssClass: 'active-tab', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Form Builder', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formControls', name: 'Form Controls', cssClass: '', hasChildMenus: true, toOpenInNewWindow: false,
                childMenus: [
                    { name: 'Form Controls 4', state: 'dashboard.formbuilder', cssClass: '', toOpenInNewWindow: true },
                    { name: 'Form Controls 5', state: 'dashboard.formcontrols', cssClass: '', toOpenInNewWindow: false, stateParams: { employeeId: 37 } },
                    { name: 'Form Controls 6', state: 'dashboard.formbuilder', cssClass: '', toOpenInNewWindow: true }
                ]
            },
            {
                id: 'angularExamples', name: 'Angular Examples', state: 'dashboard.angularexamples', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'customDirectives', name: 'Custom Directives', cssClass: '', hasChildMenus: true, toOpenInNewWindow: false,
                childMenus: [
                    { name: 'Directive Functionalities', state: 'dashboard.directivefunctionalities', cssClass: '', toOpenInNewWindow: false },
                    { name: 'Card View', state: 'dashboard.cardview', cssClass: '', toOpenInNewWindow: false }
                ]
            },
        ];

    }

})();