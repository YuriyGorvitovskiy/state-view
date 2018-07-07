import 'mocha';
import { expect } from 'chai';

import {Path, parse} from '../main/path';

describe('Check Path module', () => {

    it('functions parse("") should work correctly', () => {
        // Execute
        const empty = parse("");

        // Verify
        expect(empty.links).to.be.empty;
    });

    it('functions parse("date") should work correctly', () => {
        // Execute
        const scalar = parse("date");

        // Verify
        expect(scalar.links[0].field).to.be.equal("date");
        expect(scalar.links[0].target).to.be.null;
        expect(scalar.links.length).to.be.equal(1);
    });

    it('functions parse("ref@Type") should work correctly', () => {
        // Execute
        const scalar = parse("ref@Type");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref");
        expect(scalar.links[0].target).to.be.equal("Type");
        expect(scalar.links.length).to.be.equal(1);
    });

    it('functions parse("ref@Type.float") should work correctly', () => {
        // Execute
        const scalar = parse("ref@Type.float");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref");
        expect(scalar.links[0].target).to.be.equal("Type");
        expect(scalar.links[1].field).to.be.equal("float");
        expect(scalar.links[1].target).to.be.null;
        expect(scalar.links.length).to.be.equal(2);
    });

    it('functions parse("ref1@Type1.^ref2@Type2") should work correctly', () => {
        // Execute
        const scalar = parse("ref1@Type1.^ref2@Type2");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref1");
        expect(scalar.links[0].target).to.be.equal("Type1");
        expect(scalar.links[1].field).to.be.equal("^ref2");
        expect(scalar.links[1].target).to.be.equal("Type2");
        expect(scalar.links.length).to.be.equal(2);
    });

    it('functions parse("ref1@Type1.^ref2@Type2.string") should work correctly', () => {
        // Execute
        const scalar = parse("ref1@Type1.^ref2@Type2.string");

        // Verify
        expect(scalar.links[0].field).to.be.equal("ref1");
        expect(scalar.links[0].target).to.be.equal("Type1");
        expect(scalar.links[1].field).to.be.equal("^ref2");
        expect(scalar.links[1].target).to.be.equal("Type2");
        expect(scalar.links[2].field).to.be.equal("string");
        expect(scalar.links[2].target).to.be.null;
        expect(scalar.links.length).to.be.equal(3);
    });
});
