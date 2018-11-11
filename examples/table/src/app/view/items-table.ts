import {path} from "../../../../../src/ts/main/state-machine/request";

import * as ChangeAttribute from "../action/change-attribute";
import * as Delete from "../action/delete";
import * as Button from "../../../../../src/ts/main/widget/button";
import * as EditableBoolean from "../../../../../src/ts/main/widget/editable-boolean";
import * as EditableNumber from "../../../../../src/ts/main/widget/editable-number";
import * as EditableString from "../../../../../src/ts/main/widget/editable-string";
import * as Table from "../../../../../src/ts/main/widget/table";
import * as ValueString from "../../../../../src/ts/main/widget/value-string";
import * as Cache from "../../../../../src/ts/main/state-machine/cache";

export const TABLE_VIEW = Table.widget({
    columns: [{
        column: "name",
        widget: ValueString.widget({value: "Name"})
    },{
        column: "boolean",
        widget: ValueString.widget({value: "Boolean"})
    },{
        column: "number",
        widget: ValueString.widget({value: "Number"})
    },{
        column: "action",
        widget: ValueString.widget({value: "Action"})
    }],
    rows: {
        $id: path("^item:list_id"),
        items: [{
            column: "name",
            widget: EditableString.widget({
                value: path("name"),
                edit: ChangeAttribute.request({
                    attr: "name",
                    value: ""
                })
            })
        },{
            column: "boolean",
            widget: EditableBoolean.widget({
                value: path("boolean"),
                edit: ChangeAttribute.request({
                    attr: "boolean",
                    value: true
                })
            })
        },{
            column: "number",
            widget: EditableNumber.widget({
                value: path("number"),
                edit: ChangeAttribute.request({
                    attr: "number",
                    value: null
                })
            })
        },{
            column: "action",
            widget: Button.widget({
                label: "\u205F\u274C", // space and red-delete cross
                press: Delete.request({
                    $id: null
                })
            })
        }]
    }
});
