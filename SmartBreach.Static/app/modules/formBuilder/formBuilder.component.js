(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('dynamicFormbuilder', {
            templateUrl: '/static/app/modules/formBuilder/layout/formBuilder.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', '$window', '$cacheFactory', '$timeout', '$filter', controller]
        });

    function controller($scope, $rootScope, $window, $cacheFactory, $timeout, $filter) {

        var vm = this;
        vm.addRow = _addRow;
        vm.removeRow = _removeRow;
        vm.getFormBuilderData = _getFormBuilderData;

        vm.countries = [
            { id: 1, name: 'India' },
            { id: 2, name: 'Japan' },
            { id: 3, name: 'China' },
            { id: 4, name: 'Russia' }
        ];

        vm.formBuilder = [{
            name: "",
            country: ""
        }];

        function _addRow() {
            var newItemNo = vm.formBuilder.length + 1;
            vm.formBuilder.push({
                name: "",
                country: ""
            });
        }

        function _removeRow() {
            var newItemNo = vm.formBuilder.length - 1;
            vm.formBuilder.pop({
                name: "",
                country: ""
            });
        }

        function _getFormBuilderData() {
            alert(angular.toJson(vm.formBuilder));
            console.log(angular.fromJson(vm.formBuilder));
        }

    };
})();