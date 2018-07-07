
export class Link {
    readonly field: string;
    readonly target: string;

    constructor(field: string, target?: string) {
        this.field = field;
        this.target = target || null;
    }
}

export class Path {
    readonly links: Link[];

    constructor(links: Link[]) {
        this.links = links;
    }
}

export const parse = (str: string): Path => {
    let links = [];
    if (str) {
        let steps = str.split('.');
        for(let step of steps) {
            let parts = step.split('@');
            let link = new Link(parts[0], parts[1]);
            links.push(link);
        }
    }
    return new Path(links);
}
