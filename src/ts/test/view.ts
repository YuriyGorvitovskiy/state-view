import {Cache} from "../main/cache";
import {Path} from '../main/path';
import {View} from "../main/View";
import {Prop, Widget} from "../main/widget";


import { expect } from 'chai';
import 'mocha';

describe('Check View class', () => {
    const cache = new Cache();
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

    abstract class Component<P> {
        public prop: P;
        public abstract render(): string;
    };

    function generateWidget<P extends Prop>(id: string, view: View<P>): Component<P> {
        const component = new view.widget() as any as Component<P>;
        component.prop = cache.evaluateState(id, view.request) as any as P;
        return component;
    }

    interface ItemProp extends Prop {
        value: string;
    };

    class ItemWidget extends Component<ItemProp> implements Widget<ItemProp> {
        public render(): string {
            return "<li>" + this.prop.value + "</li>";
        }
    };

    const item_view_id = "item_view";
    const item_view: View<ItemProp> = {
        id: item_view_id,
        widget: ItemWidget,
        request: {
            $id: null,
            value: new Path("name")
        }
    };

    interface ListProp extends Prop {
        items: ItemProp[];
    };

    class ListWidget extends Component<ListProp> implements Widget<ListProp> {
        public render(): string {
            let buffer = "<ul>";
            for (const item of this.prop.items) {
                const child = new ItemWidget();
                child.prop = item;
                buffer += child.render();
            }
            return buffer + "</ul>";
        }
    };

    const list_view_id = "list_view";
    const list_view: View<ListProp> = {
        id: list_view_id,
        widget: ListWidget,
        request: {
            $id: null,
            items: {
                $id: new Path("^item:list_id"),
                value: new Path("name"),
            }
        }
    };

    it('item_view renders correctly', () => {
        // Execute
        const actual = generateWidget(item1_id, item_view);

        // Verify
        expect(actual.render()).to.be.deep.equal("<li>Item 1</li>");
    });

    it('list_view renders correctly', () => {
        // Execute
        const actual = generateWidget(list1_id, list_view);

        // Verify
        expect(actual.render()).to.be.deep.equal("<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
    });
});
