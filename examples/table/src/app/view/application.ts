import * as Layout from "../../../../../src/ts/main/widget/layout-flow";
import * as Toolbar from "./toolbar";
import * as Table from "./items-table";

export const APPLICATION = Layout.widget({
    direction: Layout.VERTICAL,
    items: [{
        widget: Toolbar.TOOLBAR
    },{
        widget: Table.TABLE_VIEW
    }]
});
