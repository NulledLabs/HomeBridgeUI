System.register(['@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: '', redirectTo: 'home', pathMatch: 'full' }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forRoot(routes, { useHash: true }));
        }
    }
});
//# sourceMappingURL=routes.js.map