import {Path} from "./path";

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

    public evaluate(id: string, path: Path): any {
        if (null == path || path.isEmpty()) {
            return undefined;
        }

        let last: any = id;
        for (const link of path.links) {
            if (Array.isArray(last)) {
                last = this.extractArray(last as any[], link.field);
            } else if (typeof last == 'string') {
                last = this.extractSingle(last as string, link.field);
            } else {
                return undefined;
            }
        }
        return last;
    }

    private extractArray(ids: any[], field: string): any[] {
        let aggregate = [];
        for(const id of ids) {
            console.log("aggregate: " + JSON.stringify(aggregate));
            if (typeof id !== 'string') {
                continue;
            }
            let value = this.extractSingle(id as string, field);
            if (Array.isArray(value)) {
                for(const v of value) {
                    aggregate.push(v);
                }
            } else if (value != null) {
                aggregate.push(value);
            } else {
                continue;
            }
        }
        console.log("aggregate: " + JSON.stringify(aggregate));
        return aggregate;
    }

    private extractSingle(id: string, field: string) {
        const entity = this.get(id);
        if (!entity) {
            return undefined;
        }
        return entity[field];
    }
}
