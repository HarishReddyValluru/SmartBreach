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
                    var pos = vm.currentPosition++;
                    vm.selectedItem = vm.list[pos];
                }

                function _moveBottom() {
                    var pos = vm.currentPosition--;
                    vm.selectedItem = vm.list[pos-2];
                }

            }

        });


    //angular.module("smartbreachapp.templates").run(['$templateCache', function ($templateCache) {
    //    $templateCache.put('template/scope/objectMotion.html',
    //                '<div>' +
    //                     '<span>Record : 2/7</span>' +
    //                     '<i class="fa fa-arrow-up"></i>' +
    //                     '<i class="fa fa-arrow-down"></i>' +
    //                 '</div>'
    //        )
    //}]);

})();