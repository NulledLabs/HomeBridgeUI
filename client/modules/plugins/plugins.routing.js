System.register(['@angular/router', './plugins.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, plugins_component_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (plugins_component_1_1) {
                plugins_component_1 = plugins_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: 'plugins', component: plugins_component_1.PluginsComponent }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forChild(routes));
        }
    }
});
//# sourceMappingURL=plugins.routing.js.map