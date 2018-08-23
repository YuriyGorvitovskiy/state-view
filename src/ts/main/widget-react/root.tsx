import * as React from "react";

import * as Cache from "../state-machine/cache";
import * as Widget from "../state-machine/widget";


export interface State extends Widget.Request<any> {
    $id: string;
}

export class Component extends React.Component<{}, State>
                    implements Widget.RootComponent {

    constructor(prop: any) {
        super(prop);

        let view = Cache.CACHE.get(Component.getParameterByName("view", "view:table"));
        let state = JSON.parse(view.json);
        state.$id = Component.getParameterByName("id", "list:1");
        this.state = state;
    }

    render() {
        let prop = Cache.CACHE.evaluateState(this.state.$id, this.state.$props);
        return Widget.REGISTRY[this.state.$widget](prop) as React.ReactElement<any>;
    }

    refresh() {
        this.forceUpdate();
    }

    static getParameterByName(name: string, def: string): string {
        let url = window.location.href;

        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);
        if (!results) return def;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));

    }
};
