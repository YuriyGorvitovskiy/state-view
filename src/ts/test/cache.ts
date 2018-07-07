import { Cache, Entity } from '../main/cache';

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

        expect(cache.get(entity1.id)).to.be.undefined;
        expect(cache.get(entity2.id)).to.be.undefined;
  });
});
