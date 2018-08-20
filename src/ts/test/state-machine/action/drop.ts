import * as Request from '../../../main/state-machine/request';

export interface Reference  {
    $id: string
};

export interface Params<F extends Reference, A extends Reference>  {
    from:  F;
    after:  A;
};

export interface ReferenceRequest {
    $id:  Request.Field<ReferenceRequest, string>;
};

export interface Request<F extends ReferenceRequest, A extends ReferenceRequest> {
    from:  Request.Single<F>;
    after:  Request.Single<A>;
}

