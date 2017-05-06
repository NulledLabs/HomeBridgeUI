System.register(['@angular/router', './home/home.component', "./form/form.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, form_component_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (form_component_1_1) {
                form_component_1 = form_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: 'contact', component: home_component_1.ContactComponent, pathMatch: "full" },
                { path: 'contact/form', component: form_component_1.FormComponent }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forChild(routes));
        }
    }
});
//# sourceMappingURL=contact.routing.js.map