import * as React from "react";

import * as Cache from "../state-machine/cache";
import * as Widget from "../state-machine/widget";


export interface State extends Widget.Widget<any> {
    $id: string;
}

export class Component extends React.Component<{}, State> implements Widget.RootComponent {
    constructor(prop: any) {
        super(prop);
        let view = Cache.CACHE.get(Component.getParameterByName("view"));
        let state = JSON.parse(view.json);
        state.$id = Component.getParameterByName("id");
        this.state = state;
    }

    render() {
        let prop = Cache.CACHE.evaluateState(this.state.$id, this.state.$prop);
        return Widget.CONFIG.registry[this.state.$widget](prop) as React.ReactElement<any>;
    }

    refresh() {
        this.forceUpdate();
    }

    static getParameterByName(name: string): string {
        let url = window.location.href;

        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
};
