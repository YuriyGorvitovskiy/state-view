import {ActionReq} from "../../state-machine/action";
import {Patch} from "../../state-machine/patch";
import {Field, Single} from "../../state-machine/request";
import {ValueReq, ValueProp} from "../../state-machine/widget";

export const ACTION = "change-attribite";

export interface ChangeAttributeReq<P> extends ValueReq<P> {
    attr:  Field<ChangeAttributeReq<P>, string>;
}
export interface ChangeAttributeProp<P> extends ValueProp<P> {
    $id: string
    attr:  string;
}

export function changeAttributeReq<T>(prop: Single<ChangeAttributeReq<T>>):  ActionReq<ChangeAttributeReq<T>> {
    return {
        $action: ACTION,
        $prop: prop
    };
}
export function changeAttribute<T>(prop: ChangeAttributeProp<T>): Patch {
    let update: any = {id: prop.$id};
    update[prop.attr] = prop.value;
    return {update: [update]};
}
