"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var request_status_1 = require("./request-status");
var RequestStatusNotificationComponent = (function () {
    function RequestStatusNotificationComponent() {
    }
    RequestStatusNotificationComponent.prototype.getRequestStatusList = function () {
        return request_status_1.RequestStatus;
    };
    __decorate([
        core_1.Input()
    ], RequestStatusNotificationComponent.prototype, "requestStatus", void 0);
    RequestStatusNotificationComponent = __decorate([
        core_1.Component({
            selector: 'request-status-notification',
            templateUrl: 'request-status-notification.component.html',
            styleUrls: ['request-status-notification.component.css']
        })
    ], RequestStatusNotificationComponent);
    return RequestStatusNotificationComponent;
}());
exports.RequestStatusNotificationComponent = RequestStatusNotificationComponent;
