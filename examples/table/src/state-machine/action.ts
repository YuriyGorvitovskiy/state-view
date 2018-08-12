import {CACHE} from "./cache";
import {Patch} from "./patch";
import {Function, Path, Single, Field} from "./request";
import {CONFIG, ValueReq, ValueProp} from "./widget";

export interface ActionReq<P> {
    $action: string,
    $prop: Single<P>,
}

export interface ActionProp<P> {
    $action: string,
    $prop: P,
}

export type ActionFunction<P> = (prop: P) => Patch;

export const REGISTRY: {[action: string]: ActionFunction<any>} = {};

export function fire<P>(action: string, prop: P) {
    let actionFunction  = REGISTRY[action];
    if (null == actionFunction) {
        return;
    }
    let patch: Patch = actionFunction(prop);
    if (null == patch) {
        return;
    }
    CACHE.applyPatch(patch);
    CONFIG.root.refresh();
}
