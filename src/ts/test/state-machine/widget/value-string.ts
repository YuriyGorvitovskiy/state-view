import * as ValueString from "../../../main/widget/value-string";
import * as Widget from "../../../main/state-machine/widget";

import * as Test from "./test-widget";


export class Component extends Test.Component<ValueString.Props>
                    implements Widget.Component<ValueString.Props> {
    render() {
        return "<str>" + this.props.value + "</str>";
    }
};
