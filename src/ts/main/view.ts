import {Path} from "./path";
import * as State from "./state";
import {Prop, Widget} from "./widget";

export interface View<P extends Prop> {
    id: string;
    widget: {new(): Widget<P>};
    request: State.Request;
}

export interface Registry {
    [id: string]: View<any>;
}
