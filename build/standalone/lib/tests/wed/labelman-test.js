var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "wed/labelman"], function (require, exports, labelman) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    labelman = __importStar(labelman);
    var assert = chai.assert;
    describe("labelman", function () {
        var man;
        beforeEach(function () {
            man = new labelman.AlphabeticLabelManager("sense");
        });
        it("allocate label", function () {
            assert.equal(man.allocateLabel("S.z"), "a");
            assert.equal(man.allocateLabel("S.z"), "a");
        });
        it("find label from id", function () {
            assert.equal(man.allocateLabel("S.z"), "a");
            assert.equal(man.allocateLabel("S.x"), "b");
            // Actual tests.
            assert.equal(man.idToLabel("S.z"), "a");
            assert.equal(man.idToLabel("S.x"), "b");
            // ID without allocated label.
            assert.equal(man.idToLabel("S.ttt"), undefined);
        });
        it("next number", function () {
            assert.equal(man.nextNumber(), 1);
            assert.equal(man.nextNumber(), 2);
        });
        it("deallocate all", function () {
            man.nextNumber();
            man.nextNumber();
            man.nextNumber();
            man.allocateLabel("S.z");
            man.allocateLabel("S.x");
            man.deallocateAll();
            assert.equal(man.nextNumber(), 1);
            assert.equal(man.allocateLabel("S.z"), "b");
        });
    });
});
//  LocalWords:  Dubeau MPL Mangalam allocateLabel nextNumber labelman
//  LocalWords:  deallocateAll deallocate chai
//# sourceMappingURL=labelman-test.js.map