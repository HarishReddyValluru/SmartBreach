(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('secondPage', {
            templateUrl: '/static/app/modules/angularExamples/layout/second-page.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', '$window', '$timeout', 'sharedProperties', controller],
            bindings: {
                oneWayBinding: '<',
                twoWayBinding: '='
            }
        });

    function controller($scope, $rootScope, $window, $timeout, sharedProperties) {
        
        var vm = this;
        vm.vmParent = $scope.vm;
        vm.proceed = _proceed;

        vm.$onInit = function () {
            vm.recieveOneWayBinding = vm.oneWayBinding;
            vm.recieveTwoWayBinding = vm.twoWayBinding;

            vm.countries = [
                { id: 1, name: 'India' },
                { id: 2, name: 'Japan' },
                { id: 3, name: 'China' },
                { id: 4, name: 'Russia' }
            ];
        }

        function _proceed() {
            //Set $window.sessionStorage value in second page
            if (!angular.isDefined($window.sessionStorage.getItem('cacheValue')) || $window.sessionStorage.getItem('cacheValue') != null) {
                vm.sessionStorageValue = $window.sessionStorage.getItem('cacheValue');
            }

            //Set Shared property value from first page to second page
            vm.sharedPropertyValue = sharedProperties.getProperty();
        }

        $scope.$on('broadcastPropertyEvent', function (event, args) {
            vm.broadcastPropertyValue = args.broadcastValue;
        });

        //Emit properties $scope ----> $rootScope
        $scope.$watch('vm.emitProperty', function () {
            $scope.$emit('emitPropertyEvent', { 'emitValue': vm.emitProperty })
        });

    };
})();

