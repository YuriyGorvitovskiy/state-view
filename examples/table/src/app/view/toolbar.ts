import {path} from "../../../../../src/ts/main/state-machine/request";

import * as Insert from "../action/insert";
import * as Button from "../../../../../src/ts/main/widget/button";
import * as Layout from "../../../../../src/ts/main/widget/layout-flow";
import * as Cache from "../../../../../src/ts/main/state-machine/cache";

export const TOOLBAR = Layout.widget({
    direction: Layout.HORIZONTAL,
    items: [{
        widget: Button.widget({
            label: "\u205F\u2795", // space and black-plus symbol
            press: Insert.request({
                $id: null
            })
        })
    }],
});
