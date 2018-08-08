import {Cache} from "../../../main/cache";
import {Widget} from "../../../main/widget";

export const cache = new Cache();

export namespace Props {
    export interface BooleanValue {
        value: boolean;
    };
    export interface NumberValue {
        value: boolean;
    };
    export interface StringValue {
        value: boolean;
    };

    export interface Table {
        columns: Column<any>[];
        rows: Row[];
    };

    export interface Column<P> {
        $id: string;
        $widget: {new(): Widget<P>}
        $prop: P;
    }

    export interface Row {
        $id: string;
        cells: Cell<any>[];
    }

    export interface Cell<P> {
        $id: string;
        $widget: {new(): Widget<P>}
        $prop: P;
        column_id: string;
    }
}
export class Widgets {
    public static BOOLEAN_WIDGET: {new(): Widget<Props.BooleanValue>};
    public static NUMBER_WIDGET: {new(): Widget<Props.NumberValue>};
    public static STRING_WIDGET: {new(): Widget<Props.StringValue>};
    public static TABLE_WIDGET: {new(): Widget<Props.Table>};
}
