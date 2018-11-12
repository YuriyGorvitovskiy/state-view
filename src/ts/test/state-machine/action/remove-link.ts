import * as Action from '../../../main/state-machine/action';
import * as Cache from '../../../main/state-machine/cache';
import * as Patch from '../../../main/state-machine/patch'
import * as Req from '../../../main/state-machine/request';

export const ACTION = "remove-link";

export interface Params  {
    $id:  string;
    story_id:  string;
}

export interface Request {
    $id:  Req.Field<Request, string>;
    story_id:  Req.Field<Request, string>;
}

export function request(params: Req.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}

export function execute<T>(params: Params): Patch.Patch {
    return {
        delete: [
             params.$id,
             params.story_id,
         ]
    };
}
