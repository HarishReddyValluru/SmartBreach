﻿
describe('HeroDetailController', function () {
    var $componentController;

    beforeEach(module('smartbreachapp'));
    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    it('Case 1 - True', function () {
        var ctrl = $componentController('formControls', null, {});
        expect(ctrl.mode).toBe('funa'); //pass
    });

});




//describe('Controllers', function () { //describe your object type
//    beforeEach(module('smartbreachapp.pages')); //load module<br />
//    describe('myctrl', function () { //describe your app name<br />
//        var myctrl;
//        beforeEach(inject(function ($controller) { //instantiate controller using $controller service
//            myctrl = $controller('controller');
//        }));
//        it('Mode should be fun', function () {  //write tests
//            expect(myctrl.mode).toBe('fun'); //pass
//        });
//    });
//});

