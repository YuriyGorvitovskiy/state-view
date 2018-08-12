import * as React from "react";
import * as ReactDOM from "react-dom";

import * as ActionImpl from "./config/action/all";
import * as Data from "./config/init-data";
import * as Cache from "./state-machine/cache";
import * as Widget from "./state-machine/widget";
import * as WidgetImpl from "./widget/all";

WidgetImpl.register();
ActionImpl.register();

Data.initialize();

WidgetImpl.start();
