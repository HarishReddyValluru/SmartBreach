(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('directiveFunctionalities', {
            templateUrl: '/static/app/modules/customDirectives/layout/directiveFuntionalities.html',
            controller: ['$scope', controller],
            controllerAs: 'vm'
        });

    function controller($scope) {
        var vm = this;
        vm.display = display;
        vm.oneWayData = 'Passed using one way binding';

        vm.twoWayBinding = "Passed using two way binding";

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        function display(value) {
            toastr.success(value);
        }

    }

})();