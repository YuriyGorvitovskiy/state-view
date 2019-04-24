import {CACHE} from "../../../../src/ts/main/state-machine/cache";
import {APPLICATION} from "./view/application";

export const view_application_id = "view:application";

export const context_id = "context:1"

export const task1_id = "task:1";
export const task2_id = "task:2";
export const task3_id = "task:3";

export const view1_id = "view:1";
export const view2_id = "view:2";
export const view3_id = "view:3";

export const view4_id = "view:4";
export const view5_id = "view:5";

export const view6_id = "view:6";

export function initialize() {
    CACHE.set({
        id: view_application_id,
        json: JSON.stringify(APPLICATION)
    });
    CACHE.set({
        id: context_id,
        "^task:context_id": [task1_id, task2_id, task3_id],
        select_task_id: task1_id,
        select_view_id: view1_id,
    });
    CACHE.set({
        id: task1_id,
        name: "Task 1",
        "^view:task_id": [view1_id, view2_id, view3_id],
        context_id: context_id
    });
    CACHE.set({
        id: task2_id,
        name: "List 2",
        "^view:task_id": [view4_id, view5_id],
        context_id: context_id
    });
    CACHE.set({
        id: task3_id,
        name: "List 3",
        "^view:task_id": [view6_id],
        context_id: context_id
    });
    CACHE.set({
        id: view1_id,
        label: "View 1",
        content: "Task 1, View 1",
        task_id: task1_id
    });
    CACHE.set({
        id: view2_id,
        label: "View 2",
        content: "Task 1, View 2",
        task_id: task1_id
    });
    CACHE.set({
        id: view3_id,
        label: "View 3",
        content: "Task 1, View 3",
        task_id: task1_id
    });
    CACHE.set({
        id: view4_id,
        label: "View 4",
        content: "Task 1, View 4",
        task_id: task2_id
    });
    CACHE.set({
        id: view5_id,
        label: "View 5",
        content: "Task 1, View 5",
        task_id: task2_id
    });
    CACHE.set({
        id: view6_id,
        label: "View 6",
        content: "Task 1, View 6",
        task_id: task3_id
    });

}
