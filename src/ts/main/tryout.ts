export interface Path<T> {
    $path: string,
};

export function path<T>(p: string): Path<T> {
    return {
        $path: p
    };
};

export interface Request {
    $id: string | Path<string>,
}

export interface RequestArray {
    $id: string[] | Path<string[]>;
}

export type Function<R, T> = (R) => T;
export type Field<R, T> = T | Path<T> | Function<R, T>;
export type Single<T> = T | T & Request;
export type Plural<T> = T[] | (T & Request)[] | T & RequestArray;

export interface Value<P> {
    value: Field<Value<P>, P>;
}

export interface Column {
    column_id: Field<Column, string>;
    widget: Single<Widget<any>>;
}

export interface Item {
    column_id: Field<Item, string>;
    widget: Single<Widget<any>>;
}

export interface Row {
    items: Plural<Item>;
}

export interface Table {
    columns: Plural<Column>;
    rows: Plural<Row>;
}

export interface Widget<T> {
    $widget: string,
    $prop: Single<T>,
};

export function stringWidget(prop: Value<string>): Widget<Value<string>> {
    return {
        $widget: "string-value",
        $prop: prop
    };
};

export function numberWidget(prop: Value<number>): Widget<Value<number>> {
    return {
        $widget: "number-value",
        $prop: prop
    };
};

export function booleanWidget(prop: Value<boolean>): Widget<Value<boolean>> {
    return {
        $widget: "boolean-value",
        $prop: prop
    };
};

export function tableWidget(prop: Single<Table>):  Widget<Table> {
    return {
        $widget: "table",
        $prop: prop
    };
}

const TABLE: Widget<Table> = tableWidget({
    columns: [{
        column_id: "name",
        widget: stringWidget({value: "Name"})
    },{
        column_id: "boolean",
        widget: stringWidget({value: "Boolean"})
    },{
        column_id: "number",
        widget: stringWidget({value: "Number"})
    }],
    rows: {
        $id: path("^item:list"),
        items: [{
            column_id: "name",
            widget: stringWidget({value: path("name")})
        },{
            column_id: "boolean",
            widget: booleanWidget({value: path("boolean")})
        },{
            column_id: "number",
            widget: numberWidget({value: path("number")})
        }]
    }
});
