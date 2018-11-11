import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";
import * as Button from "../widget/button";

export class Component extends React.Component<Button.Props, {}>
                    implements Widget.Component<Button.Props> {
    render() {
        return <button type="button"
                       className="btn btn-default"
                       onClick={(e)=>this.onClick(e)}
                >{this.props.label}</button>;
    }

    onClick(ev: React.MouseEvent<any>) {
        ev.preventDefault();
        Action.fire(this.props.press.$action, this.props.press.$params);
    }
};
