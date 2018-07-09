import {Path} from "./path";
import {Patch} from "./patch";
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
    idGenerator: number;

    public constructor() {
        this.storage = {};
        this.idGenerator = 0;
    }

    public get(id: string): Entity {
        return this.storage[id];
    }

    public set(entity: Entity) {
        this.storage[entity.id] = entity;
    }

    public remove(id: string): Entity {
        const entity = this.storage[id];
        delete this.storage[id];
        return entity;
    }

    public clear() {
        this.storage = {};
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

    public applyPatch(patch: Patch) {
        if (null != patch.insert) {
            for (const entity of patch.insert) {
                this.applyPatchInsert(entity);
            }
        }
        if (null != patch.update) {
            for (const entity of patch.update) {
                this.applyPatchUpdate(entity);
            }
        }
        if (null != patch.delete) {
            for (const entityId of patch.delete) {
                this.applyPatchDelete(entityId);
            }
        }
    }

    private applyPatchInsert(entity: Entity) {
        this.set(entity);
        for (const field in entity) {
            if (this.isReference(field) && !this.isReverse(field)) {
                this.appendReverse(field, entity.id, entity[field]);
            }
        }
    }

    private applyPatchUpdate(update: Entity) {
        let cached = this.get(update.id);
        if (null == cached) {
            return;
        }

        for (const field in update) {
            if ("id" == field || this.isReverse(field)) {
                continue;
            }
            const oldValue = cached[field];
            const newValue = update[field];
            if (oldValue == newValue) {
                continue;
            }
            if (this.isReference(field)) {
                this.removeReverse(field, update.id, oldValue);
                cached[field] = newValue;
                this.appendReverse(field, update.id, newValue);
            } else {
                cached[field] = newValue;
            }
        }
    }

    private applyPatchDelete(id: string) {
        const entity = this.remove(id);
        if (null == entity) {
            return;
        }

        for (const field in entity) {
            if (this.isReference(field) && !this.isReverse(field)) {
                this.removeReverse(field, id, entity[field]);
            }
        }
    }

    private isReference(field: string): boolean {
        return 3 < field.length && "_id" == field.substring(field.length - 3);
    }

    private isReverse(field: string): boolean {
        return 1 < field.length && field.charAt(0) == "^";
    }

    private appendReverse(field: string, sourceId: string, targetId: string) {
        let target = this.get(targetId);
        if (null == target) {
            return;
        }
        const reverse = "^" + field;
        const value = target[reverse];
        if (undefined === value) {
            return;
        }
        if (Array.isArray(value)) {
            value.push(sourceId);
        } else {
            target[reverse] = sourceId;
        }
    }

    private removeReverse(field: string, sourceId: string, targetId: string) {
        let target = this.get(targetId);
        if (null == target) {
            return;
        }
        const reverse = "^" + field;
        const value = target[reverse];
        if (undefined === value) {
            return;
        }
        if (Array.isArray(value)) {
            const index = value.indexOf(sourceId);
            if (index >= 0) {
                value.splice(index, 1);
            }
        } else if (target[reverse] == sourceId) {
            target[reverse] = null;
        }
    }

    public generateId(type: string): string {
        return type + ":~" + ++this.idGenerator;
    }

    public resetIdGenerator(): void {
        this.idGenerator = 0;
    }
}
