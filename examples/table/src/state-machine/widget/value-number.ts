import * as Widget from "../widget";
import * as Value from "./value";

export type Request = Value.Request<number>;
export type Props = Value.Props<number>;

export const WIDGET = "value-number";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
