import * as Action from "../state-machine/action";
import * as Req from "../state-machine/request";
import * as Widget from "../state-machine/widget";
import * as Value from "./value";


export interface Request {
    label: Req.Field<Req.Request, string>;
    press: Action.Request<{}>;
}

export interface Props {
    label: string;
    press: Action.Event<null>;
}

export const WIDGET = "button";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
