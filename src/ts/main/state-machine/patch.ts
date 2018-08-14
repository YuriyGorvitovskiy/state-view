import {Entity} from "./cache";

export interface Patch {
    insert?: Entity[],
    update?: Entity[],
    delete?: string[],
}
