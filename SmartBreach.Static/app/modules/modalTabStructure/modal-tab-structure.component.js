
(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('modalTabStructure', {
            templateUrl: '/static/app/modules/modalTabStructure/layout/modal-tab-structure.html',
            controller: ['$scope', '$state', controller],
            controllerAs: 'vm',
            bindings: {
                modalInstance: '<'
            }
        });

    function controller($scope, $state) {
        var vm = this;
        vm.cancel = cancel;
        vm.navigationMode = "horizontal";
        
        function cancel() {
            vm.modalInstance.close();
            $state.go('dashboard.smartitems');
        }

        vm.menus = [
            {
                id: 'formBuilder', name: 'Form Builder', state: 'tabstructure.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formcontrols', name: 'Form Controls', state: 'tabstructure.formcontrols', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'smartitems', name: 'Smart Items', state: 'tabstructure.smartitems', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            }];
    }

})();