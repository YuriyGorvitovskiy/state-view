
export class Link {
    readonly field: string;

    constructor(field: string) {
        this.field = field;
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
        let link = new Link(step);
        links.push(link);
    }
    return links;
}
