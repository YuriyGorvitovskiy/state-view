import * as Data from "./data/table/data";
import * as Registry from "./data/table/registry";
import * as Widget from "./data/table/widget";
import * as View from "./data/table/view";

import { expect } from 'chai';
import 'mocha';

describe('Check Table implementation', () => {
    Registry.Widgets.BOOLEAN_WIDGET = Widget.BooleanWidget;
    Registry.Widgets.NUMBER_WIDGET = Widget.NumberWidget;
    Registry.Widgets.STRING_WIDGET = Widget.StringWidget;
    Registry.Widgets.TABLE_WIDGET = Widget.TableWidget;


    function generateWidget(id: string, view: any): Widget.Component<any> {
        const component = new view.$widget() as Widget.Component<any>;
        component.prop = Registry.cache.evaluateState(id, view.$prop);
        return component;
    }

    it('View renders correctly', () => {
        // Execute
        const actual = generateWidget(Data.list1_id, View.TABLE_VIEW());

        // Verify
        expect(actual.render()).to.be.equal(
            "<tbl><head>"
                +"<col><str>Name</str></col>"
                +"<col><str>Boolean</str></col>"
                +"<col><str>Number</str></col>"
                +"<col><str>String</str></col>"
            +"</head><body>"
                +"<row><cell><str>Item 1</str></cell><cell><bool>ON</bool></cell><cell><num>123.45</nul></cell><cell><str>First</str></cell></row>"
                +"<row><cell><str>Item 2</str></cell><cell><bool>off</bool></cell><cell><num>234.56</nul></cell><cell><str>Second</str></cell></row>"
                +"<row><cell><str>Item 3</str></cell><cell><bool>ON</bool></cell><cell><num>345.67</nul></cell><cell><str>Third</str></cell></row>"
            +"</body></tbl>");
    });
});
