/// <reference path="layout/modal-confirm.html" />
/// <reference path="layout/modal-confirm.html" />
(function () {
    'use strict';

    angular.module('smartbreachapp')
        .service('modalConfirmService', ['$uibModal', '$q', modalConfirmService]);

    function modalConfirmService($uibModal, $q) {
        /* Service */

        var service = {
            confirm: showConfirmationDialog,
            confirmok: showConfirmationOkDialog
        };
        return service;

        /* Members */
        function showConfirmationDialog(options) {
            $q.all([
                //translationService.getTranslator('ConfirmService')
            ]).then(function (results) {
                //var translator = results[0];
                options.text = options.text || "Are you sure?";
                options.title = options.title || "Confirm";
                options.okText = options.okText || "OK";
                options.cancelText = options.cancelText || "Cancel";
                options.isConfirm = options.isConfirm || true;

                var modalInstance = $uibModal.open({
                    templateUrl: '/static/app/modules/modalPopup/layout/modal-confirm.html',
                    controller: 'ModalConfirm',
                    resolve: {
                        text: function () {
                            return options.text;
                        },
                        title: function () {
                            return options.title;
                        },
                        okText: function () {
                            return options.okText;
                        },
                        cancelText: function () {
                            return options.cancelText;
                        }
                        ,
                        isConfirm: function () {
                            return options.isConfirm;
                        }
                    },
                    backdrop: 'static',
                    size: 'sm'
                });

                modalInstance.result.then(
                    function (res) { // User hit OK
                        if (options.onOk) {
                            options.onOk(res);
                        }
                    },
                    function () {
                        if (options.onCancel) {
                            options.onCancel();
                        }
                    }
            );
            }
            )
        };

        function showConfirmationOkDialog(options) {
            $q.all([
                //translationService.getTranslator('ConfirmService')
            ]).then(function (results) {
                //var translator = results[0];
                options.text = options.text || "Are you sure?";
                options.title = options.title || "Confirm";
                options.okText = options.okText || "OK";
                options.isConfirm = options.isConfirm || true;

                var modalInstance = $uibModal.open({
                    templateUrl: '/static/app/common/layout/modal-confirmok.html',
                    controller: 'ModalConfirmOK',
                    resolve: {
                        text: function () {
                            return options.text;
                        },
                        title: function () {
                            return options.title;
                        },
                        okText: function () {
                            return options.okText;
                        },
                        isConfirm: function () {
                            return options.isConfirm;
                        }
                    },
                    backdrop: 'static',
                    size: 'sm'
                });

                modalInstance.result.then(
                    function () { // User hit OK
                        if (options.onOk) {
                            options.onOk();
                        }
                    }
            );
            }
            )
        };
    }
})();