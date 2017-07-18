(function ($window) {
    'use strict';

    $window.jsLoaded = true; //  for CDN fallback

    angular.module('smartbreachapp', [
             'ui.router',
             'ngHamburger',
             'ui.bootstrap',
             'smartbreachapp.dashboard',
             'smartbreachapp.pages',
             'ngResource',
             'ngAnimate',
             'ui.directive.templates'
    ]);

    //'ui.bootstrap' - injected when issue with modal popup

    angular.module('smartbreachapp.dashboard', []);
    angular.module('smartbreachapp.pages', ['checklist-model', 'angularjs-dropdown-multiselect']);
    angular.module("ui.directive.templates", ['template/scope/isolatedscope.html']);

})(window);