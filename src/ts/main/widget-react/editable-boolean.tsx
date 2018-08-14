import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";

import * as EditableBoolean from "../state-machine/widget/editable-boolean";

export class Component extends React.Component<EditableBoolean.Props, {}>
                    implements Widget.Component<EditableBoolean.Props> {
    render() {
        return <span onClick={(e)=>this.onClick(e)}>{null == this.props.value ? null : this.props.value ? "✅" : "❎"}</span>;
    }

    onClick(ev: React.MouseEvent) {
        ev.preventDefault();
        let params = { ...this.props.edit.$params};
        params.value = !this.props.value;

        Action.fire(this.props.edit.$action, params);
    }
};
