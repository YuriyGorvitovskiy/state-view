import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Widget from "../state-machine/widget";

import * as Button from "../widget/button";
import * as EditableBoolean from "../widget/editable-boolean";
import * as EditableNumber from "../widget/editable-number";
import * as EditableString from "../widget/editable-string";
import * as Table from "../widget/table";
import * as ValueBoolean from "../widget/value-boolean";
import * as ValueNumber from "../widget/value-number";
import * as ValueString from "../widget/value-string";

import * as ButtonImpl from "./button";
import * as EditableBooleanImpl from "./editable-boolean";
import * as EditableNumberImpl from "./editable-number";
import * as EditableStringImpl from "./editable-string";
import * as Root from "./root";
import * as TableImpl from "./table";
import * as ValueBooleanImpl from "./value-boolean";
import * as ValueNumberImpl from "./value-number";
import * as ValueStringImpl from "./value-string";


export function register() {
    Widget.REGISTRY[Button.WIDGET] = (props: any) => React.createElement(ButtonImpl.Component, props);
    Widget.REGISTRY[EditableBoolean.WIDGET] = (props: any) => React.createElement(EditableBooleanImpl.Component, props);
    Widget.REGISTRY[EditableNumber.WIDGET] = (props: any) => React.createElement(EditableNumberImpl.Component, props);
    Widget.REGISTRY[EditableString.WIDGET] = (props: any) => React.createElement(EditableStringImpl.Component, props);
    Widget.REGISTRY[Table.WIDGET] = (props: any) => React.createElement(TableImpl.Component, props);
    Widget.REGISTRY[ValueBoolean.WIDGET] = (props: any) => React.createElement(ValueBooleanImpl.Component, props);
    Widget.REGISTRY[ValueNumber.WIDGET] = (props: any) => React.createElement(ValueNumberImpl.Component, props);
    Widget.REGISTRY[ValueString.WIDGET] = (props: any) => React.createElement(ValueStringImpl.Component, props);
}

export function start() {
    let ref: React.RefObject<Root.Component> = React.createRef();
    ReactDOM.render(<Root.Component ref={ref}/>, document.getElementById("root"));
    Widget.registerRootComponent(ref.current);
}
