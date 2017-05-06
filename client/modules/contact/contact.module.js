System.register(['@angular/core', "@angular/http", "ng-semantic", "./home/home.component", "./contact.routing", "../shared/shared.module", "./form/form.component", "./profile/profile.component"], function(exports_1, context_1) {
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
    var core_1, http_1, ng_semantic_1, home_component_1, contact_routing_1, shared_module_1, form_component_1, profile_component_1;
    var ContactModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng_semantic_1_1) {
                ng_semantic_1 = ng_semantic_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (contact_routing_1_1) {
                contact_routing_1 = contact_routing_1_1;
            },
            function (shared_module_1_1) {
                shared_module_1 = shared_module_1_1;
            },
            function (form_component_1_1) {
                form_component_1 = form_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            }],
        execute: function() {
            ContactModule = (function () {
                function ContactModule() {
                }
                ContactModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            http_1.HttpModule,
                            ng_semantic_1.NgSemanticModule,
                            contact_routing_1.routing,
                            shared_module_1.SharedModule.forRoot()
                        ],
                        exports: [profile_component_1.ProfileComponent],
                        declarations: [home_component_1.ContactComponent, form_component_1.FormComponent, profile_component_1.ProfileComponent],
                        bootstrap: [home_component_1.ContactComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContactModule);
                return ContactModule;
            }());
            exports_1("ContactModule", ContactModule);
        }
    }
});
//# sourceMappingURL=contact.module.js.map