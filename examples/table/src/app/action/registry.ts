import * as Action from "../../../../../src/ts/main/state-machine/action";
import * as ChangeAttribute from "./change-attribute";
import * as Delete from "./delete";

export function register() {
    Action.REGISTRY[ChangeAttribute.ACTION] = ChangeAttribute.execute;
    Action.REGISTRY[Delete.ACTION] = Delete.execute;
}
