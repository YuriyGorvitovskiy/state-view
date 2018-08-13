import {path} from "../../state-machine/request";

import * as ChangeAttribute from "../action/change-attribute";
import * as EditableBoolean from "../../state-machine/widget/editable-boolean";
import * as EditableNumber from "../../state-machine/widget/editable-number";
import * as EditableString from "../../state-machine/widget/editable-string";
import * as Table from "../../state-machine/widget/table";
import * as ValueString from "../../state-machine/widget/value-string";
import * as Cache from "../../state-machine/cache";

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
        }]
    }
});
