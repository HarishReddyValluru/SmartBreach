
(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('appInformation', {
            templateUrl: '/static/app/modules/appInformation/layout/app-information.html',
            controller: ['$scope', controller],
            controllerAs: 'vm',
            bindings: {
                modalInstance: '<'
            }
        });

    function controller($scope) {
        var vm = this;
        vm.cancel = cancel;

        function cancel() {
            vm.modalInstance.dismiss();
        }

    }

})();