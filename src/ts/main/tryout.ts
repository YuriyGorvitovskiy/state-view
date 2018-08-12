

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

export interface Function<P, T> {
    $function: string,
    $prop: Single<P>,
};

export interface Mapping<F, T> {
    $mapping: string,
};

export function mapping<T>(p: string): Mapping<any, T> {
    return {
        $mapping: p
    };
};


export type WidgetField<R, T> = T | Path<T> | Function<R, T>;
export type ActionField<F, R, T> = T | Path<T> | Function<R, T> | Mapping<F, T>;

export type Single<T> = T | T & Request;
export type Plural<T> = T[] | (T & Request)[] | T & RequestArray;

export interface Widget<P> {
    $widget: string,
    $prop: Single<P>,
};

export interface Action<E, P> {
    $action: string,
    $prop: Single<P>,
}

export interface Value<P> {
    value: WidgetField<Value<P>, P>;
}

export interface ValueEditable<P> extends Value<P> {
    edit: Action<Value<P>, any>;
}

export interface Column {
    column_id: WidgetField<Column, string>;
    widget: Single<Widget<any>>;
}

export interface Item {
    column_id: WidgetField<Item, string>;
    widget: Single<Widget<any>>;
}

export interface Row {
    items: Plural<Item>;
}

export interface Table {
    columns: Plural<Column>;
    rows: Plural<Row>;
}

export interface ChangeAttribute<F, T> {
    attr:  ActionField<F, ChangeAttribute<F, T>, string>;
    value: ActionField<F, ChangeAttribute<F, T>, T>;
}

export function stringWidget(prop: Value<string>): Widget<Value<string>> {
    return {
        $widget: "string-value",
        $prop: prop
    };
};

export function stringEditWidget(prop: ValueEditable<string>): Widget<ValueEditable<string>> {
    return {
        $widget: "string-edit-value",
        $prop: prop
    };
};

export function numberEditWidget(prop: ValueEditable<number>): Widget<ValueEditable<number>> {
    return {
        $widget: "number-edit-value",
        $prop: prop
    };
};

export function booleanEditWidget(prop: ValueEditable<boolean>): Widget<ValueEditable<boolean>> {
    return {
        $widget: "boolean-edit-value",
        $prop: prop
    };
};

export function tableWidget(prop: Single<Table>):  Widget<Table> {
    return {
        $widget: "table",
        $prop: prop
    };
}

export function changeAttributeAction<E, T>(prop: Single<ChangeAttribute<E, T>>):  Action<E, ChangeAttribute<E, T>> {
    return {
        $action: "change_attribite",
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
            widget: stringEditWidget({
                value: path("name"),
                edit: changeAttributeAction({
                    attr: "name",
                    value: mapping("value")
                })
            })
        },{
            column_id: "boolean",
            widget: booleanEditWidget({
                value: path("boolean"),
                edit: changeAttributeAction({
                    attr: "boolean",
                    value: mapping("value")
                })
            })
        },{
            column_id: "number",
            widget: numberEditWidget({
                value: path("number"),
                edit: changeAttributeAction({
                    attr: "number",
                    value: mapping("value")
                })
            })
        }]
    }
});
