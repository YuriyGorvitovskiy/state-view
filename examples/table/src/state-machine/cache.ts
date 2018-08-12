import {Path, Request, isPath} from "./request";
import {Patch} from "./patch";

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

    public evaluatePath<T>(id: string, path: Path<T>): T | T[] {
        let last: any = id;
        for (const link of this.splitPath(path)) {
            if (Array.isArray(last)) {
                last = this.evaluatePathArray(last as any[], link);
            } else if (typeof last == 'string') {
                last = this.evaluatePathSingle(last as string, link);
            } else {
                return undefined;
            }
        }
        return last;
    }

    private splitPath(path: Path<any>): string[] {
        if (!path || !path.$path) {
            return [];
        }
        return path.$path.split('.');
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

    public evaluateState(id: string, request: any): any {
        let resolvedIds: string | string[] = id;
        if (isPath(request.$id)) {
            resolvedIds = this.evaluatePath(id, request.$id as Path<string>);
        } else if (typeof(request.$id) == "string") {
            resolvedIds = request.$id;
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

    private evaluateStateFields(id: string, request: any): any {
        let state: any = {$id: id};
        for (const key in request) {
            if (key == "$id") {
                continue;
            } else if (isPath(request[key])) {
                state[key] = this.evaluatePath(id, request[key] as Path<any>);
            } else if (Array.isArray(request[key])) {
                state[key] = [];
                for (const indx in request[key]) {
                    if (isPath(request[key][indx])) {
                        state[key][indx] = this.evaluatePath(id, request[key][indx] as Path<any>);
                    } else if (null != request[key][indx] && typeof request[key][indx] == 'object') {
                        state[key][indx] = this.evaluateState(id, request[key][indx]);
                    } else {
                        state[key][indx] = request[key][indx];
                    }
                }
            } else if (null != request[key] && typeof request[key] == 'object') {
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
        let sourceType = sourceId.substring(0, sourceId.indexOf(":"));
        const reverse = "^" + sourceType + ":" + field;
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
        let sourceType = sourceId.substring(0, sourceId.indexOf(":"));
        const reverse = "^" + sourceType + ":" + field;
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

export const CACHE = new Cache();
