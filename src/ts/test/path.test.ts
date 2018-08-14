import {Path} from '../main/path';

describe('Check Path class', () => {

    it('functions new Path("") should work correctly', () => {
        // Execute
        const empty = new Path("");

        // Verify
        expect(empty.links).toHaveLength(0);
    });

    it('functions new Path("date") should work correctly', () => {
        // Execute
        const scalar = new Path("date");

        // Verify
        expect(scalar.links[0].field).toEqual("date");
        expect(scalar.links).toHaveLength(1);
    });

    it('functions new Path("ref_id") should work correctly', () => {
        // Execute
        const scalar = new Path("ref_id");

        // Verify
        expect(scalar.links[0].field).toEqual("ref_id");
        expect(scalar.links).toHaveLength(1);
    });

    it('functions new Path("ref_id.float") should work correctly', () => {
        // Execute
        const scalar = new Path("ref_id.float");

        // Verify
        expect(scalar.links[0].field).toEqual("ref_id");
        expect(scalar.links[1].field).toEqual("float");
        expect(scalar.links).toHaveLength(2);
    });

    it('functions new Path("ref1_id.^type:ref2_id") should work correctly', () => {
        // Execute
        const scalar = new Path("ref1_id.^type:ref2_id");

        // Verify
        expect(scalar.links[0].field).toEqual("ref1_id");
        expect(scalar.links[1].field).toEqual("^type:ref2_id");
        expect(scalar.links).toHaveLength(2);
    });

    it('functions new Path("ref1_id.^type:ref2_id.string") should work correctly', () => {
        // Execute
        const scalar = new Path("ref1_id.^type:ref2_id.string");

        // Verify
        expect(scalar.links[0].field).toEqual("ref1_id");
        expect(scalar.links[1].field).toEqual("^type:ref2_id");
        expect(scalar.links[2].field).toEqual("string");
        expect(scalar.links).toHaveLength(3);
    });

    it('functions new Path(null).isEmpty() should return true', () => {
        // Setup
        const path = new Path(null);

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).toBeTruthy();
    });
    it('functions new Path("").isEmpty() should return true', () => {
        // Setup
        const path = new Path("");

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).toBeTruthy();
    });

    it('functions new Path("field").isEmpty() should return false', () => {
        // Setup
        const path = new Path("field");

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).toBeFalsy();
    });
});
