import * as Widget from "../widget";
import * as Editable from "./editable";

export type Request = Editable.Request<boolean>;
export type Props = Editable.Props<boolean>;

export const WIDGET = "editable-boolean";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
}
