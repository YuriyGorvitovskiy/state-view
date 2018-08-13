import * as React from "react";
import * as ReactDOM from "react-dom";

import * as ActionImpl from "./app/action/all";
import * as Data from "./app/init-data";
import * as Cache from "./state-machine/cache";
import * as Widget from "./state-machine/widget";
import * as WidgetImpl from "./widget-react/registry";

WidgetImpl.register();
ActionImpl.register();

Data.initialize();

WidgetImpl.start();
