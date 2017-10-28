(function () {
    'use strict';

    angular.module('smartbreachapp.pages').
        service('formControlService', formControlService);

    formControlService.$inject = ['apiResource'];

    function formControlService(apiResource) {
        var service = {
            Register: apiResource('Smart/Register/:id', { id: '@RecordID', dataSource: "@DataSource" }, {
                singleCustomList: { method: 'GET', url: 'Smart/Register/:id/singleCustomList', isArray: true },
                multipleCustomList: { method: 'GET', url: 'Smart/Register/multipleCustomList/:dataSource', isArray: true } // isArray: true -- For list of objects
            })
        }
        return service;
    }

})();