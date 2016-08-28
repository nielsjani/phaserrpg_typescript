import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutShellModule from "layout/shell/layout.shell.module";
import LayoutHeaderModule from "layout/header/layout.header.module";
import LayoutBodyModule from "layout/body/layout.body.module";
import LayoutFooterModule from "layout/footer/layout.footer.module";

export default angular
    .module("app.layout", [
        CoreModule.name,
        WidgetsModule.name,
        LayoutShellModule.name,
        LayoutHeaderModule.name,
        LayoutBodyModule.name,
        LayoutFooterModule.name
    ]);
