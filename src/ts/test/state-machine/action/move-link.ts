import * as Action from '../../../main/state-machine/action';
import * as Cache from '../../../main/state-machine/cache';
import * as Patch from '../../../main/state-machine/patch'
import * as Req from '../../../main/state-machine/request';
import * as Drop from './drop';

export const ACTION = "move-link";

export interface After extends Drop.Reference {
    action_id: string;
    release_id: string;
    release_ix: number;
}

export interface From extends Drop.Reference {
    story_id: string;
}

export interface AfterRequest extends Drop.ReferenceRequest {
    action_id: Req.Field<AfterRequest, string>;
    release_id: Req.Field<AfterRequest, string>;
    release_ix: Req.Field<AfterRequest, number>;
}
export interface FromRequest extends Drop.ReferenceRequest {
    story_id: Req.Field<AfterRequest, string>;
}

export interface Params extends Drop.Params<From, After> {
}

export interface Request extends Drop.Request<FromRequest, AfterRequest> {
}


export function request(params: Req.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}

export function execute<T>(params: Params): Patch.Patch {
    const link_id = Cache.CACHE.generateId("action_release_story");
    return {
        insert: [{
            id: link_id,
            action_id: params.after.action_id,
            release_id: params.after.release_id,
            release_ix: params.after.release_ix + 1,
            story_id: params.from.story_id
        }],
        delete: [params.from.$id]
    };
}
