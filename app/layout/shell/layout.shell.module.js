import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutShellComponent from "layout/shell/layout.shell.component";

export default angular
    .module("app.layout.shell", [CoreModule.name, WidgetsModule.name])
    .component("layoutshell", LayoutShellComponent);
