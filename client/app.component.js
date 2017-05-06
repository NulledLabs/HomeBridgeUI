System.register(["@angular/core", "@angular/http", "ng-semantic", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1, ng_semantic_1;
    var AppComponent;
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
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.http = http;
                    this.appName = "Angular 2 Express";
                    this.user = {
                        password: "angualr2express",
                        username: "john"
                    };
                    this.isLogged = !!localStorage.getItem("id_token");
                }
                AppComponent.prototype.signup = function () {
                    var _this = this;
                    this.http.post("/login/signup", JSON.stringify({ password: this.user.password, username: this.user.username }), new http_1.RequestOptions({
                        headers: new http_1.Headers({ "Content-Type": "application/json" })
                    }))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        _this.response = res;
                    }, function (error) { console.log(error); });
                };
                AppComponent.prototype.login = function () {
                    var _this = this;
                    this.http.post("/login", JSON.stringify({ password: this.user.password }), new http_1.RequestOptions({
                        headers: new http_1.Headers({ "Content-Type": "application/json" })
                    }))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        localStorage.setItem("id_token", res.jwt);
                        _this.isLogged = true;
                        _this.myPopup.hide();
                    }, function (error) { console.log(error); });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    this.isLogged = false;
                };
                __decorate([
                    core_1.ViewChild("myPopup"), 
                    __metadata('design:type', ng_semantic_1.SemanticPopupComponent)
                ], AppComponent.prototype, "myPopup", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "\n<div class=\"ui container\">\n    <nav class=\"ui menu inverted teal huge\">\n        <a routerLink=\"home\" class=\"item\">Home</a>\n        <a routerLink=\"plugins\" class=\"item\">Plugins</a>\n        <a routerLink=\"contact\" class=\"item\">Contact Me</a>\n        \n        <nav class=\"menu right\">\n            <a class=\"bottom attached fluid primary\" (click)=\"signup()\" class=\"item\">Signup</a>\n            <a (click)=\"myPopup.show($event, {position: 'right center'})\" *ngIf=\"!isLogged\" class=\"item\">Login</a>\n            <a (click)=\"logout()\" *ngIf=\"isLogged\" class=\"item inverted red\">Logout</a>\n        </nav>\n    </nav>\n    \n    <sm-popup class=\"huge\" #myPopup>\n        <sm-card class=\"card basic\">\n            <card-title> Simple login </card-title>\n            <card-subtitle>  </card-subtitle>\n            <card-content>\n                <p><b>Password</b>: angualr2express</p>\n                <p><b>Username</b>: john</p>\n            </card-content>\n            \n            <sm-button class=\"bottom attached fluid primary\" *ngIf=\"!isLogged\" (click)=\"login()\">Login</sm-button>\n            <sm-button class=\"bottom attached fluid red\" *ngIf=\"isLogged\" (click)=\"logout()\">Logout</sm-button>\n        </sm-card>\n    </sm-popup>\n        \n    <hello [name]=\"appName\"></hello>\n    \n    <div class=\"ui divider\"></div>\n    \n    <router-outlet></router-outlet>\n    \n    <sm-segment *ngIf=\"response\">\n        <div style=\"word-break: break-all\"><b>Hashed:</b> {{response?.hashed}}</div>\n        <div class=\"ui divider\"></div>\n        <div style=\"word-break: break-all\"><b>Salt:</b> {{response?.salt}}</div>\n    </sm-segment>\n    \n    <div class=\"center\">\n        <img src='https://angular.io/resources/images/logos/standard/shield-large.png'>\n    </div>\n    \n</div>"
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map