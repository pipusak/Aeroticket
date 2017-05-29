"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var request_status_1 = require("../shared/request-status");
var sort_direction_1 = require("../model/sort-direction");
var UpdateFlightComponent = (function () {
    function UpdateFlightComponent(flightService, destinationService, route) {
        this.flightService = flightService;
        this.destinationService = destinationService;
        this.route = route;
    }
    UpdateFlightComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Setting our flight
        this.route.params
            .switchMap(function (params) { return _this.flightService.getFlight(+params['id']); })
            .subscribe(function (flight) {
            _this.flight = flight;
            // Timezone is not supported by HTML input datetime-local, so remove for ex. :00.000+0800 (12 symbols) from string
            _this.flight.dateOfDeparture = _this.flight.dateOfDeparture.slice(0, -12);
        });
        // Getting list of destionations
        var getAllDestinationsRequest = {
            sorting: {
                fieldName: 'name',
                direction: sort_direction_1.SortDirection.Asc
            },
            pageNumber: -1
        };
        this.destinationService.getDestinationsList(getAllDestinationsRequest).then(function (response) { return _this.destinations = response.destinations; });
    };
    UpdateFlightComponent.prototype.onSubmit = function () {
        var _this = this;
        this.requestStatus = request_status_1.RequestStatus.PENDING;
        if (this.flight.from === this.flight.to) {
            this.requestStatus = request_status_1.RequestStatus.ERROR;
        }
        else {
            this.flightService.updateFlight(this.flight.id, this.flight).then(function (flight) {
                _this.requestStatus = request_status_1.RequestStatus.OK;
                _this.flight = flight;
            }).catch(function (err) {
                _this.requestStatus = request_status_1.RequestStatus.ERROR;
            });
        }
    };
    UpdateFlightComponent = __decorate([
        core_1.Component({
            templateUrl: 'update-flight.component.html',
            selector: 'update-flight'
        })
    ], UpdateFlightComponent);
    return UpdateFlightComponent;
}());
exports.UpdateFlightComponent = UpdateFlightComponent;
