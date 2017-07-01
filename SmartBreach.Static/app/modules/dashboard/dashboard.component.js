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
        vm.tgState = false;

        vm.menus = [
            {
                id: 'formBuilder', name: 'Form Builder', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formControls', name: 'Form Controls', cssClass: '', hasChildMenus: true, toOpenInNewWindow: false,
                childMenus: [
                    { name: 'Form Controls 4', state: 'dashboard.formbuilder', cssClass: '', toOpenInNewWindow: true },
                    { name: 'Form Controls 5', state: 'dashboard.formcontrols', cssClass: '', toOpenInNewWindow: false },
                    { name: 'Form Controls 6', state: 'dashboard.formbuilder', cssClass: '', toOpenInNewWindow: true }
                ]
            },
            {
                id: 'smartItems', name: 'Smart Items', state: 'dashboard.smartitems', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            }
        ];

    }

})();