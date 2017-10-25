(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('formControls', {
            templateUrl: '/static/app/modules/formControls/layout/formControls.html',
            controllerAs: 'vm',
            controller: ['$q', '$scope', '$rootScope', '$window', '$stateParams', '$cacheFactory', '$timeout', '$filter', '$uibModal', 'formControlService', 'formControlsHttpService', 'modalConfirmService', controller]
        });

    function controller($q, $scope, $rootScope, $window, $stateParams, $cacheFactory, $timeout, $filter, $uibModal, formControlService, formControlsHttpService, modalConfirmService) {

        var vm = this;
        vm.query = _query;
        vm.get = _get;
        vm.put = _put;
        vm.post = _post
        vm.delete = _delete;

        vm.httpQuery = _httpQuery;
        vm.httpGet = _httpGet;
        vm.httpPut = _httpPut;
        vm.httpPost = _httpPost;
        vm.httpDelete = _httpDelete;

        vm.getFormData = _getFormData;
        vm.singleCustomList = _singleCustomList;
        vm.multipleCustomList = _multipleCustomList;

        toastr.success("StateParam Parameter :   " + $stateParams.employeeId);

        $scope.$onInit = function () {
            vm.disableStatus = !vm.registrationForm.$invalid;
        }

        //$scope.$watch(angular.bind(this, function () {
        //    return this.name;
        //}), function (newVal) {
        //    console.log('Name changed to ' + newVal);
        //});

        vm.years = [2015, 2016, 2017];
        
        vm.gender = [
            { id: 1, type: 'Male' },
            { id: 2, type: 'Female' }
        ];

        vm.register = {
            multiSelectModel: []
        }

        vm.multiSelectData = [
            { id: 1, label: "David" },
            { id: 2, label: "Jhon" },
            { id: 3, label: "Danny" }
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

        vm.cities = {
            city1: 'Hyderabad',
            city2: 'Kurnool',
            city3: 'Visakapatnam',
            city4: 'vijayawada'
        }

        vm.towns = {
            town1: {id: 1, name: 'Town Name 1'},
            town2: { id: 2, name: 'Town Name 2' },
            town3: { id: 3, name: 'Town Name 3' },
            town4: { id: 4, name: 'Town Name 4' }
        }

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

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        function _getFormData() {
            alert(JSON.stringify(vm.register));
        }

        //---------------------------------------USING API RESOURCE----------------------------------------------------------------------

        function _query() {
            formControlService.Register.query({}).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _get() {
            formControlService.Register.get({ id: 2444 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _put() {
            vm.vibes = { recid: 1, name: 'Matrix 1' };
            formControlService.Register.update({ id: 2444 }, vm.vibes).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _post() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlService.Register.save({}, vm.saveVibes).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _delete() {
            formControlService.Register.delete({ id: 32 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _singleCustomList() {
            formControlService.Register.singleCustomList({}).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _multipleCustomList() {
            formControlService.Register.multipleCustomList({ dataSource: 5454 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data.id + " , " + data.name);
            });
        }

        //------------------------------------USING $HTTP-------------------------------------------------------------

        function _httpQuery() {
            formControlsHttpService.httpQuery().then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpGet() {
            formControlsHttpService.httpGet(14).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpPut() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlsHttpService.httpPut(35, vm.saveVibes).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpPost() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlsHttpService.httpPost(vm.saveVibes).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpDelete() {
            formControlsHttpService.httpDelete(56).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

    };
})();
