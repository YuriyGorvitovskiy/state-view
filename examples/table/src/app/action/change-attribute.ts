import * as Action from "../../state-machine/action";
import {Patch} from "../../state-machine/patch";
import {Field, Single} from "../../state-machine/request";
import * as Value from "../../state-machine/widget/value";

export const ACTION = "change-attribite";

export interface Request<P> extends Value.Request<P> {
    attr:  Field<Request<P>, string>;
}
export interface Params<P> extends Value.Props<P> {
    $id: string
    attr:  string;
}

export function request<T>(params: Single<Request<T>>):  Action.Request<Request<T>> {
    return {
        $action: ACTION,
        $params: params
    };
}
export function execute<T>(params: Params<T>): Patch {
    let update: any = {id: params.$id};
    update[params.attr] = params.value;
    return {update: [update]};
}
