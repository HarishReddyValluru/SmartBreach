(function () {
    'use strict'

    angular.module('smartbreachapp.pages')
        .component('directiveFormcontrols', {
            templateUrl: 'static/app/modules/customDirectives/layout/directiveFormcontrols.html',
            controller: ['$scope', controller]
        })

    function controller($scope) {
        var $ctrl = this;
        $ctrl.number1 = 23;
        $ctrl.number2 = 3;

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

    }

})();