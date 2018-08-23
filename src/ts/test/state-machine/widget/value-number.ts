import * as List from "../../../main/widget/bulleted-list";
import * as ValueNumber from "../../../main/widget/value-number";
import * as Widget from "../../../main/state-machine/widget";

import * as Test from "./test-widget";


export class Component extends Test.Component<ValueNumber.Props>
                    implements Widget.Component<ValueNumber.Props> {
    render() {
        return "<num>" + this.props.value + "</num>";
    }
};
