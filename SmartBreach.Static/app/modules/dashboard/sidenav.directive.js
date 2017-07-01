(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .directive('smartNavigation', function () {

            var directive = {
                restrict: 'E',
                controller: ['$scope', '$state', '$window', 'navigationService', 'smartNavigationService', controller],
                controllerAs: 'vm',
                replace: false,
                scope: {},
                bindToController: {
                    menuToBuild: '=',
                    navigationMode: '@'
                },
                templateUrl: '/static/app/modules/dashboard/layout/sidenav.html'
            };

            function controller($scope, $state, $window, navigationService, smartNavigationService) {
                var vm = this;
                vm.scope = $scope;
                vm.smartNavigationService = smartNavigationService;

                vm.$onInit = function () {
                    vm.menus = vm.menuToBuild;
                }
                
            }

            return directive;

        });


})();