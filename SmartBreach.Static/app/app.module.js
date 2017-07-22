﻿(function ($window) {
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
             'smartbreachapp.templates'
    ]);

    //'ui.bootstrap' - injected when issue with modal popup

    angular.module('smartbreachapp.dashboard', []);
    angular.module('smartbreachapp.pages', ['checklist-model', 'angularjs-dropdown-multiselect']);
    angular.module("smartbreachapp.templates", ['template/scope/isolatedscope.html']);

    // For RequestContext
    angular
    .module('smartbreachapp')
    .constant('RequestContext', BoostrapRequestContext()) //bootstrap data from function written directly in page

    .factory('appPathFactory', ['RequestContext', function appPathServiceFactory(RequestContext) {
            return {
                localPath: function () {
                       return RequestContext.PathSPA;
                   }
            };
        }])

})(window);