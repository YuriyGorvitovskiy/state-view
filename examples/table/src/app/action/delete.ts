import * as Action from "../../../../../src/ts/main/state-machine/action";
import {Patch} from "../../../../../src/ts/main/state-machine/patch";
import * as Req from "../../../../../src/ts/main/state-machine/request";
import * as Button from "../../../../../src/ts/main/widget/button";

export const ACTION = "delete";

export type Request = Req.Request;

export interface Params {
    $id: string
}

export function request(params: Req.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}
export function execute<T>(params: Params): Patch {
    return {delete: [params.$id]};
}
