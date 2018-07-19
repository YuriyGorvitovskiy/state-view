import {Patch} from "./patch";
import {Cache} from "./cache";
import * as State from "./state";

export interface Param {
    [key: string]: any;
}

export interface Action {
    id: string;
    parameters: Param;
}

export interface ParamDescription {
    [key: string]: State.Request;
}

export interface ActionDescription {
    id: string;
    parameters: ParamDescription;
    process: (params: Param, idGenerator: (type: string) => string) => Patch;
}

export interface Registry {
    [key: string]: ActionDescription;
}

export class Processor {
    regestry: Registry;
    cache: Cache;

    public constructor(cache: Cache) {
        this.cache = cache;
        this.regestry = {};
    }

    public register(desc: ActionDescription) {
        this.regestry[desc.id] = desc;
    }

    public execute(action: Action): void {
        const desc = this.regestry[action.id];
        if (null == desc) {
            return;
        }
        let parameters: Param = {};
        for (const key in action.parameters) {
            parameters[key] = action.parameters[key];
            const request: State.Request = desc.parameters[key];
            if (null != request) {
                parameters[key] = this.cache.evaluateState(parameters[key], request);
            }
        }
        this.cache.applyPatch(desc.process(parameters, this.cache.generateId.bind(this.cache)));
    }
}
