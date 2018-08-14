import * as React from "react";

import * as Widget from "../state-machine/widget";
import * as ValueNumber from "../widget/value-number";

export class Component extends React.Component<ValueNumber.Props, {}>
                    implements Widget.Component<ValueNumber.Props> {
    render() {
        return <span>{null == this.props.value ? null : this.props.value.toLocaleString()}</span>;
    }
};
