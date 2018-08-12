import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";

export class Component
                    extends React.Component<Widget.ValueEditableProp<boolean>, {}>
                    implements Widget.Component<Widget.ValueEditableProp<boolean>> {
    render() {
        return <span onClick={(e)=>this.onClick(e)}>{null == this.props.value ? null : this.props.value ? "✅" : "❎"}</span>;
    }

    onClick(ev: React.MouseEvent) {
        ev.preventDefault();
        let actionProp = { ...this.props.edit.$prop};
        actionProp.value = !this.props.value;

        Action.fire(this.props.edit.$action, actionProp);
    }
};
