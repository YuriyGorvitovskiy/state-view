import * as Action from '../../../main/state-machine/action';
import * as Cache from '../../../main/state-machine/cache';
import * as Patch from '../../../main/state-machine/patch'
import * as Request from '../../../main/state-machine/request';

export const ACTION = "create-new-entity";

export interface Params  {
    id:  string;
    name:  string;
    ref_id:  string;
}

export interface Request {
    id:  Request.Field<Request, string>;
    name:  Request.Field<Request, string>;
    ref_id:  Request.Field<Request, string>;
}


export function request(params: Request.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}

export function execute<T>(params: Params): Patch.Patch {
    return {
        insert: [{
            id: params.id,
            ref_id: params.ref_id,
            name: params.name
        }]
    };
}
