import * as Widget from "../state-machine/widget";
import * as Value from "./value";

export type Request = Value.Request<boolean>;
export type Props = Value.Props<boolean>;

export const WIDGET = "value-boolean";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
