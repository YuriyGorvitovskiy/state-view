import * as Action from "../../../../../src/ts/main/state-machine/action";
import {Patch} from "../../../../../src/ts/main/state-machine/patch";
import {Field, Single} from "../../../../../src/ts/main/state-machine/request";
import * as Value from "../../../../../src/ts/main/widget/value";

export const ACTION = "select";

export interface Request<P> {
    where: Field<Request<string>, string>;     
    attr:  Field<Request<string>, string>;
    what: Field<Request<string>, string>;
}
export interface Params<P> extends Value.Props<P> {
    where: string;
    attr:  string;
    what:  string;
}

export function request<T>(params: Single<Request<T>>):  Action.Request<Request<T>> {
    return {
        $action: ACTION,
        $params: params
    };
}
export function execute<T>(params: Params<T>): Patch {
    let update: any = {id: params.where};
    update[params.attr] = params.what;
    return {update: [update]};
}
