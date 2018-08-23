import * as Cache from "../../main/state-machine/cache";
import * as Request from "../../main/state-machine/request";
import * as Widget from "../../main/state-machine/widget";

import * as BulletedList from "../../main/widget/bulleted-list";
import * as Table from "../../main/widget/table";
import * as ValueBoolean from "../../main/widget/value-boolean";
import * as ValueNumber from "../../main/widget/value-number";
import * as ValueString from "../../main/widget/value-string";

import * as TestBulletedList from "./widget/bulleted-list";
import * as TestTable from "./widget/table";
import * as TestValueBoolean from "./widget/value-boolean";
import * as TestValueNumber from "./widget/value-number";
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
        id: list1_id,
        name: "List 1",
        "^item:list_id": [item1_id, item2_id, item3_id],
    });
    cache.set({
        id: item1_id,
        name: "Item 1",
        list_id: list1_id,
        boolean: true,
        number: 123.45,
        string: "First"
    });
    cache.set({
        id: item2_id,
        name: "Item 2",
        list_id: list1_id,
        boolean: false,
        number: 234.56,
        string: "Second"
    });
    cache.set({
        id: item3_id,
        name: "Item 3",
        list_id: list1_id,
        boolean: true,
        number: 345.67,
        string: "Third"
    });

    Widget.REGISTRY[BulletedList.WIDGET] = (props: any) => new TestBulletedList.Component(props);
    Widget.REGISTRY[Table.WIDGET] = (props: any) => new TestTable.Component(props);
    Widget.REGISTRY[ValueBoolean.WIDGET] = (props: any) => new TestValueBoolean.Component(props);
    Widget.REGISTRY[ValueNumber.WIDGET] = (props: any) => new TestValueNumber.Component(props);
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
        expect(actual.render()).toEqual("<str>Item 1</str>");
    });

    it('list_view renders correctly', () => {
        // Setup
        const list_view = BulletedList.widget({
            items: {
                $id: Request.path("^item:list_id"),
                widget: ValueString.widget({value: Request.path("name")})
            }
        });

        // Execute
        const actual = generateWidget(list1_id, list_view.$widget, list_view.$props);

        // Verify
        expect(actual.render()).toEqual("<ul><li><str>Item 1</str></li><li><str>Item 2</str></li><li><str>Item 3</str></li></ul>");
    });

    it('table_view renders correctly', () => {
        // setup
        const table_view = Table.widget({
            columns: [{
                column: "name",
                widget: ValueString.widget({value: "Name"})
            },{
                column: "boolean",
                widget: ValueString.widget({value: "Boolean"})
            },{
                column: "number",
                widget: ValueString.widget({value: "Number"})
            },{
                column: "string",
                widget: ValueString.widget({value: "String"})
            }],
            rows: {
                $id: Request.path("^item:list_id"),
                items: [{
                        $id: null,
                        column: "name",
                        widget: ValueString.widget({value: Request.path("name")})
                    },{
                        $id: null,
                        column: "boolean",
                        widget: ValueBoolean.widget({value: Request.path("boolean")})
                    },{
                        $id: null,
                        column: "number",
                        widget: ValueNumber.widget({value: Request.path("number")})
                    },{
                        $id: null,
                        column: "string",
                        widget: ValueString.widget({value: Request.path("string")})
                    }]
                }
            });

        // Execute
        const actual = generateWidget(list1_id, table_view.$widget, table_view.$props);

        // Verify
        expect(actual.render()).toEqual(
            "<tbl><head>"
                +"<col><str>Name</str></col>"
                +"<col><str>Boolean</str></col>"
                +"<col><str>Number</str></col>"
                +"<col><str>String</str></col>"
            +"</head><body>"
                +"<row><cell><str>Item 1</str></cell><cell><bool>ON</bool></cell><cell><num>123.45</num></cell><cell><str>First</str></cell></row>"
                +"<row><cell><str>Item 2</str></cell><cell><bool>off</bool></cell><cell><num>234.56</num></cell><cell><str>Second</str></cell></row>"
                +"<row><cell><str>Item 3</str></cell><cell><bool>ON</bool></cell><cell><num>345.67</num></cell><cell><str>Third</str></cell></row>"
            +"</body></tbl>");
    });

});
