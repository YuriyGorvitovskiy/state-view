import * as React from "react";

import * as Widget from "../state-machine/widget";

export class Component
                    extends React.Component<Widget.TableProp, {}>
                    implements Widget.Component<Widget.TableProp> {
    render() {
        let elemColumns = [];
        for (const column of this.props.columns) {
            let element = Widget.CONFIG.registry[column.widget.$widget](column.widget.$prop) as React.ReactElement<any>;
            elemColumns.push(<th key={column.column_id}>{element}</th>);
        }
        let elemRows = [];
        for (const row of this.props.rows) {
            let elemCells = [];
            for (const column of this.props.columns) {
                let item = row.items.filter((i)=> i.column_id == column.column_id)[0];
                if (null != item) {
                    let element = Widget.CONFIG.registry[item.widget.$widget](item.widget.$prop) as React.ReactElement<any>;
                    elemCells.push(<td key={column.column_id}>{element}</td>);
                } else {
                    elemCells.push(<td key={column.column_id}></td>);
                }
            }
            elemRows.push(<tr key={row.$id}>{elemCells}</tr>);
        }
        return <table><thead><tr>{elemColumns}</tr></thead><tbody>{elemRows}</tbody></table>;
    }
};
