(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .directive('objectMotion', function () {
            return {
                restrict: 'EA',
                template: '<div><span>Record : 2/7</span><i class="fa fa-arrow-up" ng-click="vm.moveTop()"></i><i class="fa fa-arrow-down" ng-click="vm.moveBottom()"></i></div>',
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

                vm.$onInit = function () {
                    vm.list = $scope.getObject;
                }

                function _moveTop() {
                    alert("UP");
                }

                function _moveBottom() {
                    alert("Bottom");
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