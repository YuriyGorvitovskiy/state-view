import {Patch} from "./patch";
import {Cache} from "./cache";
import * as State from "./state";

export interface Param {
}

export interface Event<P extends Param> {
    action_id: string;
    param: Param;
}

export type Request<P extends Param> = {
    [K in keyof P]?: State.Request;
}

export interface Action<P extends Param> {
    id: string;
    request: Request<P>;
    process: (param: P, newIdFor: (type: string) => string) => Patch;
}

export interface Registry {
    [id: string]: Action<any>;
}

export class Processor {
    regestry: Registry;
    cache: Cache;

    public constructor(cache: Cache) {
        this.cache = cache;
        this.regestry = {};
    }

    public register<P>(action: Action<P>) {
        this.regestry[action.id] = action;
    }

    public execute<P>(event: Event<P>): void {
        const action = this.regestry[event.action_id];
        if (null == action) {
            return;
        }
        let parameters: Param = {};
        for (const key in event.param) {
            parameters[key] = event.param[key];
            const request: State.Request = action.request[key];
            if (null != request) {
                parameters[key] = this.cache.evaluateState(parameters[key], request);
            }
        }
        this.cache.applyPatch(action.process(parameters, this.cache.generateId.bind(this.cache)));
    }
}
