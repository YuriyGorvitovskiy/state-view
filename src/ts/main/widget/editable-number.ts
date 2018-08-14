import * as Widget from "../state-machine/widget";
import * as Editable from "./editable";

export type Request = Editable.Request<number>;
export type Props = Editable.Props<number>;

export const WIDGET = "editable-number";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
}
