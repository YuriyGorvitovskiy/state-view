import * as Widget from "../widget";
import * as Editable from "./editable";

export type Request = Editable.Request<string>;
export type Props = Editable.Props<string>;

export const WIDGET = "editable-string";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
