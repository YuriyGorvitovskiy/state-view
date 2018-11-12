import * as Table from "../../../main/widget/table";
import * as Widget from "../../../main/state-machine/widget";

import * as Test from "./test-widget";

export class Component extends Test.Component<Table.Props>
                    implements Widget.Component<Table.Props> {
    public render(): string {
        let columnsRender = "";
        for (const column of this.props.columns) {
            const component = Widget.REGISTRY[column.widget.$widget](column.widget.$props) as Test.Component<any>;
            columnsRender += "<col>" + component.render() + "</col>";
        }
        let rowsRender = "";
        for (const row of this.props.rows) {
            let cellsRender = "";
            for (const column of this.props.columns) {
                let cell = null;
                for (const item of row.items) {
                    if (column.column == item.column) {
                        cell = item;
                        break;
                    }
                }
                if (null != cell) {
                    const component = Widget.REGISTRY[cell.widget.$widget](cell.widget.$props) as Test.Component<any>;
                    cellsRender += "<cell>" + component.render() + "</cell>";
                } else {
                    cellsRender += "<cell></cell>";
                }
            }
            rowsRender += "<row>" + cellsRender + "</row>";
        }
        return "<tbl><head>" + columnsRender + "</head><body>" + rowsRender +"</body></tbl>";
    }};
