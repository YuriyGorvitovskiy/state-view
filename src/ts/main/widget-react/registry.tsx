import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Widget from "../state-machine/widget";

import * as EditableBoolean from "../state-machine/widget/editable-boolean";
import * as EditableNumber from "../state-machine/widget/editable-number";
import * as EditableString from "../state-machine/widget/editable-string";
import * as Table from "../state-machine/widget/table";
import * as ValueBoolean from "../state-machine/widget/value-boolean";
import * as ValueNumber from "../state-machine/widget/value-number";
import * as ValueString from "../state-machine/widget/value-string";


import * as EditableBooleanImpl from "./editable-boolean";
import * as EditableNumberImpl from "./editable-number";
import * as EditableStringImpl from "./editable-string";
import * as Root from "./root";
import * as TableImpl from "./table";
import * as ValueBooleanImpl from "./value-boolean";
import * as ValueNumberImpl from "./value-number";
import * as ValueStringImpl from "./value-string";


export function register() {
    Widget.REGISTRY[EditableBoolean.WIDGET] = (prop: any) => React.createElement(EditableBooleanImpl.Component, prop);
    Widget.REGISTRY[EditableNumber.WIDGET] = (prop: any) => React.createElement(EditableNumberImpl.Component, prop);
    Widget.REGISTRY[EditableString.WIDGET] = (prop: any) => React.createElement(EditableStringImpl.Component, prop);
    Widget.REGISTRY[Table.WIDGET] = (prop: any) => React.createElement(TableImpl.Component, prop);
    Widget.REGISTRY[ValueBoolean.WIDGET] = (prop: any) => React.createElement(ValueBooleanImpl.Component, prop);
    Widget.REGISTRY[ValueNumber.WIDGET] = (prop: any) => React.createElement(ValueNumberImpl.Component, prop);
    Widget.REGISTRY[ValueString.WIDGET] = (prop: any) => React.createElement(ValueStringImpl.Component, prop);
}

export function start() {
    let ref: React.RefObject<Root.Component> = React.createRef();
    ReactDOM.render(<Root.Component ref={ref}/>, document.getElementById("root"));
    Widget.registerRootComponent(ref.current);
}
