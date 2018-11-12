import * as Action from '../../../main/state-machine/action';
import * as Cache from '../../../main/state-machine/cache';
import * as Patch from '../../../main/state-machine/patch'
import * as Req from '../../../main/state-machine/request';

export const ACTION = "rename-story";

export interface Params  {
    id:  string;
    name:  string;
}

export interface Request {
    id:  Req.Field<Request, string>;
    name:  Req.Field<Request, string>;
}

export function request(params: Req.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}

export function execute<T>(params: Params): Patch.Patch {
    return {
        update: [{
            id: params.id,
            name: params.name
        }]
    };
}
