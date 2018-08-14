import * as Widget from "../widget";
import * as Value from "./value";

export type Request = Value.Request<string>;
export type Props = Value.Props<string>;

export const WIDGET = "value-string";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
