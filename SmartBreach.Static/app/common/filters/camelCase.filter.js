

(function () {
    'use strict';

    var module = angular.module('smartbreachapp');

    module.filter('camelCase', function () {
        return function (x) {
            var c;
            for (var i = 0; i < x.length; i++) {
                c = x[i].name;
                var text = "";
                for (var j = 0; j < c.split('').length; j++) {
                    if (j === 2) {
                        text += c[j].toUpperCase();
                    }
                    else{
                        text += c[j];
                    }
                    x[i].name = text;
                }
            }
            return x;
        };
    });
})();