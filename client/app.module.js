System.register(['@angular/core', '@angular/platform-browser', "angular2-jwt", "@angular/http", "ng-semantic", './app.component', "./routes", "./components/shared/hello.component", "./modules/contact/contact.module", "./modules/home/home.module", "./modules/plugins/plugins.module"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, angular2_jwt_1, http_1, ng_semantic_1, app_component_1, routes_1, hello_component_1, contact_module_1, home_module_1, plugins_module_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng_semantic_1_1) {
                ng_semantic_1 = ng_semantic_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (hello_component_1_1) {
                hello_component_1 = hello_component_1_1;
            },
            function (contact_module_1_1) {
                contact_module_1 = contact_module_1_1;
            },
            function (home_module_1_1) {
                home_module_1 = home_module_1_1;
            },
            function (plugins_module_1_1) {
                plugins_module_1 = plugins_module_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            http_1.HttpModule,
                            ng_semantic_1.NgSemanticModule,
                            contact_module_1.ContactModule,
                            home_module_1.HomeModule,
                            plugins_module_1.PluginsModule,
                            routes_1.routing
                        ],
                        providers: [
                            angular2_jwt_1.provideAuth({
                                globalHeaders: [{ "Content-type": "application/json" }],
                                noJwtError: true,
                                noTokenScheme: true
                            })
                        ],
                        declarations: [hello_component_1.HelloComponent, app_component_1.AppComponent],
                        bootstrap: [app_component_1.AppComponent],
                        schemas: [
                            core_1.CUSTOM_ELEMENTS_SCHEMA
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map