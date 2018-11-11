import {CACHE} from "../../../../src/ts/main/state-machine/cache";
import {APPLICATION} from "./view/application";

export const view_application_id = "view:application";

export const list1_id = "list:1";
export const list2_id = "list:2";

export const item1_id = "item:1";
export const item2_id = "item:2";
export const item3_id = "item:3";
export const item4_id = "item:4";
export const item5_id = "item:5";
export const item6_id = "item:6";
export const item7_id = "item:7";

export function initialize() {
    CACHE.set({
        id: view_application_id,
        json: JSON.stringify(APPLICATION)
    });
    CACHE.set({
        id: list1_id,
        name: "List 1",
        "^item:list_id": [item1_id, item2_id, item3_id],
    });
    CACHE.set({
        id: list2_id,
        name: "List 2",
        "^item:list_id": [item4_id, item5_id, item6_id, item7_id],
    });
    CACHE.set({
        id: item1_id,
        name: "Item 1",
        list_id: list1_id,
        boolean: true,
        number: 123.45,
        string: "First"
    });
    CACHE.set({
        id: item2_id,
        name: "Item 2",
        list_id: list1_id,
        boolean: false,
        number: 234.56,
        string: "Second"
    });
    CACHE.set({
        id: item3_id,
        name: "Item 3",
        list_id: list1_id,
        boolean: true,
        number: 345.67,
        string: "Third"
    });
    CACHE.set({
        id: item4_id,
        name: "Item 4",
        list_id: list2_id,
        boolean: true,
        number: 456.78,
        string: "Fourth"
    });
    CACHE.set({
        id: item5_id,
        name: "Item 5",
        list_id: list2_id,
        boolean: false,
        number: 567.89,
        string: "Fifth"
    });
    CACHE.set({
        id: item6_id,
        name: "Item 6",
        list_id: list2_id,
        boolean: false,
        number: 678.90,
        string: "Sixth"
    });
    CACHE.set({
        id: item7_id,
        name: "Item 7",
        list_id: list2_id,
        boolean: true,
        number: 789.01,
        string: "Seventh"
    });
}
