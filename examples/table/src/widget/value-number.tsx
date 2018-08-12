import * as React from "react";

import * as Widget from "../state-machine/widget";

export class Component
                    extends React.Component<Widget.ValueProp<number>, {}>
                    implements Widget.Component<Widget.ValueProp<number>> {
    render() {
        return <span>{null == this.props.value ? null : this.props.value.toLocaleString()}</span>;
    }
};
