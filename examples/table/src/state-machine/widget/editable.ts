import * as Action from "../action";

import * as Value from "./value";

export interface Request<T> extends Value.Request<T> {
    edit: Action.Request<Value.Request<T>>;
}

export interface Props<P> extends Value.Props<P> {
    edit: Action.Event<Value.Props<P>>;
}
