
describe('HeroDetailController', function () {
    var $componentController, componentCtrl;

    beforeEach(module('smartbreachapp'));
    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
        componentCtrl = $componentController('formControls', null, { });
    }));

    it('Case 1 - True', function () {
        expect(componentCtrl.mode).toBe('fun'); //pass
    });

});
