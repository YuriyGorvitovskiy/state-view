import * as Action from "../../../../../src/ts/main/state-machine/action";
import * as Select from "./select";

export function register() {
    Action.REGISTRY[Select.ACTION] = Select.execute;
}
