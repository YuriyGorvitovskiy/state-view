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
    items: Plural<ItemRequest>;
}

export interface Props {
    items: ItemProps[];
}

export interface ItemRequest {
    widget: Single<Widget.Request<any>>;
}

export interface ItemProps {
    widget: Widget.Request<any>;
}
