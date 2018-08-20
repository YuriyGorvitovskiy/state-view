import * as Action from '../../../main/state-machine/action';
import * as Cache from '../../../main/state-machine/cache';
import * as Patch from '../../../main/state-machine/patch'
import * as Request from '../../../main/state-machine/request';
import * as Drop from './drop';

export const ACTION = "create-new-story-after-link";

export interface After extends Drop.Reference {
    action_id: string;
    release_id: string;
    release_ix: number;
    project_id: string;
}
export interface AfterRequest extends Drop.ReferenceRequest {
    action_id: Request.Field<AfterRequest, string>;
    release_id: Request.Field<AfterRequest, string>;
    release_ix: Request.Field<AfterRequest, number>;
    project_id: Request.Field<AfterRequest, string>;
}

export interface Params extends Drop.Params<Drop.Reference, After> {
    name:  string;
}

export interface Request extends Drop.Request<Drop.ReferenceRequest, AfterRequest> {
    name:  Request.Field<Request, string>;
}


export function request(params: Request.Single<Request>):  Action.Request<Request> {
    return {
        $action: ACTION,
        $params: params
    };
}

export function execute<T>(params: Params): Patch.Patch {
    const story_id = Cache.CACHE.generateId("story");
    const link_id = Cache.CACHE.generateId("action_release_story");
    return {
        insert: [{
            id: story_id,
            name: params.name,
            project_id: params.after.project_id
        },
        {
            id: link_id,
            action_id: params.after.action_id,
            release_id: params.after.release_id,
            release_ix: params.after.release_ix + 1,
            story_id: story_id,
        }
    ]};
}
