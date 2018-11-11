import * as React from "react";

import * as Widget from "../state-machine/widget";
import * as Layout from "../widget/layout-flow";

export class Component extends React.Component<Layout.Props, {}>
                    implements Widget.Component<Layout.Props> {
    render() {
        let elements = [];
        for (const item of this.props.items) {
            let element = Widget.REGISTRY[item.widget.$widget](item.widget.$props) as React.ReactElement<any>;
            if (Layout.HORIZONTAL == this.props.direction) {
                elements.push(<span key={elements.length}>{element}</span>);
            } else {
                elements.push(<div key={elements.length}>{element}</div>);
            }
        }
        return <div>{elements}</div>;
    }
};
