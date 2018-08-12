import {ActionProp, ActionReq} from "./action";
import {Function, Path, Field, Plural, Single} from "./request";

export interface Component<P> {
};

export interface RootComponent {
    refresh: () => any;
};

export type ComponentFactory<P> = (prop: P) => Component<P>;

export interface Config {
    registry: {[widget: string]: ComponentFactory<any>};
    root:  RootComponent,
}
export const CONFIG: Config = {
    registry: {},
    root:  null
};

export interface Widget<P> {
    $widget: string,
    $prop: Single<P>,
};
export const BOOLEAN_EDIT = "boolean-edit";
export const BOOLEAN_VALUE = "boolean-value";
export const NUMBER_EDIT = "number-edit";
export const NUMBER_VALUE = "number-value";
export const STRING_EDIT = "string-edit";
export const STRING_VALUE = "string-value";
export const TABLE = "table";

export interface ValueReq<P> {
    value: Field<ValueReq<P>, P>;
}
export interface ValueProp<P> {
    value: P;
}
export function stringWidget(prop: ValueReq<string>): Widget<ValueReq<string>> {
    return {
        $widget: STRING_VALUE,
        $prop: prop
    };
};

export interface ValueEditableReq<P> extends ValueReq<P> {
    edit: ActionReq<ValueReq<P>>;
}
export interface ValueEditableProp<P> extends ValueProp<P> {
    edit: ActionProp<ValueProp<P>>;
}
export function stringEditWidget(prop: ValueEditableReq<string>): Widget<ValueEditableReq<string>> {
    return {
        $widget: STRING_EDIT,
        $prop: prop
    };
};

export function numberEditWidget(prop: ValueEditableReq<number>): Widget<ValueEditableReq<number>> {
    return {
        $widget: NUMBER_EDIT,
        $prop: prop
    };
};

export function booleanEditWidget(prop: ValueEditableReq<boolean>): Widget<ValueEditableReq<boolean>> {
    return {
        $widget: BOOLEAN_EDIT,
        $prop: prop
    };
};

export interface ColumnReq {
    column_id: Field<ColumnReq, string>;
    widget: Single<Widget<any>>;
}
export interface ColumnProp {
    $id: string;
    column_id: string;
    widget: Widget<any>;
}

export interface ItemReq {
    column_id: Field<ItemReq, string>;
    widget: Single<Widget<any>>;
}

export interface ItemProp {
    $id: string;
    column_id: string;
    widget: Widget<any>;
}

export interface RowReq {
    items: Plural<ItemReq>;
}

export interface RowProp {
    $id: string;
    items: ItemProp[];
}

export interface TableReq {
    columns: Plural<ColumnReq>;
    rows: Plural<RowReq>;
}
export interface TableProp {
    $id: string;
    columns: ColumnProp[];
    rows: RowProp[];
}

export function tableWidget(prop: TableReq):  Widget<TableReq> {
    return {
        $widget: TABLE,
        $prop: prop
    };
}
