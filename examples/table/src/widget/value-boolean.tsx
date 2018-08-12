import * as React from "react";

import * as Widget from "../state-machine/widget";

export class Component
                    extends React.Component<Widget.ValueProp<boolean>, {}>
                    implements Widget.Component<Widget.ValueProp<boolean>> {
    render() {
        return <span>{null == this.props.value ? null : this.props.value ? "☑︎" : "☐"}</span>;
    }
};
