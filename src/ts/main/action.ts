import {Patch} from "./patch";
import {Cache} from "./cache";
import * as State from "./state";

export interface Param {
    [key: string]: any;
}

export interface Action {
    id: string;
    ctx: string;
    param: Param;
}

export interface Description {
    id: string;
    ctx: State.Request;
    process: (ctx: State.State, param: Param, processor: Processor) => Patch;
}
export interface Registry {
    [key: string]: Description;
}

export class Processor {
    regestry: Registry;
    cache: Cache;

    public constructor(cache: Cache) {
        this.cache = cache;
        this.regestry = {};
    }

    public register(desc: Description) {
        this.regestry[desc.id] = desc;
    }

    public execute(action: Action): Description {
        const desc = this.regestry[action.id];
        if (null == desc) {
            return;
        }
        let contexts: State.State[] = [];
        if (null != desc.ctx) {
            contexts = [].concat(this.cache.evaluateState(action.ctx, desc.ctx));
        }
        for (let ctx of contexts) {
            this.cache.applyPatch(desc.process(ctx, action.param, this));
        }
    }

    public generateId(type: string): string {
        return this.cache.generateId(type);
    }
}
