"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Ruslan on 15.12.2016.
 */
var core_1 = require("@angular/core");
var request_status_1 = require("../shared/request-status");
var EditDestinationComponent = (function () {
    function EditDestinationComponent(destinationService, route, location, router) {
        this.destinationService = destinationService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    EditDestinationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.destinationService.getDestination(+params['id']); })
            .subscribe(function (destination) { return _this.destination = destination; });
    };
    EditDestinationComponent.prototype.updateDestination = function () {
        var _this = this;
        this.requestStatus = request_status_1.RequestStatus.PENDING;
        this.destinationService.updateDestination(this.destination).then(function (dest) {
            _this.requestStatus = request_status_1.RequestStatus.OK;
            _this.destination = dest;
        }).catch(function (err) {
            _this.requestStatus = request_status_1.RequestStatus.ERROR;
            console.log("Error is: " + err);
        });
    };
    EditDestinationComponent = __decorate([
        core_1.Component({
            selector: 'edit-destination',
            templateUrl: 'edit-destination.component.html'
        })
    ], EditDestinationComponent);
    return EditDestinationComponent;
}());
exports.EditDestinationComponent = EditDestinationComponent;
