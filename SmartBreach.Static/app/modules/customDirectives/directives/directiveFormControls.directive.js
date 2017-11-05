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
                        validateEvenOdd(viewValue, element, ngModelCtrl);
                        return viewValue;
                    });
                }
            }
        });

    angular.module('smartbreachapp.pages')
        .directive('smartInputT', function () {
            return {
                restrict: 'EA',
                scope: {
                    sendModel: '=',
                    disabled:'='
                },
                controller: ['$scope', controller],
                controllerAs: 'vm',
                replace: true,
                template: '<input type="text" ng-model="vm.sendModelValue" ng-disabled="vm.disabled" class="form-control" required />',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        validateEvenOdd(viewValue, element, ngModelCtrl);
                        return viewValue;
                    });
                }
            }

            function controller($scope) {
                var vm = this;
                vm.sendModelValue = $scope.sendModel + "  ---  " + "Appended in directive controller";
                vm.disabled = $scope.disabled;
            }

        });

    function validateEvenOdd(value, element, ngModelCtrl) {
        var regNumberExp = /^\d*$/;
        if (regNumberExp.test(value)) {
            if (value % 2 === 0) {
                $(element).css("border-color", "green");
                ngModelCtrl.$setValidity('input', true);
            }
            else {
                $(element).css("border-color", "red");
                ngModelCtrl.$setValidity('input', false);
            }
            return value;
        }
        else {
            return null;
        }
    }

})();