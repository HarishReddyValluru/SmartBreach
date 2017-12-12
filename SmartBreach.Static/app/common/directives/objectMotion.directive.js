(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .directive('objectMotion', function () {
            return {
                restrict: 'EA',
                templateUrl: '/static/app/common/directives/objectMotion.html',
                controller: ['$scope', controller],
                controllerAs: 'vm',
                scope: {
                    getObject: '='
                }
            }

            function controller($scope) {
                var vm = this;
                vm.moveTop = _moveTop;
                vm.moveBottom = _moveBottom;
                vm.currentPosition = 1;

                vm.$onInit = function () {
                    vm.list = $scope.getObject;
                    vm.selectedItem = vm.list[0];
                }

                function _moveTop() {
                    if (vm.currentPosition < vm.list.length) {
                        var pos = vm.currentPosition++;
                        vm.selectedItem = vm.list[pos];
                    }
                }

                function _moveBottom() {
                    if (vm.currentPosition != 1 && vm.currentPosition <= vm.list.length) {
                        var pos = vm.currentPosition--;
                        vm.selectedItem = vm.list[pos - 2];
                    }
                }

            }

        });

})();