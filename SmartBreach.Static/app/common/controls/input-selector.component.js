(function () {
    'use strict';

    angular
        .module('smartbreachapp.controls')
        .component('aonEbInputSelector', {
            templateUrl: '/static/app/common/controls/input-selector.component.html',
            bindings: {
                ngModelValue: '=ngModel',
                required: '<',
                disabled: '<',
                selector: '<',
                keyField: '<',
                filter:'<',
                change: '&',
            },
            require: {
                ngModel: 'ngModel'
            },
            controller: ['$scope', controller]
        });

    function controller($scope) {
        var $ctrl = this;

        $ctrl.displayName = "...";
        $ctrl.clear = clear;
        $ctrl.openSelector = openSelector;

        $ctrl.$onInit = function () {
            $ctrl.ngModel.$formatters.push(function (value) {
                //aonEbSelectorModal.getDisplayName($ctrl.selector, value, $ctrl.keyField).then(function (data) {
                //    $ctrl.displayName = data;
                //    $ctrl.ngModel.$setViewValue(value);
                //    if (value !== undefined && value !== null) {
                //        $ctrl.change(event);
                //    }
                //});
            });
        }

        function clear() {
            $ctrl.ngModelValue = null;
        };

        function openSelector() {
            alert("Search Clicked");
            //aonEbSelectorModal.openSelector($ctrl.selector, $ctrl.ngModel.$modelValue, $ctrl.keyField, $ctrl.filter)
            //    .then(function (selection) {
            //        $ctrl.ngModelValue = selection;
            //    })
            //    .catch(function (reason) {
            //        if (reason !== "cancel") {
            //            console.log("aonEbInputSelector.openSelector() : " + reason);
            //        }
            //    });
        };
    }

})();