import * as React from "react";

import * as Editable from "./editable";

export class Component extends Editable.Component<string> {

    calculateValue(str: string): string {
        return str;
    }

    calculateString(edit: boolean, value: string): string {
        return value;
    }
};
