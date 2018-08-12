import * as React from "react";

import * as Widget from "../state-machine/widget";

export class Component
                    extends React.Component<Widget.ValueProp<string>, {}>
                    implements Widget.Component<Widget.ValueProp<string>> {
    render() {
        return <span>{this.props.value}</span>;
    }
};
