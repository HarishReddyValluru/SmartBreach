(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('angularExamples', {
            templateUrl: '/static/app/modules/angularExamples/layout/first-page.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', '$window', '$timeout', 'sharedProperties', '$parse', controller]
        });

    function controller($scope, $rootScope, $window, $timeout, sharedProperties, $parse) {
        var vm = this;

        vm.$onInit = function () {
            vm.oneWayBindingData = "One way data passed";
            vm.twoWayBindingData = "Two way data passed";
        }

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        //$parse
        $scope.name = 'Valluru';
        $scope.parse = $parse('name')($scope);
        $parse('name').assign($scope, 'Harish');
        $scope.parse_assign = $parse('name')($scope);

        //Browser Cache
        $scope.$watch('vm.sessionStorage', function () {
            $window.sessionStorage.setItem('cacheValue', vm.sessionStorage);
        });

        //Sharing properties between controllers
        $scope.$watch('vm.sharedProperty', function () {
            sharedProperties.setProperty(vm.sharedProperty);
        });

        //Broadcast properties $rootScope ----> $scope
        $scope.$watch('vm.broadcastProperty', function () {
            $rootScope.$broadcast('broadcastPropertyEvent', { 'broadcastValue': vm.broadcastProperty })
        });

        $scope.$on('emitPropertyEvent', function (event, args) {
            vm.emitPropertyValue = args.emitValue;
        });

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //alert(current);
            if (current != next) {
                if ($scope.formFirstPage.$dirty) {
                    //alert(1);
                }
                else {
                    //alert(2);
                }
            }
        });



        //Inheritance in Javascript
        var ClassA = function () {
            this.name = "Matrix 1";
            this.trans = "Matrix 2";
        }

        ClassA.prototype.print = function () {
            console.log(this.name);
        }

        var a = new ClassA();

        //a.print();

        var inheritsFrom = function (child, parent) {
            child.prototype = Object.create(parent.prototype);
        };

        var ClassB = function () {
            this.name = "class B";
            this.surname = "I'm the child";
        }

        inheritsFrom(ClassB, ClassA);

        ClassB.prototype.print = function () {
            ClassA.prototype.print.call(this);
            console.log(this.surname);
        }

        var b = new ClassB();
        b.print();


    };
})();
