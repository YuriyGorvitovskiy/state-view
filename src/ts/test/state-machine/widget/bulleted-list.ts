import * as List from "../../../main/widget/bulleted-list";
import * as Widget from "../../../main/state-machine/widget";

import * as Test from "./test-widget";

export class Component extends Test.Component<List.Props> implements Widget.Component<List.Props> {
    public render(): string {
        let buffer = "<ul>";
        for (const item of this.props.items) {
            const child = Widget.REGISTRY[item.$widget](item.$props) as Test.Component<any>;
            buffer += "<li>" + child.render() + "</li>";
        }
        return buffer + "</ul>";
    }
};
