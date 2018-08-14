import {Function, Path, Field, Plural, Single} from "./request";

export interface Component<P> {
};

export interface RootComponent extends Component<any>{
    refresh: () => any;
};

export interface Request<P> {
    $widget: string,
    $props: Single<P>,
};

export type ComponentFactory<P> = (props: P) => Component<P>;
export const REGISTRY: {[widget: string]: ComponentFactory<any>} = {};

export let ROOT: RootComponent;
export function registerRootComponent(root: RootComponent ) {
    ROOT=root;
}
