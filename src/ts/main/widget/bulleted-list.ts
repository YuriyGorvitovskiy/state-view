import {Field, Plural, Single} from "../state-machine/request";
import * as Widget from "../state-machine/widget";

export const WIDGET = "bulleted-list";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};

export interface Request {
    items: Plural<Widget.Request<any>>;
}

export interface Props {
    items: Widget.Request<any>[];
}
