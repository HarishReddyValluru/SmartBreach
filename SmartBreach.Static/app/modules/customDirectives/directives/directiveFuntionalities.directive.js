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
                        '</b></div>'
        }

        return directive;
    });

    //scope: false(default)     //Shared Scope
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

    //scope: true       //Inherited Scope
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
                templateUrl: 'template/scope/isolatedscope.html',
                controller: ['$scope', controller]
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
          "<h4>‘@’ – Text binding / one-way binding</h4><span>{{oneWayBinding}}</span><h4>‘=’ – Direct model binding / two-way binding</h4><span>{{twoWayBinding}}</span><h4>‘&’ – Behavior binding / Method binding</h4><button ng-click='viewDisplay()'>View Product</button>" +
          "");
    }]);

    //Compile function
    angular
        .module('smartbreachapp.pages')
        .directive('directiveCompile', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    compileAttr: '=?'
                },
                template: '<h4>Compile Attribute changes</h4><div class="custom-div"><center><span>{{compileAttr}}</span></center></div>',
                controller: ['$scope', controller],
                compile: function (scope, element, attrs) {

                    //==========Not accesible, as the scope is not available for compile - Then use pre and post========//
                    //element.find('h4').css('color', 'steelblue');
                    //attrs.customAttr = 'Harish';
                    //scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 

                    //return {
                    //    post: function (scope, element, attrs) {
                    //        scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //    }
                    //}

                    return {
                        pre: function (scope, element, attrs) {
                            scope.compileAttr = "COMPILE - Attribute Data changed with compile function";
                        }
                    }

                    //return function preLink(scope, element, attrs) {
                    //    scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //}

                    //return function postLink(scope, element, attrs) {
                    //    element.find('h4').css('color', 'steelblue');
                    //    scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //}
                }
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
            }

            return directive;
        });

    //Link function
    angular
        .module('smartbreachapp.pages')
        .directive('directiveLink', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    linkAttr: '=?'
                },
                template: '<h4>{{linkheading}}</h4><div class="custom-div"><center><span>{{linkAttr}}</span></center></div>',
                controller: ['$scope', controller],
                link: function (scope, element, attrs) {
                    scope.linkAttr = "LINK - Attribute Data changed with link function";

                    element.find(".custom-div").css({ 'background-color': '#ccc', 'color': 'black' });

                    element.on('click', function () {
                        if (!element.find(".custom-div").hasClass("act"))
                            element.find(".custom-div").addClass("act").css({ 'background-color': 'steelblue', 'color': 'white' });
                        else
                            element.find(".custom-div").removeClass("act").css({ 'background-color': '#ccc', 'color': 'black' });
                    });

                }
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
                vm.linkheading = "Link attribute changes";
            }

            return directive;
        });

    //bindToController
    angular
        .module('smartbreachapp.pages')
        .directive('directiveBindtocontroller', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {},
                controller: ['$scope', controller],
                controllerAs: 'vm',
                bindToController:{
                    bindtocontrollerAttr: '='
                },
                template: '<h4>{{vm.bindToControllerHeading}}</h4><span>{{vm.bindtocontrollerText}}</span>'
            }

            function controller($scope) {
                var vm = this;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.

                vm.$onInit = function () {
                    vm.bindToControllerHeading = "bindToController text changes";
                    vm.bindtocontrollerText = vm.bindtocontrollerAttr;
                }
                
            }

            return directive;
        });

    //services - $compile, $parse, $interpolate
    angular
        .module('smartbreachapp.pages')
        .directive('directiveServices', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                controller: ['$scope', controller],
                controllerAs: 'vm',
                scope: {
                    oneWayBinding: '@',
                },
                template: '<h4>{{vm.bindToControllerHeading}}</h4><span>My name is {{oneWayBinding}}</span>'
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.

                vm.$onInit = function () {
                    vm.bindToControllerHeading = "$compile";
                }

            }

            return directive;
        });

})();