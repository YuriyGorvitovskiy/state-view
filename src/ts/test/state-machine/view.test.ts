import * as Cache from "../../main/state-machine/cache";
import * as Request from "../../main/state-machine/request";
import * as Widget from "../../main/state-machine/widget";

import * as BulletedList from "../../main/widget/bulleted-list";
import * as ValueString from "../../main/widget/value-string";

import * as TestBulletedList from "./widget/bulleted-list";
import * as TestValueString from "./widget/value-string";
import * as TestWidget from "./widget/test-widget";


describe('Check View class', () => {
    const cache = Cache.CACHE;
    const list1_id = "list:1";
    const item1_id = "item:1";
    const item2_id = "item:2";
    const item3_id = "item:3";

    cache.set({
        id: list1_id,
        name: "List 1",
        "^item:list_id": [item1_id, item2_id, item3_id],
    });
    cache.set({
        id: item1_id,
        name: "Item 1",
        list_id: list1_id,
    });
    cache.set({
        id: item2_id,
        name: "Item 2",
        list_id: list1_id,
    });
    cache.set({
        id: item3_id,
        name: "Item 3",
        list_id: list1_id,
    });

    Widget.REGISTRY[BulletedList.WIDGET] = (props: any) => new TestBulletedList.Component(props);
    Widget.REGISTRY[ValueString.WIDGET] = (props: any) => new TestValueString.Component(props);


    function generateWidget(id: string, widget: string, request: Request.Single<any>): TestWidget.Component<any> {
        const props = cache.evaluateState(id, request) as any;
        return Widget.REGISTRY[widget](props) as TestWidget.Component<any>;
    }

    it('item_view renders correctly', () => {
        // Setup
        const item_view: ValueString.Request = {
            value: Request.path("name")
        };

        // Execute
        const actual = generateWidget(item1_id, ValueString.WIDGET, item_view);

        // Verify
        expect(actual.render()).toEqual("<span>Item 1</span>");
    });

    it('list_view renders correctly', () => {
        // Setup
        const list_view: BulletedList.Request = {
            items: {
                $id: Request.path("^item:list_id"),
                $widget: ValueString.WIDGET,
                $props: {
                    value: Request.path("name"),
                }
            }
        };

        // Execute
        const actual = generateWidget(list1_id, BulletedList.WIDGET, list_view);

        // Verify
        expect(actual.render()).toEqual("<ul><li><span>Item 1</span></li><li><span>Item 2</span></li><li><span>Item 3</span></li></ul>");
    });
});
