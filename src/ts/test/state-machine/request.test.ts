import * as Request from "../../main/state-machine/request";

describe('Check Path class', () => {

    it('functions Request.path(...) should work correctly', () => {
        // Execute & Verify
        expect(Request.path("")).toEqual({$path: ""});
        expect(Request.path("ref1_id")).toEqual({$path: "ref1_id"});
        expect(Request.path("ref1_id.^type:ref2_id.string")).toEqual({$path: "ref1_id.^type:ref2_id.string"});
    });

    it('functions Request.isPath() should work correctly', () => {
        // Execute
        expect(Request.isPath({$path:"date"})).toBeTruthy();
        expect(Request.isPath({path:"date"})).toBeFalsy();
        expect(Request.isPath("date")).toBeFalsy();
        expect(Request.isPath(12)).toBeFalsy();
        expect(Request.isPath([])).toBeFalsy();
    });
});
