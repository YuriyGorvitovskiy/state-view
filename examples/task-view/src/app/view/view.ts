import {path} from "../../../../../src/ts/main/state-machine/request";

import * as Value from "../../../../../src/ts/main/widget/value-string";
import * as Layout from "../../../../../src/ts/main/widget/layout-flow";

export const VIEW = Value.widget({
    value: path("select_view_id.content")
});
