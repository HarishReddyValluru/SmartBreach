
(function () {
    'use strict'

    angular.module('smartbreachapp')
        .factory('sharedProperties', function () {

        var property = "First";
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        }

    });

})();