import {Path} from "./path";
import * as State from "./state";

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

    public evaluatePath(id: string, path: Path): any {
        if (null == path || path.isEmpty()) {
            return id;
        }

        let last: any = id;
        for (const link of path.links) {
            if (Array.isArray(last)) {
                last = this.evaluatePathArray(last as any[], link.field);
            } else if (typeof last == 'string') {
                last = this.evaluatePathSingle(last as string, link.field);
            } else {
                return undefined;
            }
        }
        return last;
    }

    private evaluatePathArray(ids: any[], field: string): any[] {
        let aggregate = [];
        for(const id of ids) {
            console.log("aggregate: " + JSON.stringify(aggregate));
            if (typeof id !== 'string') {
                continue;
            }
            let value = this.evaluatePathSingle(id as string, field);
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

    private evaluatePathSingle(id: string, field: string) {
        const entity = this.get(id);
        if (!entity) {
            return undefined;
        }
        return entity[field];
    }

    public evaluateState(id: string, request: State.Request): State.State | State.State[] {
        let resolvedIds: string | string[] = id;
        if (request.$id instanceof Path) {
            resolvedIds = this.evaluatePath(id, request.$id);
        }

        if (Array.isArray(resolvedIds)) {
            let states = [];
            for(const resolvedId of resolvedIds) {
                states.push(this.evaluateStateFields(resolvedId, request));
            }
            return states;
        } else {
            return this.evaluateStateFields(resolvedIds, request);
        }
    }

    private evaluateStateFields(id: string, request: State.Request): State.State {
        let state = {$id: id};
        for (const key in request) {
            if (key == "$id") {
                continue;
            } else if (request[key] instanceof Path) {
                state[key] = this.evaluatePath(id, request[key] as Path);
            } else if (typeof request[key] == 'object' && '$id' in request[key]) {
                state[key] = this.evaluateState(id, request[key]);
            } else {
                state[key] = request[key];
            }
        }
        return state;
    }
}
