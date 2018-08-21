export abstract class Component<P> {

    public props: P;

    public constructor(props: P) {
        this.props = props;
    }

    public abstract render(): string;
};