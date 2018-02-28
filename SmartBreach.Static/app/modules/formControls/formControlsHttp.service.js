(function () {
    'use strict'

    angular.module('smartbreachapp.pages')
        .service('formControlsHttpService', formControlsHttpService);

    formControlsHttpService.$inject = ['$http', 'RequestContext'];

    function formControlsHttpService($http, RequestContext) {

        var service = {
            httpQuery: httpQuery,
            httpGet: httpGet,
            httpPost: httpPost,
            httpPut: httpPut,
            httpDelete: httpDelete
        }

        function httpQuery() {
            return $http({
                method: 'GET',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register'
            });
        }

        function httpGet(id) {
            return $http({
                method: 'GET',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id
            });
        }

        function httpPost(dataToSave) {
            return $http({
                method: 'POST',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register',
                data: dataToSave
            });
        }

        function httpPut(id, dataToSave) {
            return $http({
                method: 'PUT',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id,
                data: dataToSave
            });
        }

        function httpDelete(id) {
            return $http({
                method: 'DELETE',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id
            });
        }

        return service;

    }

})();