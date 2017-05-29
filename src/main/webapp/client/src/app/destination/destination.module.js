"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var destination_component_1 = require("./destination.component");
var destination_detail_component_1 = require("./destination-detail.component");
var create_destination_component_1 = require("./create-destination.component");
var edit_destination_component_1 = require("./edit-destination.component");
var shared_module_1 = require("../shared/shared.module");
var authentication_admin_guard_1 = require("../login/authentication-admin.guard");
var DestinationModule = (function () {
    function DestinationModule() {
    }
    DestinationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'destination/create',
                        component: create_destination_component_1.CreateDestinationComponent,
                        canActivate: [authentication_admin_guard_1.AuthenticationAdminGuard]
                    },
                    {
                        path: 'destination/:id/edit',
                        component: edit_destination_component_1.EditDestinationComponent,
                        canActivate: [authentication_admin_guard_1.AuthenticationAdminGuard]
                    },
                    {
                        path: 'destination/:id',
                        component: destination_detail_component_1.DestinationDetailComponent
                    },
                    {
                        path: 'destination',
                        component: destination_component_1.DestinationComponent
                    }
                ])
            ],
            declarations: [destination_component_1.DestinationComponent, destination_detail_component_1.DestinationDetailComponent, create_destination_component_1.CreateDestinationComponent, edit_destination_component_1.EditDestinationComponent]
        })
    ], DestinationModule);
    return DestinationModule;
}());
exports.DestinationModule = DestinationModule;
