(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('secondPage', {
            templateUrl: '/static/app/modules/angularExamples/layout/second-page.html',
            controller: ['$scope', '$rootScope', '$window', '$timeout', 'sharedProperties', controller],
            bindings: {
                'oneWayBinding': '<',
                'twoWayBinding': '='
            }
        });

    function controller($scope, $rootScope, $window, $timeout, sharedProperties) {
        
        var $ctrl = this;
        $ctrl.vmParent = $scope.vm;
        $ctrl.proceed = _proceed;

        $ctrl.$onInit = function () {
            $ctrl.countries = [
                { id: 1, name: 'India' },
                { id: 2, name: 'Japan' },
                { id: 3, name: 'China' },
                { id: 4, name: 'Russia' }
            ];
        }

        function _proceed() {
            //Set $window.sessionStorage value in second page
            if (!angular.isDefined($window.sessionStorage.getItem('cacheValue')) || $window.sessionStorage.getItem('cacheValue') != null) {
                $ctrl.sessionStorageValue = $window.sessionStorage.getItem('cacheValue');
            }

            //Set Shared property value from first page to second page
            $ctrl.sharedPropertyValue = sharedProperties.getProperty();
        }

        $scope.$on('broadcastPropertyEvent', function (event, args) {
            $ctrl.broadcastPropertyValue = args.broadcastValue;
        });

        //Emit properties $scope ----> $rootScope
        $scope.$watch('$ctrl.emitProperty', function () {
            $scope.$emit('emitPropertyEvent', { 'emitValue': $ctrl.emitProperty })
        });

    };
})();

