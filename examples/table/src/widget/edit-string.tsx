import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";

import * as Abstract from "./edit-abstract";

export class Component extends Abstract.Component<string> {

    calculateValue(str: string): string {
        return str;
    }

    calculateString(edit: boolean, value: string): string {
        return value;
    }
};
