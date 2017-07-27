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
                templateUrl: 'template/scope/sideNav.html',
                link: function (scope, elem, attrs) {

                }
            };

            function controller($scope, $state, $window, navigationService, smartNavigationService) {
                var vm = this;
                
                vm.smartNavigationService = smartNavigationService;

                vm.$onInit = function () {
                    vm.menus = vm.menuToBuild;
                }

            }

            return directive;

        });

    angular.module("smartbreachapp.templates").run(['$templateCache', function ($templateCache) {
        $templateCache.put("template/scope/sideNav.html",
            '<div class="mainmenu">' +
                '<div ng-repeat="menu in vm.menus" ng-class="{\'horzontal-nav\': vm.navigationMode == \'horizontal\'}">' +
                    '<div class="menu-tab {{menu.cssClass}}" ng-if="!menu.hasChildMenus" ng-click="vm.smartNavigationService.redirectToState(menu, menu.toOpenInNewWindow, $event)">{{menu.name}}</div>' +
                    '<div id="{{menu.id}}_btn" ng-if="menu.hasChildMenus" aria-expanded="false" data-toggle="collapse" data-target="#{{menu.id}}_submenu">{{menu.name}}<i class="fa fa-caret-down pull-right"></i></div>' +
                    '<ul class="collapse submenu" ng-if="menu.hasChildMenus" id="{{menu.id}}_submenu" aria-labelledby="{{menu.id}}_btn" role="menu">' +
                        '<li role="presentation" ng-repeat="childMenu in menu.childMenus" class="{{childMenu.cssClass}}">' +
                            '<div class="sub-menu-tab {{menu.cssClass}}" ng-click="vm.smartNavigationService.redirectToState(childMenu, childMenu.toOpenInNewWindow, $event)">{{childMenu.name}}</div>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
            )

    }])


})();