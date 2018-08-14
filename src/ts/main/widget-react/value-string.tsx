import * as React from "react";

import * as Widget from "../state-machine/widget";
import * as ValueString from "../widget/value-string";

export class Component extends React.Component<ValueString.Props, {}>
                    implements Widget.Component<ValueString.Props> {
    render() {
        return <span>{this.props.value}</span>;
    }
};
