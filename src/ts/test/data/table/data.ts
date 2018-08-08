import * as Registry from "./registry";

export const list1_id = "list:1";

export const item1_id = "item:1";
export const item2_id = "item:2";
export const item3_id = "item:3";


Registry.cache.set({
    id: list1_id,
    name: "List 1",
    "^item:list_id": [item1_id, item2_id, item3_id],
});
Registry.cache.set({
    id: item1_id,
    name: "Item 1",
    list_id: list1_id,
    boolean: true,
    number: 123.45,
    string: "First"
});
Registry.cache.set({
    id: item2_id,
    name: "Item 2",
    list_id: list1_id,
    boolean: false,
    number: 234.56,
    string: "Second"
});
Registry.cache.set({
    id: item3_id,
    name: "Item 3",
    list_id: list1_id,
    boolean: true,
    number: 345.67,
    string: "Third"
});
