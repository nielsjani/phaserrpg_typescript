import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutModule from "layout/layout.module";
import WelcomeModule from "welcome/welcome.module";
import GameModule from "game/game.module";

import defaultRouteConfig from "app.route.config";
import cacheTemplates from "app.templates.run";

export default angular
    .module("app", [
        /* shared modules */
        CoreModule.name,
        WidgetsModule.name,

        /* feature areas */
        LayoutModule.name,
        WelcomeModule.name,
        GameModule.name
    ])
    .config(defaultRouteConfig)
    .run(cacheTemplates);

