(function () {
    'use strict';

    angular
        .module('smartbreachapp')
        .factory('giConstant', GIConstant);

    GIConstant.$inject = [];

    function GIConstant() {

        return {
            NEW_RECORD: "NEW",
            ELIG_NEW_RECORD: "ELIG_NEW",

            Parameters: {
                OVERRIDE_TENANT_RECORDID: 'tenantId'
            },

            EditMode: {
                READ: 0,
                EDIT: 1,
                SAVE: 2
            },

            Filter: {
                EXCLUDE_FULL: "1",
                EXCLUDE_PARTIAL: "2",
                EXCLUDE_ENTITY: "*"
            },
            LookupRelationshipType: {
                Spouse: 1,
                DomesticPartner: 2,
                Child: 3,
                Other: 4,
                Unborn: 5
            },
            LookupEmployeeRelationshipType: {
                Dependant: 1,
                Beneficiary: 2,
                Trust: 3,
                Estate: 4,
                Organization: 5
            },
            Import: {
                NoneTransformationType: "0",
                CustomTransformationType: "3",
                DefaultTransformationType: "4"
            },
            Participant: {
                FIRSTLASTLAST2ANDTYPE: 1
            },
            LookupEOIStatus: {
                PENDING : 1,
                CANCELLED : 2,
                APPROVED : 3,
                DECLINED : 4,
                VALIDATING : 5,
                DROPPED : 6,
                APPROVING : 7,
                DEFERRED : 8,
                CANCELLING : 9,
                DECLINING : 10
            },
            LookupEventStatus: {
                PENDING: 1,
                SUBMITTED: 2,
                APPROVED: 3,
                DECLINED: 4,
                QUEUED: 5,
                DECLINED_FROM_PENDING: 41,
                DECLINED_FROM_SUBMITTED: 42,
                DECLINED_FROM_APPROVED: 43,
            },
            Privilege: {
                
                READ: 1,
                UPDATE: 2,
                ADD: 3,
                DELETE: 4

            }
        };
    }

})();