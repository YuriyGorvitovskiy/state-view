
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

    constructor(str: string) {
        this.links = parse(str);
    }

    isEmpty(): boolean {
        return 0 == this.links.length;
    }
}

function parse(str: string): Link[] {
    let links = [];
    if (!str) {
        return links;
    }

    let steps = str.split('.');
    for(let step of steps) {
        let parts = step.split('@');
        let link = new Link(parts[0], parts[1]);
        links.push(link);
    }
    return links;
}
