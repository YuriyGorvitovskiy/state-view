import * as ValueBoolean from "../../../main/widget/value-boolean";
import * as Widget from "../../../main/state-machine/widget";

import * as Test from "./test-widget";


export class Component extends Test.Component<ValueBoolean.Props>
                    implements Widget.Component<ValueBoolean.Props> {
    render() {
        return "<bool>" + (this.props.value? "ON" : "off") + "</bool>";
    }
};
