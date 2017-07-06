(function () {
    'use strict';

    angular
        .module('smartbreachapp')
        .service('smartNavigationService', smartNavigationService);

    smartNavigationService.$inject = ['$rootScope', '$state', '$window'];

    function smartNavigationService($rootScope, $state, $window) {

        var service = {
            redirectToState: redirectToState
        };

        function redirectToState(item, openInNewWindow, $event) {
            angular.element(".menu-tab, .sub-menu-tab").removeClass('active-tab');
            angular.element($event.target).addClass('active-tab');
            if (openInNewWindow) {
                var url = $state.href(item.state, item.stateParams);
                $window.open(url, '_blank', 'status=0,toolbar=0,resizable=1');
            }
            else {
                $state.go(item.state, item.stateParams);
            }
        }

        return service;

    }

})();