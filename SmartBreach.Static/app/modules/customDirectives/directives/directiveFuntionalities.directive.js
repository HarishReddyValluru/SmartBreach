(function () {
    'use strict';

    //scope: false(default)
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeFalse', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: false,
                template: "<div>Product title : {{product}}</div>" +
                            "Type a new product title : <input type='text' class='form-control' ng-model='product' />"
            }

            return directive;
        });

    //scope: true
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeTrue', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: true,
                template: "<div>Product title : {{product1}}</div>" +
                            "Type a new product title : <input type='text' class='form-control' ng-model='product1' />"
            }

            return directive;
        });

    //scope: {} -- which is an isolated scope
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeIsolated', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    oneWayBinding: '@',
                    twoWayBinding: '=',
                    methodToCall: '&method'
                },
                template: "<h4>‘@’ – Text binding / one-way binding</h4><br/><span>{{oneWayBinding}}</span><br/><h4>‘=’ – Direct model binding / two-way binding</h4><br/><span>{{twoWayBinding}}</span><h4>‘&’ – Behavior binding / Method binding</h4><br/><button ng-click='viewDisplay()'>View Product</button>",
                controller: ['$scope', controller]

            }

            function controller($scope) {
                $scope.viewDisplay = function () {
                    $scope.methodToCall({ value: 'Harish Reddy' });
                }
            }

            return directive;
        });

})();