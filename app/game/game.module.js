import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import GameComponent from "game/game.component";
import gameRouteConfig from "game/game.route.config";

export default angular
    .module("app.game", [
        CoreModule.name,
        WidgetsModule.name])
    .component("game", GameComponent)
    .config(gameRouteConfig);
