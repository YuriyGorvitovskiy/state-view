import * as Action from "../../state-machine/action";
import * as ChangeAttribute from "./change-attribute";

export function register() {
    Action.REGISTRY[ChangeAttribute.ACTION] = ChangeAttribute.execute;
}
