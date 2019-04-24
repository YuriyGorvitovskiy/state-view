import * as Layout from "../../../../../src/ts/main/widget/layout-flow";
import * as Tasklist from "./tasklist";
import * as View from "./view";

export const APPLICATION = Layout.widget({
    direction: Layout.HORIZONTAL,
    items: [{
        widget: Tasklist.TASKLIST
    },{
        widget: View.VIEW
    }]
});
