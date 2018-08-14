import {CACHE} from "./cache";
import {Patch} from "./patch";
import {Single} from "./request";
import {ROOT} from "./widget";

export interface Request<P> {
    $action: string,
    $params: Single<P>,
}

export interface Event<P> {
    $action: string;
    $params: P;
}

export type Execute<P> = (params: P) => Patch;
export const REGISTRY: {[action: string]: Execute<any>} = {};

export function fire<P>(action: string, params: any) {
    let execute  = REGISTRY[action];
    if (null == execute) {
        return;
    }
    let patch: Patch = execute(params);
    if (null == patch) {
        return;
    }
    CACHE.applyPatch(patch);
    ROOT.refresh();
}
