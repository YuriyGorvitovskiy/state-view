import {Path} from "../../../main/path";
import {State} from "../../../main/state";
import {View} from "../../../main/view";
import {Widgets} from "./registry";

export function TABLE_VIEW() {
    return {
        $id: null,
        $widget: Widgets.TABLE_WIDGET,
        $prop: {
            columns: [{
                $id: "name",
                $widget: Widgets.STRING_WIDGET,
                $prop: {
                    value: "Name"
                }
            },{
                $id: "boolean",
                $widget: Widgets.STRING_WIDGET,
                $prop: {
                    value: "Boolean"
                }
            },{
                $id: "number",
                $widget: Widgets.STRING_WIDGET,
                $prop: {
                    value: "Number"
                }
            },{
                $id: "string",
                $widget: Widgets.STRING_WIDGET,
                $prop: {
                    value: "String"
                }
            }],
            rows: {
                $id: new Path("^item:list_id"),
                cells: [{
                    $id: null,
                    $widget: Widgets.STRING_WIDGET,
                    $prop: {
                        $id: null,
                        value: new Path("name")
                    },
                    column_id: "name"
                },{
                    $id: null,
                    $widget: Widgets.BOOLEAN_WIDGET,
                    $prop: {
                        $id: null,
                        value: new Path("boolean")
                    },
                    column_id: "boolean"
                },{
                    $id: null,
                    $widget: Widgets.NUMBER_WIDGET,
                    $prop: {
                        $id: null,
                        value: new Path("number")
                    },
                    column_id: "number"
                },{
                    $id: null,
                    $widget: Widgets.STRING_WIDGET,
                    $prop: {
                        $id: null,
                        value: new Path("string")
                    },
                    column_id: "string"
                }]
            }
        }
    };
};
