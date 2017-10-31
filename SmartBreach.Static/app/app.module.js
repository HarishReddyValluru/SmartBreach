(function ($window) {
    'use strict';

    $window.jsLoaded = true; //  for CDN fallback

    angular.module('smartbreachapp', [
             'ui.router',
             'ngHamburger',
             'ui.bootstrap',
             'ngResource',
             'ngAnimate',
             'ngSanitize',
             'smartbreachapp.dashboard',
             'smartbreachapp.pages',
             'smartbreachapp.templates',
             'smartbreachapp.controls'
    ]);

    //'ui.bootstrap' - injected when issue with modal popup

    angular.module('smartbreachapp.dashboard', []);
    angular.module('smartbreachapp.pages', ['checklist-model', 'angularjs-dropdown-multiselect']);
    angular.module("smartbreachapp.templates", ['template/scope/isolatedscope.html', "template/scope/sideNav.html"]);
    angular.module('smartbreachapp.controls', []);

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