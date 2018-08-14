import { Cache, Entity } from '../main/cache';
import { Path } from '../main/path';
import { Patch } from '../main/patch';

import { Request, State } from '../main/state';

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
        expect(actual1).toEqual(entity1);
        expect(actual2).toEqual(entity2);
    });

    it('functions remove() should work correctly', () => {
        // Setup
        const cache = new Cache();
        const entity1: Entity = {id: "e:1"};
        const entity2: Entity = {id: "e:2"};

        cache.set(entity1);
        cache.set(entity2);

        // Execute
        const actual = cache.remove(entity1.id);

        // Verify
        expect(actual).toEqual(entity1);
        expect(cache.get(entity1.id)).toBeUndefined();
        expect(cache.get(entity2.id)).toEqual(entity2);
    });

    it('functions evaluatePath("unknown, new Path("value")) should return null', () => {
        // Setup
        const cache = new Cache();
        const path = new Path("value");

        // Execute
        const actual: any = cache.evaluatePath("unknown", path);

        // Execute
        expect(actual).toBeUndefined();
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
        expect(actual).toEqual(id);
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
        expect(actual).toEqual(value);
    });

    it('functions evaluatePath("type:1", new Path("ref_id.value")) should return field value', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const value = "Hello World";
        cache.set({id: id1, ref_id: id2});
        cache.set({id: id2, value});
        const path = new Path("ref_id.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).toEqual(value);
    });

    it('functions evaluatePath("type:1", new Path("ref_id.ref_id.value")) should return field value', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const value = "Hello World";
        cache.set({id: id1, ref_id: id2});
        cache.set({id: id2, ref_id: id3});
        cache.set({id: id3, value});
        const path = new Path("ref_id.ref_id.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).toEqual(value);
    });

    it('functions evaluatePath("type:1", new Path("^type:ref_id.value")) should return array of fields', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const id4 = "type:4";

        const value1 = "Hello";
        const value2 = "World";
        const value3 = "!";

        cache.set({id: id1, "^type:ref_id": [id2, id3, id4]});
        cache.set({id: id2, value: value1});
        cache.set({id: id3, value: value2});
        cache.set({id: id4, value: value3});
        const path = new Path("^type:ref_id.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).toContain(value1);
        expect(actual).toContain(value2);
        expect(actual).toContain(value3);
        expect(actual.length).toEqual(3);
    });

    it('functions evaluatePath("type:1", new Path("^type:ref1_id.^type:ref2_id.value")) should return array of fields', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const id4 = "type:4";
        const id5 = "type:5";

        const value1 = "Hello";
        const value2 = "World";

        cache.set({id: id1, "^type:ref1_id": [id2, id3]});
        cache.set({id: id2, "^type:ref2_id": [id4, id5]});
        cache.set({id: id3, "^type:ref2_id": [id4, id5]});
        cache.set({id: id4, value: value1});
        cache.set({id: id5, value: value2});
        const path = new Path("^type:ref1_id.^type:ref2_id.value");

        // Execute
        const actual: any = cache.evaluatePath(id1, path);

        // Verify
        expect(actual).toContain(value1);
        expect(actual).toContain(value2);
        expect(actual.length).toEqual(4);
    });
    it('functions evaluateState("type:1", {...}) should return correct State', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";

        cache.set({id: id1, "ref1_id": id2, "ref2_id": [id2, id3]});
        cache.set({id: id2, "str": "Hello"});
        cache.set({id: id3, "str": "World"});

        const request: Request={
            $id: null,
            num: 123,
            str: "Hi!",
            str1: new Path("ref1_id.str"),
            str2: new Path("ref2_id.str"),
            sub1: {
                $id: new Path("ref1_id"),
                str3: new Path("str")
            },
            sub2: {
                $id: new Path("ref2_id"),
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
        expect(actual).toEqual(expected);
    });

    it('functions applyPatch({...}) should update Cache correctly', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        const id3 = "type:3";
        const id4 = "type:4";

        cache.set({id: id1, "ref1_id": id2, "^type:ref2_id": [id2, id3]});
        cache.set({id: id2, "^type:ref1_id": id1, "ref2_id": id1, "str": "Hello"});
        cache.set({id: id3, "^type:ref1_id": null, "ref2_id": id1, "str": "World"});

        const patch: Patch = {
            insert: [{id: id4, "^type:ref1_id": null, "ref2_id": id1, "str": "!"}],
            update: [{id: id1, "ref1_id": id3}, {id: id3, "str": "Hi"}],
            delete: [id2]
        };
        const expected_id1 = {id: id1, "ref1_id": id3, "^type:ref2_id": [id3, id4]};
        const expected_id3 = {id: id3, "^type:ref1_id": id1, "ref2_id": id1, "str": "Hi"};
        const expected_id4 = {id: id4, "^type:ref1_id": null, "ref2_id": id1, "str": "!"};

        // Execute
        cache.applyPatch(patch);

        expect(cache.get(id1)).toEqual(expected_id1);
        expect(cache.get(id2)).toBeUndefined();
        expect(cache.get(id3)).toEqual(expected_id3);
        expect(cache.get(id4)).toEqual(expected_id4);
    });

});
