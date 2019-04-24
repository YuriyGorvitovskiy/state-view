import {path} from "../../../../../src/ts/main/state-machine/request";

import * as Select from "../action/select";
import * as Button from "../../../../../src/ts/main/widget/button";
import * as Layout from "../../../../../src/ts/main/widget/layout-flow";

export const TASKLIST = Layout.widget({
    direction: Layout.VERTICAL,
    items: {
        $id: path("^task:context_id.^view:task_id"),
        widget: Button.widget({
            label: path("label"), // space and black-plus symbol
            press: Select.request({
                where: path("task_id.context_id"),
                attr: "select_view_id",
                what: path("")
            })
        })
    }
});
