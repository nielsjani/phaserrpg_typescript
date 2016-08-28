import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutHeaderComponent from "layout/header/layout.header.component";

export default angular
    .module("app.layout.header", [CoreModule.name, WidgetsModule.name])
    .component("layoutheader", LayoutHeaderComponent);
