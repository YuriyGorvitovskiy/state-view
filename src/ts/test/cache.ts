import { Cache, Entity } from '../main/cache';
import { Path } from '../main/path';

import { Request, State } from '../main/state';

import { expect } from 'chai';
import 'mocha';

describe('Check Cache class', () => {

    it('functions set() and get() should work correctly', () => {
        // Setup
        const cache = new Cache();
        const entity1: Entity = {id: "e:1"};
        const entity2: Entity = {id: "e:2"};

        // Execute
        cache.set(entity1);
        cache.set(entity2);
        const actual1 = cache.get(entity1.id);
        const actual2 = cache.get(entity2.id);

        // Verify
        expect(actual1).to.equal(entity1);
        expect(actual2).to.equal(entity2);
    });

    it('functions remove() and removeById() should work correctly', () => {
        // Setup
        const cache = new Cache();
        const entity1: Entity = {id: "e:1"};
        const entity2: Entity = {id: "e:2"};

        cache.set(entity1);
        cache.set(entity2);

        // Execute
        cache.remove(entity1);
        cache.removeById(entity2.id);

        // Verify
        expect(cache.get(entity1.id)).to.be.undefined;
        expect(cache.get(entity2.id)).to.be.undefined;
    });

    it('functions evaluatePath("unknown, new Path("value")) should return null', () => {
        // Setup
        const cache = new Cache();
        const path = new Path("value");

        // Execute
        const actual: any = cache.evaluatePath("unknown", path);

        // Execute
        expect(actual).to.be.undefined;
    });

    it('functions evaluatePath("type:1", new Path("")) should return null', () => {
        // Setup
        const cache = new Cache();
        const id = "type:1";
        cache.set({id});
        const path = new Path("");

        // Execute
        const actual: any = cache.evaluatePath(id, path);

        // Execute
        expect(actual).to.be.equal(id);
    });

    it('functions evaluatePath("type:1", new Path("value")) should return field value', () => {
        // Setup
        const cache = new Cache();
        const id = "type:1";
        const value = "Hello World";
        cache.set({id, value});
        const path = new Path("value");

        // Execute
        const actual: any = cache.evaluatePath(id, path);

        // Verify
        expect(actual).to.be.equal(value);
    });

    it('functions evaluatePath("type:1", new Path("ref@type.value")) should return field value', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const value = "Hello World";
        cache.set({id: id1, ref: id2});
        cache.set({id: id2, value});
        const path = new Path("ref@type.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).to.be.equal(value);
    });

    it('functions evaluatePath("type:1", new Path("ref@type.ref@type.value")) should return field value', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const value = "Hello World";
        cache.set({id: id1, ref: id2});
        cache.set({id: id2, ref: id3});
        cache.set({id: id3, value});
        const path = new Path("ref@type.ref@type.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).to.be.equal(value);
    });

    it('functions evaluatePath("type:1", new Path("^ref@type.value")) should return array of fields', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const id4 = "type:4";

        const value1 = "Hello";
        const value2 = "World";
        const value3 = "!";

        cache.set({id: id1, "^ref": [id2, id3, id4]});
        cache.set({id: id2, value: value1});
        cache.set({id: id3, value: value2});
        cache.set({id: id4, value: value3});
        const path = new Path("^ref@type.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).to.contain(value1);
        expect(actual).to.contain(value2);
        expect(actual).to.contain(value3);
        expect(actual.length).to.be.equal(3);
    });

    it('functions evaluatePath("type:1", new Path("^ref1@type.^ref2@type.value")) should return array of fields', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const id4 = "type:4";
        const id5 = "type:5";

        const value1 = "Hello";
        const value2 = "World";

        cache.set({id: id1, "^ref1": [id2, id3]});
        cache.set({id: id2, "^ref2": [id4, id5]});
        cache.set({id: id3, "^ref2": [id4, id5]});
        cache.set({id: id4, value: value1});
        cache.set({id: id5, value: value2});
        const path = new Path("^ref1@type.^ref2@type.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).to.contain(value1);
        expect(actual).to.contain(value2);
        expect(actual.length).to.be.equal(4);
    });
    it('functions evaluateState("type:1", {...}) should return correct State', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";

        cache.set({id: id1, "ref1": id2, "ref2": [id2, id3]});
        cache.set({id: id2, "str": "Hello"});
        cache.set({id: id3, "str": "World"});

        const request: Request={
            $id: null,
            num: 123,
            str: "Hi!",
            str1: new Path("ref1.str"),
            str2: new Path("ref2.str"),
            sub1: {
                $id: new Path("ref1"),
                str3: new Path("str")
            },
            sub2: {
                $id: new Path("ref2"),
                str4: new Path("str")
            }
        };
        const expected = {
            $id: id1,
            num: 123,
            str: "Hi!",
            str1: "Hello",
            str2: ["Hello", "World"],
            sub1: {
                $id: id2,
                str3: "Hello"
            },
            sub2: [{
                $id: id2,
                str4: "Hello"
            },{
                $id: id3,
                str4: "World"
            }]
        };

        // Execute
        const actual = cache.evaluateState(id1, request);

        // Verify
        expect(actual).to.deep.equals(expected);
    });
});
