(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('formControls', {
            templateUrl: '/static/app/modules/formControls/layout/formControls.html',
            controllerAs: 'vm',
            controller: ['$q', '$scope', '$rootScope', '$window', '$stateParams', '$cacheFactory', '$timeout', '$filter', '$uibModal', 'formControlService', 'modalConfirmService', controller]
        });

    function controller($q, $scope, $rootScope, $window, $stateParams, $cacheFactory, $timeout, $filter, $uibModal, formControlService, modalConfirmService) {

        var vm = this;
        vm.query = _query;
        vm.get = _get;
        vm.put = _put;
        vm.post = _post
        vm.delete = _delete;
        vm.getFormData = _getFormData;
        vm.singleCustomList = _singleCustomList;
        vm.multipleCustomList = _multipleCustomList;

        toastr.success( "StateParam Parameter :   " + $stateParams.employeeId);

        vm.gender = [
            { id: 1, type: 'Male' },
            { id: 2, type: 'Female' }
        ];

        vm.countries = [
            { id: 1, name: 'India' },
            { id: 2, name: 'Japan' },
            { id: 3, name: 'China' },
            { id: 4, name: 'Russia' }
        ];

        vm.allStates = [
            { id: 1, name: 'Andhra Pradesh', countryId: 1 },
            { id: 2, name: 'Telangana', countryId: 1 },
            { id: 3, name: 'Japan State 1', countryId: 2 },
            { id: 4, name: 'Japan State 2', countryId: 2 },
            { id: 5, name: 'Japan State 3', countryId: 2 },
            { id: 6, name: 'China State 1', countryId: 3 },
            { id: 7, name: 'Russia State 1', countryId: 4 },
            { id: 8, name: 'Russia State 2', countryId: 4 }
        ];

        vm.directions = [
            { id: 1, name: 'East' },
            { id: 2, name: 'West' },
            { id: 3, name: 'North' },
            { id: 4, name: 'South' }
        ];

        vm.matrixVibes = [
            { id: 1, name: 'Matrix 1' },
            { id: 2, name: 'Matrix 2' },
            { id: 3, name: 'Matrix 3' },
            { id: 4, name: 'Matrix 4' }
        ];

        angular.element(document).ready(function () {
            $scope.$watch('vm.register.selectedCountry', function () {
                vm.states = vm.allStates.filter(function (s) {
                    return s.countryId == vm.register.selectedCountry;
                });
            });
        });

        function _getFormData() {
            alert(JSON.stringify(vm.register));
        }

        function _query() {
            formControlService.Register.query({}).then(function (data) {
                toastr.success(data)
            });
        }

        function _get() {
            formControlService.Register.get({ id: 2444 }).then(function (data) {
                toastr.success(data)
            });
        }

        function _put() {
            vm.vibes = { id: 1, name: 'Matrix 1' };
            formControlService.Register.update({ id: 2444 }, vm.vibes).then(function (data) {
                toastr.success(data)
            });
        }

        function _post() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlService.Register.save({}, vm.saveVibes).then(function (data) {
                toastr.success(data)
            });
        }

        function _delete() {
            formControlService.Register.delete({ id: 32 }).then(function (data) {
                toastr.success(data)
            });
        }

        function _singleCustomList() {
            formControlService.Register.singleCustomList({}).then(function (data) {
                toastr.success(data)
            });
        }

        function _multipleCustomList() {
            formControlService.Register.multipleCustomList({ id: 2444 }).then(function (data) {
                toastr.success(data)
            });
        }

    };
})();
