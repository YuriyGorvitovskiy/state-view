import * as React from "react";

import * as Editable from "./editable";

export class Component extends Editable.Component<number> {

    calculateValue(str: string): number {
        let value = Number(str);
        return isNaN(value) ? null : value;
    }

    calculateString(edit: boolean, value: number): string {
        return null == value ? "" : edit ? value.toString() : value.toLocaleString();
    }
};
