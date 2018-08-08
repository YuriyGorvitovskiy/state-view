import {Prop, Widget} from "../../../main/widget";

import {Props, Widgets} from "./registry";

export abstract class Component<P extends Prop> implements Widget<P> {
    public prop: P;
    public abstract render(): string;
}

export class BooleanWidget extends Component<Props.BooleanValue>  {
    public render(): string {
        return "<bool>" + (this.prop.value ? "ON" : "off") + "</bool>";
    }
};

export class NumberWidget extends Component<Props.NumberValue>  {
    public render(): string {
        return "<num>" + this.prop.value + "</nul>";
    }
};

export class StringWidget extends Component<Props.StringValue>  {
    public render(): string {
        return "<str>" + this.prop.value + "</str>";
    }
};

export class TableWidget extends Component<Props.Table>  {
    public render(): string {
        let columnsRender = "";
        for (const column of this.prop.columns) {
            const component = new column.$widget() as Component<any>;
            component.prop = column.$prop;
            columnsRender += "<col>" + component.render() + "</col>";
        }
        let rowsRender = "";
        for (const row of this.prop.rows) {
            let cellsRender = "";
            for (const column of this.prop.columns) {
                let cell = null;
                for (const c of row.cells) {
                    if (column.$id == c.column_id) {
                        cell = c;
                        break;
                    }
                }
                if (null != cell) {
                    const component = new cell.$widget() as Component<any>;
                    component.prop = cell.$prop;
                    cellsRender += "<cell>" + component.render() + "</cell>";
                } else {
                    cellsRender += "<cell></cell>";
                }
            }
            rowsRender += "<row>" + cellsRender + "</row>";
        }
        return "<tbl><head>" + columnsRender + "</head><body>" + rowsRender +"</body></tbl>";
    }
};
