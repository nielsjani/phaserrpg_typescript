import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutFooterComponent from "layout/footer/layout.footer.component";

export default angular
    .module("app.layout.footer", [CoreModule.name, WidgetsModule.name])
    .component("layoutfooter", LayoutFooterComponent);
