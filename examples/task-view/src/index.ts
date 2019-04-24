import * as ActionImpl from "./app/action/registry";
import * as Data from "./app/data";
import * as WidgetImpl from "../../../src/ts/main/widget-react/registry";

ActionImpl.register();
WidgetImpl.register();

Data.initialize();

WidgetImpl.start();
