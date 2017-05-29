"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Core
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var router_1 = require("@angular/router");
// Components
var flights_component_1 = require("./flights.component");
var create_flight_component_1 = require("./create-flight.component");
var view_flight_component_1 = require("./view-flight.component");
var update_flight_component_1 = require("./update-flight.component");
var authentication_admin_guard_1 = require("../login/authentication-admin.guard");
var FlightsModule = (function () {
    function FlightsModule() {
    }
    FlightsModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'flight/create',
                        component: create_flight_component_1.CreateFlightComponent,
                        canActivate: [authentication_admin_guard_1.AuthenticationAdminGuard]
                    },
                    {
                        path: 'flight/:id/edit',
                        component: update_flight_component_1.UpdateFlightComponent,
                        canActivate: [authentication_admin_guard_1.AuthenticationAdminGuard]
                    },
                    {
                        path: 'flight/:id',
                        component: view_flight_component_1.ViewFlightComponent
                    },
                    {
                        path: "flight",
                        component: flights_component_1.FlightsComponent
                    }
                ])],
            declarations: [flights_component_1.FlightsComponent, create_flight_component_1.CreateFlightComponent, view_flight_component_1.ViewFlightComponent, update_flight_component_1.UpdateFlightComponent],
        })
    ], FlightsModule);
    return FlightsModule;
}());
exports.FlightsModule = FlightsModule;
