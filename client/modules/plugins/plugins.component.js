System.register(["@angular/core", "../../service/api.service", "angular2-schema-form"], function(exports_1, context_1) {
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
    var core_1, api_service_1, angular2_schema_form_1;
    var PluginsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (angular2_schema_form_1_1) {
                angular2_schema_form_1 = angular2_schema_form_1_1;
            }],
        execute: function() {
            PluginsComponent = (function () {
                function PluginsComponent(apiService) {
                    this.apiService = apiService;
                    this.fieldValidators = {};
                    this.actions = {};
                    this.schema = (function () {
                        try {
                            return require("./sampleschema.json");
                        }
                        catch (e) {
                            console.log(e);
                        }
                    })();
                    this.model = (function () {
                        try {
                            return require("./samplemodel.json");
                        }
                        catch (e) {
                            console.log(e);
                        }
                    })();
                    this.fieldValidators["/bornOn"] = function (value, property, form) {
                        var errors = null;
                        var dateArr = value.split("-");
                        if (dateArr.length === 3) {
                            var now = new Date();
                            var min = new Date(now.getFullYear() - 100, now.getMonth(), now.getDay()).getTime();
                            var max = new Date().getTime();
                            var born = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]).getTime();
                            if (born < min || born > max) {
                                errors = [{ "bornOn": { "expectedValue": ">today - 100 && < today", "actualValue": value } }];
                            }
                        }
                        return errors;
                    };
                    this.fieldValidators["/promotion"] = function (value, property, form) {
                        if (value === "student") {
                            var bornOn = form.getProperty("/bornOn");
                            if (bornOn.valid) {
                                var date = bornOn.value.split("-");
                                var validYear = new Date().getFullYear() - 17;
                                try {
                                    var actualYear = parseInt(date[0]);
                                    if (actualYear < validYear) {
                                        return null;
                                    }
                                    return [{ "promotion": { "bornOn": { "expectedValue": "year<" + validYear, "actualValue": actualYear } } }];
                                }
                                catch (e) { }
                            }
                            return [{ "promotion": { "bornOn": { "expectedFormat": "date", "actualValue": bornOn.value } } }];
                        }
                        return null;
                    };
                    this.actions["alert"] = function (property, options) {
                        alert(JSON.stringify(property.value));
                    };
                    this.actions["reset"] = function (form, options) {
                        form.reset();
                    };
                    this.actions["addItem"] = function (property, parameters) {
                        property.addItem(parameters.value);
                    };
                }
                PluginsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.apiService
                        .get("http://localhost:51828/plugins")
                        .subscribe(function (data) { _this.plugins = data.Plugins; }, function (error) {
                        _this.error = error.message;
                        setTimeout(function () { return _this.error = null; }, 4000);
                    });
                };
                PluginsComponent.prototype.protected = function () {
                    var _this = this;
                    this.apiService
                        .get("/api")
                        .subscribe(function (data) { _this.response = data; }, function (error) {
                        _this.error = error.message;
                        setTimeout(function () { return _this.error = null; }, 4000);
                    });
                };
                PluginsComponent.prototype.showPopup = function (myPopup, $event, plugin) {
                    this.selectedSchema = plugin.Schema;
                    myPopup.show($event, { position: 'left center' });
                };
                PluginsComponent = __decorate([
                    core_1.Component({
                        selector: "plugins",
                        templateUrl: "client/modules/plugins/plugins.component.html",
                        providers: [{ provide: angular2_schema_form_1.WidgetRegistry, useClass: angular2_schema_form_1.DefaultWidgetRegistry }]
                    }), 
                    __metadata('design:paramtypes', [api_service_1.ApiService])
                ], PluginsComponent);
                return PluginsComponent;
            }());
            exports_1("PluginsComponent", PluginsComponent);
        }
    }
});
//# sourceMappingURL=plugins.component.js.map