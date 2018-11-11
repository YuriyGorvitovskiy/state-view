import * as Action from "../../../../../src/ts/main/state-machine/action";
import * as ChangeAttribute from "./change-attribute";
import * as Delete from "./delete";
import * as Insert from "./insert";

export function register() {
    Action.REGISTRY[ChangeAttribute.ACTION] = ChangeAttribute.execute;
    Action.REGISTRY[Delete.ACTION] = Delete.execute;
    Action.REGISTRY[Insert.ACTION] = Insert.execute;
}
