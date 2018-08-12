import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Widget from "../state-machine/widget";

import * as EditBoolean from "./edit-boolean";
import * as EditNumber from "./edit-number";
import * as EditString from "./edit-string";
import * as Root from "./root";
import * as Table from "./table";
import * as ValueBoolean from "./value-boolean";
import * as ValueNumber from "./value-number";
import * as ValueString from "./value-string";


export function register() {
    Widget.CONFIG.registry[Widget.TABLE] = (prop: any) => React.createElement(Table.Component, prop);
    Widget.CONFIG.registry[Widget.BOOLEAN_EDIT] = (prop: any) => React.createElement(EditBoolean.Component, prop);
    Widget.CONFIG.registry[Widget.BOOLEAN_VALUE] = (prop: any) => React.createElement(ValueBoolean.Component, prop);
    Widget.CONFIG.registry[Widget.NUMBER_EDIT] = (prop: any) => React.createElement(EditNumber.Component, prop);
    Widget.CONFIG.registry[Widget.NUMBER_VALUE] = (prop: any) => React.createElement(ValueNumber.Component, prop);
    Widget.CONFIG.registry[Widget.STRING_EDIT] = (prop: any) => React.createElement(EditString.Component, prop);
    Widget.CONFIG.registry[Widget.STRING_VALUE] = (prop: any) => React.createElement(ValueString.Component, prop);
}

export function start() {
    let ref: React.RefObject<Root.Component> = React.createRef();
    ReactDOM.render(<Root.Component ref={ref}/>, document.getElementById("root"));
    Widget.CONFIG.root = ref.current;
}
