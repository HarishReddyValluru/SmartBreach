(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .component('smartItems', {
            templateUrl: '/static/app/modules/smartItems/layout/smartItems.html',
            controller: ['$scope', '$uibModal', '$state', 'modalConfirmService', controller],
            controllerAs: 'vm'
        });

    function controller($scope, $uibModal, $state, modalConfirmService) {
        var vm = this;
        vm.navigationMode = "horizontal";
        vm.openModalPopup = openModalPopup;
        vm.openTabStructureModalPopup = openTabStructureModalPopup;
        vm.openConfirmationPopup = openConfirmationPopup;
        vm.toastrSuccess = toastrSuccess;
        vm.toastrError = toastrError;
        vm.toastrWarning = toastrWarning;
        vm.toastrInfo = toastrInfo;

        function openModalPopup() {
            var modalInstance = $uibModal.open(
             {
                 component: 'appInformation',
                 backdrop: 'static'
             });

            modalInstance.result.then(function (eventData) {

            }, function () {

            });
        }

        function openTabStructureModalPopup() {
            $state.go('tabstructure.formbuilder', { employeeId: 53 });
        }

        function openConfirmationPopup() {
            modalConfirmService.confirm
            ({
                text: "Are you sure you want to cancel?   All the changes will be discarded",
                title: "Confirmation Message",
                onOk: function () {

                },
                onCancel: function () {

                }
            });
        }

        function toastrSuccess() {
            toastr.success("toastr Success");
        }

        function toastrError() {
            toastr.error("toastr Error");
        }

        function toastrWarning() {
            toastr.warning("toastr Warning");
        }

        function toastrInfo() {
            toastr.info("toastr Info");
        }

        vm.menus = [
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            }
        ];
    }

})();