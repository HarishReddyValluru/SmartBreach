(function () {
    'use strict';

    angular.module('smartbreachapp.pages').
        service('formControlService', formControlService);

    formControlService.$inject = ['apiResource'];

    function formControlService(apiResource) {
        var service = {
            Register: apiResource('Smart/Register/:id', { id: '@RecordID' })
        }
        return service;
    }

})();