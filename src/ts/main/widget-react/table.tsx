import * as React from "react";

import * as Widget from "../state-machine/widget";
import * as Table from "../widget/table";

export class Component extends React.Component<Table.Props, {}>
                    implements Widget.Component<Table.Props> {
    render() {
        let elemColumns = [];
        for (const column of this.props.columns) {
            let element = Widget.REGISTRY[column.widget.$widget](column.widget.$props) as React.ReactElement<any>;
            elemColumns.push(<th key={column.column}>{element}</th>);
        }
        let elemRows = [];
        for (const row of this.props.rows) {
            let elemCells = [];
            for (const column of this.props.columns) {
                let item = row.items.filter((i)=> i.column == column.column)[0];
                if (null != item) {
                    let element = Widget.REGISTRY[item.widget.$widget](item.widget.$props) as React.ReactElement<any>;
                    elemCells.push(<td key={column.column}>{element}</td>);
                } else {
                    elemCells.push(<td key={column.column}></td>);
                }
            }
            elemRows.push(<tr key={elemRows.length}>{elemCells}</tr>);
        }
        return <table><thead><tr>{elemColumns}</tr></thead><tbody>{elemRows}</tbody></table>;
    }
};
