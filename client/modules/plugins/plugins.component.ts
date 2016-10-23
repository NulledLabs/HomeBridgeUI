import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { FormComponent, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";
import { SemanticPopupComponent } from "ng-semantic";

@Component({
    selector: "plugins",
    templateUrl: `client/modules/plugins/plugins.component.html`,
    providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}]
})
export class PluginsComponent {
    error: string;
    response: {};
    plugins: Array<any>;
    selectedSchema: {};
    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService
            .get("http://localhost:51828/plugins")
            .subscribe(
                (data) => { this.plugins = data.Plugins; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }
    protected() {
        this.apiService
            .get("/api")
            .subscribe(
                (data) => { this.response = data; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }

    showPopup(myPopup, $event, plugin){
        this.selectedSchema = plugin.Schema;
        myPopup.show($event, {position: 'left center'});
    }
}
