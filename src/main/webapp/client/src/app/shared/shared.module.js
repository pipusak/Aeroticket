"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Ruslan on 16.12.2016.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var request_status_notification_component_1 = require("./request-status-notification.component");
var pagination_component_1 = require("./pagination.component");
var destination_service_1 = require("../destination/destination.service");
var confirm_delete_component_1 = require("./confirm-delete.component");
var flights_service_1 = require("../flights/flights.service");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule],
            declarations: [request_status_notification_component_1.RequestStatusNotificationComponent, pagination_component_1.PaginationComponent, confirm_delete_component_1.ConfirmDeleteComponent],
            exports: [common_1.CommonModule, forms_1.FormsModule, request_status_notification_component_1.RequestStatusNotificationComponent, pagination_component_1.PaginationComponent, confirm_delete_component_1.ConfirmDeleteComponent],
            providers: [flights_service_1.FlightService, destination_service_1.DestinationService]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
