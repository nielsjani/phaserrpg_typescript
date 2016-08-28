import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutBodyComponent from "layout/body/layout.body.component";

export default angular
    .module("app.layout.body", [CoreModule.name, WidgetsModule.name])
    .component("layoutbody", LayoutBodyComponent);
