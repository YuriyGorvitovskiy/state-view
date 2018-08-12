import {path} from "../../state-machine/request";

import * as ChangeAttribute from "../action/change-attribute";
import * as Widget from "../../state-machine/widget";
import * as Cache from "../../state-machine/cache";

export const TABLE_VIEW = Widget.tableWidget({
    columns: [{
        column_id: "name",
        widget: Widget.stringWidget({value: "Name"})
    },{
        column_id: "boolean",
        widget: Widget.stringWidget({value: "Boolean"})
    },{
        column_id: "number",
        widget: Widget.stringWidget({value: "Number"})
    }],
    rows: {
        $id: path("^item:list_id"),
        items: [{
            column_id: "name",
            widget: Widget.stringEditWidget({
                value: path("name"),
                edit: ChangeAttribute.changeAttributeReq({
                    attr: "name",
                    value: ""
                })
            })
        },{
            column_id: "boolean",
            widget: Widget.booleanEditWidget({
                value: path("boolean"),
                edit: ChangeAttribute.changeAttributeReq({
                    attr: "boolean",
                    value: true
                })
            })
        },{
            column_id: "number",
            widget: Widget.numberEditWidget({
                value: path("number"),
                edit: ChangeAttribute.changeAttributeReq({
                    attr: "number",
                    value: null
                })
            })
        }]
    }
});
