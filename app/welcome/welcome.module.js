import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import WelcomeComponent from "welcome/welcome.component";
import welcomeRouteConfig from "welcome/welcome.route.config";

export default angular
    .module("app.welcome", [
        CoreModule.name,
        WidgetsModule.name])
    .component("welcome", WelcomeComponent)
    .config(welcomeRouteConfig);
