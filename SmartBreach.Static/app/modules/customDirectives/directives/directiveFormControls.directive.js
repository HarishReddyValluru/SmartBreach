(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .directive('smartInputNt', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var i = 0;
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        var viewValue = validateEvenOdd(viewValue, element);
                        ngModelCtrl.$setViewValue(viewValue);
                        ngModelCtrl.$render();
                        console.log("viewValue --" + viewValue);
                    });
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        var modelValue = validateEvenOdd(modelValue, element);
                        console.log("modelValue --" + modelValue + " " + i++);
                        return modelValue;
                        //ngModelCtrl.$modelValue = modelValue;         // Doesn't work in $formatters
                        //ngModelCtrl.$setViewValue(modelValue);        // Doesn't work in $formatters - as modelValue is assigned automatically viewValue will also update
                        //ngModelCtrl.$render();                        // Doesn't work in $formatters
                    });
                }

            }
        });

    angular.module('smartbreachapp.pages')
        .directive('smartInputT', function () {
            return {
                restrict: 'EA',
                scope: {
                    sendModel: '='
                },
                controller: ['$scope', controller],
                controllerAs: 'vm',
                template: '<input type="text" ng-model="vm.sendModel1" class="form-control" />',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var i = 0;
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        var viewValue = validateEvenOdd(viewValue, element);
                        ngModelCtrl.$setViewValue(viewValue);
                        ngModelCtrl.$render();
                        console.log("viewValue --" + viewValue);
                    });
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        var modelValue = validateEvenOdd(modelValue, element);
                        console.log("modelValue --" + modelValue + " " + i++);
                        return modelValue;
                    });
                }
            }

            function controller($scope) {
                var vm = this;
                vm.sendModel1 = $scope.sendModel + "  ---  " + "Appended in directive controller";


            }

        });

    function validateEvenOdd(value, element) {
        var regNumberExp = /^\d*$/;
        if (regNumberExp.test(value)) {
            if (value % 2 === 0)
                $(element).css("border-color", "green");
            else
                $(element).css("border-color", "red");

            return value;
        }
        else {
            return null;
        }
    }

})();