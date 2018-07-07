
export interface Entity {
    id: string;
    [key: string]: any;
};

export interface Storage {
    [key: string]: Entity;
}

export class Cache {
    storage: Storage;

    public constructor() {
        this.storage = {};
    }

    public get(id: string): Entity {
        return this.storage[id];
    }

    public set(entity: Entity) {
        this.storage[entity.id] = entity;
    }

    public remove(entity: Entity) {
        delete this.storage[entity.id];
    }

    public removeById(id: string) {
        delete this.storage[id];
    }
}
