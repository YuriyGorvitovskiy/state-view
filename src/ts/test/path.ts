import 'mocha';
import { expect } from 'chai';

import {Path} from '../main/path';

describe('Check Path class', () => {

    it('functions new Path("") should work correctly', () => {
        // Execute
        const empty = new Path("");

        // Verify
        expect(empty.links).to.be.empty;
    });

    it('functions new Path("date") should work correctly', () => {
        // Execute
        const scalar = new Path("date");

        // Verify
        expect(scalar.links[0].field).to.be.equal("date");
        expect(scalar.links.length).to.be.equal(1);
    });

    it('functions new Path("ref_id") should work correctly', () => {
        // Execute
        const scalar = new Path("ref_id");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref_id");
        expect(scalar.links.length).to.be.equal(1);
    });

    it('functions new Path("ref_id.float") should work correctly', () => {
        // Execute
        const scalar = new Path("ref_id.float");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref_id");
        expect(scalar.links[1].field).to.be.equal("float");
        expect(scalar.links.length).to.be.equal(2);
    });

    it('functions new Path("ref1_id.^ref2_id") should work correctly', () => {
        // Execute
        const scalar = new Path("ref1_id.^ref2_id");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref1_id");
        expect(scalar.links[1].field).to.be.equal("^ref2_id");
        expect(scalar.links.length).to.be.equal(2);
    });

    it('functions new Path("ref1_id.^ref2_id.string") should work correctly', () => {
        // Execute
        const scalar = new Path("ref1_id.^ref2_id.string");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref1_id");
        expect(scalar.links[1].field).to.be.equal("^ref2_id");
        expect(scalar.links[2].field).to.be.equal("string");
        expect(scalar.links.length).to.be.equal(3);
    });

    it('functions new Path(null).isEmpty() should return true', () => {
        // Setup
        const path = new Path(null);

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).to.be.true;
    });
    it('functions new Path("").isEmpty() should return true', () => {
        // Setup
        const path = new Path("");

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).to.be.true;
    });

    it('functions new Path("field").isEmpty() should return false', () => {
        // Setup
        const path = new Path("field");

        // Execute
        const actual = path.isEmpty();

        // Verify
        expect(actual).to.be.false;
    });
});
