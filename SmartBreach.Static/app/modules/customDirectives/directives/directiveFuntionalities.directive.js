(function () {
    'use strict';

    angular
    .module('smartbreachapp.pages')
    .directive('directiveTransclude', function () {
        var directive = {
            restrict: 'E',
            transclude: true,
            template: '<div style="cursor: pointer;padding: 20px; background-color: #ccc;">' +
                        '<b>This is directive template</b>&nbsp;&nbsp;&nbsp;&nbsp;' +
                          '<ng-transclude>' +
                          '</ng-transclude>' +
                        '</div>'
        }

        return directive;
    });

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
                    methodToCall: '&method',
                    customAttr: '=?'
                },
                templateUrl: 'template/scope/isolatedscope.html',
                controller: ['$scope', controller],
                link: function (scope, element, attrs) {
                    scope.customAttr = "Attribute Data changed with link function";
                    element.find('h4').css('color', 'steelblue');
                    attrs.customAttr = 'Harish';
                }
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
                vm.viewDisplay = function () {
                    vm.methodToCall({ value: 'Returned from directive' });
                }
            }

            return directive;
        });

        angular.module("smartbreachapp.templates", []).run(["$templateCache", function ($templateCache) {
            $templateCache.put("template/scope/isolatedscope.html",
              "<h4>‘@’ – Text binding / one-way binding</h4><span>{{oneWayBinding}}</span><h4>‘=’ – Direct model binding / two-way binding</h4><span>{{twoWayBinding}}</span><h4>‘&’ – Behavior binding / Method binding</h4><button ng-click='viewDisplay()'>View Product</button><h4>Custom Attribute changes</h4><span>{{customAttr}}</span>" +
              "");
        }]);

})();