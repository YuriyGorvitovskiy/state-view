import * as React from "react";

import * as Action from "../state-machine/action";
import * as Widget from "../state-machine/widget";
import * as Editable from "../state-machine/widget/editable";

export type Props<T> = Editable.Props<T>;

export interface State {
    edit: boolean;
    value: string;
}

export abstract class Component<T> extends React.Component<Props<T>, State>
                                implements Widget.Component<Props<T>> {
    input: any;

    constructor(props: Readonly<Props<T>>) {
        super(props);
        this.state = {
            edit: false,
            value: this.calculateString(false, props.value)
        };
    }

    componentWillReceiveProps(nextProps: Props<T>) {
        if (this.props.value != nextProps.value) {
            this.setState({value: this.calculateString(this.state.edit, nextProps.value)});
        }
    }

    render() {
        return <input
            ref={(r)=>this.input = r}
            type="text"
            value={this.state.value}
            onChange={(e)=>this.onChange(e)}
            onFocus={(e)=>this.onFocus(e)}
            onBlur={(e)=>this.onBlur(e)}
            onKeyUp={(e)=>this.onKeyUp(e)}/>;
    }

    onChange(ev: React.FormEvent<any>) {
        ev.preventDefault();
        this.setState({value: this.input.value})
    }

    onKeyUp(ev: React.KeyboardEvent<any>) {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.success(true);
        } else if (ev.keyCode === 27) {
            ev.preventDefault();
            this.reset(true);
        }
    }

    onFocus(ev: React.FocusEvent<any>) {
        ev.preventDefault();
        this.setState({edit: true}, () => this.setState({value: this.calculateString(this.state.edit, this.props.value)}));
    }

    onBlur(ev: React.FocusEvent<any>) {
        ev.preventDefault();
        this.success(false);
    }

    success(edit: boolean) {
        let value: T = this.calculateValue(this.state.value);
        if (null == value || this.props.value == value) {
            this.reset(edit);
            return;
        }
        this.setState({edit}, () => this.setState({value: this.calculateString(this.state.edit, this.props.value)}));
        let actionProp = { ...this.props.edit.$params};
        actionProp.value = value;
        Action.fire(this.props.edit.$action, actionProp);
    }

    reset(edit: boolean) {
        this.setState({edit}, () => this.setState({value: this.calculateString(this.state.edit, this.props.value)}));
    }

    abstract calculateValue(str: string): T;
    abstract calculateString(edit: boolean, value: T): string;
};
