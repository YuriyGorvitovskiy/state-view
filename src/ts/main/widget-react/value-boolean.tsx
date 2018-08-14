import * as React from "react";

import * as Widget from "../state-machine/widget";
import * as ValueBoolean from "../widget/value-boolean";

export class Component extends React.Component<ValueBoolean.Props, {}>
                    implements Widget.Component<ValueBoolean.Props> {
    render() {
        return <span>{null == this.props.value ? null : this.props.value ? "\u2705" : "\u2B55"}</span>;
    }
};
