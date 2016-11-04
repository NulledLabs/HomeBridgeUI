import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { PluginsComponent } from "./plugins.component";
import { routing } from "./plugins.routing";
import { SharedModule } from "../shared/shared.module";
import { ContactModule } from "../contact/contact.module";
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule,
        ContactModule
        , SchemaFormModule
    ],
    declarations: [
        PluginsComponent
    ],
    bootstrap: [
        PluginsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class PluginsModule { }