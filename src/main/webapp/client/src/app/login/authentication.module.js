"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var authentication_admin_guard_1 = require("./authentication-admin.guard");
var authentication_guard_1 = require("./authentication.guard");
var authentication_service_1 = require("./authentication.service");
var router_1 = require("@angular/router");
var authentication_component_1 = require("./authentication.component");
var shared_module_1 = require("../shared/shared.module");
var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'login',
                        component: authentication_component_1.AuthenticationComponent
                    }
                ])],
            declarations: [authentication_component_1.AuthenticationComponent],
            providers: [authentication_service_1.AuthenticationService, authentication_guard_1.AuthenticationGuard, authentication_admin_guard_1.AuthenticationAdminGuard],
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());
exports.AuthenticationModule = AuthenticationModule;
