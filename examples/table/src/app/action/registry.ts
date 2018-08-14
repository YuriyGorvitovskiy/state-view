import * as Action from "../../../../../src/ts/main/state-machine/action";
import * as ChangeAttribute from "./change-attribute";

export function register() {
    Action.REGISTRY[ChangeAttribute.ACTION] = ChangeAttribute.execute;
}
