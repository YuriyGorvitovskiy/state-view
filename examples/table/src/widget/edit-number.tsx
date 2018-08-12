import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";

import * as Abstract from "./edit-abstract";

export class Component extends Abstract.Component<number> {

    calculateValue(str: string): number {
        let value = Number(str);
        return isNaN(value) ? null : value;
    }

    calculateString(edit: boolean, value: number): string {
        return null == value ? "" : edit ? value.toString() : value.toLocaleString();
    }
};
