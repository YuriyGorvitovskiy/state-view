import {Field, Plural, Single} from "../state-machine/request";
import * as Widget from "../state-machine/widget";

export const WIDGET = "layout-flow";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};

export type Direction = "horizontal"|"vertical";
export const HORIZONTAL: Direction =  "horizontal";
export const VERTICAL: Direction =  "vertical";


export interface Request {
    direction: Single<Direction>;
    items: Plural<ItemProps>;
}


export interface Props {
    items: ItemProps[];
    direction: Direction;
}

export interface ItemRequest {
    widget: Single<Widget.Request<any>>;
}

export interface ItemProps {
    widget: Widget.Request<any>;
}
