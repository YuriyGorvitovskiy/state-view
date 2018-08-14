import {Field, Plural, Single} from "../state-machine/request";
import * as Widget from "../state-machine/widget";

export const WIDGET = "table";
export function widget(props: Request): Widget.Request<Request> {
    return {
        $widget: WIDGET,
        $props: props
    };
};
export interface Request {
    columns: Plural<ColumnProps>;
    rows: Plural<RowRequest>;
}
export interface Props {
    columns: ColumnProps[];
    rows: RowProps[];
}

export interface ColumnRequest {
    column: Field<ColumnRequest, string>;
    widget: Single<Widget.Request<any>>;
}

export interface ColumnProps {
    column: string;
    widget: Widget.Request<any>;
}

export interface RowRequest {
    items: Plural<ItemRequest>;
}

export interface RowProps {
    items: ItemProps[];
}

export interface ItemRequest {
    column: Field<ItemRequest, string>;
    widget: Single<Widget.Request<any>>;
}

export interface ItemProps {
    column: string;
    widget: Widget.Request<any>;
}
