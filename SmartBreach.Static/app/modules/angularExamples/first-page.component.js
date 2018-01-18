(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('angularExamples', {
            templateUrl: '/static/app/modules/angularExamples/layout/first-page.html',
            controller: ['$scope', '$rootScope', '$filter', '$sce', '$window', '$timeout', 'sharedProperties', '$parse', '$compile', '$interpolate', controller]
        });

    function controller($scope, $rootScope, $filter, $sce, $window, $timeout, sharedProperties, $parse, $compile, $interpolate) {
        var $ctrl = this;
        $ctrl.goToPage = goToPage;

        $ctrl.data = [
            { name: "Rob", hasPermission: true },
            { name: "Colin", hasPermission: false },
            { name: "Andy", hasPermission: true },
            { name: "Rick", hasPermission: false },
            { name: "David", hasPermission: true },
        ]

        //ng-bind-html
        $ctrl.ngBindHtml = 'I am an <code>HTML</code>string with ' + '<a href="#">links!</a> and other <em>stuff</em>';

        //ng-bind-template
        $ctrl.ngBindTemplateTitle = "Maximus";
        $ctrl.ngBindTemplateCaption = "Never Ending";

        $ctrl.$onInit = function () {
            $ctrl.oneWayBindingData = "One way data passed";
            $ctrl.twoWayBindingData = "Two way data passed";

            $ctrl.filteredData = $filter('filter')($ctrl.data, { hasPermission: true });

        }

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        function goToPage() {
            $state.go('dashboard.formbuilder', { EntityName: "I am on Form Builder page" });
        }

        //$interpolate
        $ctrl.htmlStringValue = "Hyderabad";
        var htmlString = "Working from : {{$ctrl.htmlStringValue}}";
        $ctrl.htmlStringAssigned = $interpolate(htmlString)($scope);

        $ctrl.buttonText = "Click Me";
        $ctrl.htmlButton = "<button ng-click='clickme();' class='btn btn-primary'>{{$ctrl.buttonText}}</button>";
        $ctrl.htmlButtonAssigned = $sce.trustAsHtml($interpolate($ctrl.htmlButton)($scope));        //sce - Strict Contextual Escaping

        //$parse
        $ctrl.name = 'Valluru';
        $ctrl.parse = $parse('$ctrl.name')($scope);
        $parse('$ctrl.name').assign($scope, 'Harish');
        $ctrl.parse_assign = $parse('$ctrl.name')($scope); 

        //Browser Cache
        $scope.$watch('$ctrl.sessionStorage', function () {
            $window.sessionStorage.setItem('cacheValue', $ctrl.sessionStorage);
        });

        //Sharing properties between controllers
        $scope.$watch('$ctrl.sharedProperty', function () {
            sharedProperties.setProperty($ctrl.sharedProperty);
        });

        //Broadcast properties $rootScope ----> $scope
        $scope.$watch('$ctrl.broadcastProperty', function () {
            $rootScope.$broadcast('broadcastPropertyEvent', { 'broadcastValue': $ctrl.broadcastProperty })
        });

        $scope.$on('emitPropertyEvent', function (event, args) {
            $ctrl.emitPropertyValue = args.emitValue;
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
