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
var CreateFlightComponent = (function () {
    function CreateFlightComponent(flightService, destinationService) {
        this.flightService = flightService;
        this.destinationService = destinationService;
        this.flight = {
            id: 0,
            name: '',
            dateOfDeparture: '',
            distance: 0,
            price: 0,
            numberOfSeats: 0,
            from: 0,
            to: 0
        };
    }
    CreateFlightComponent.prototype.ngOnInit = function () {
        var _this = this;
        var getAllDestinationsRequest = {
            sorting: {
                fieldName: 'name',
                direction: sort_direction_1.SortDirection.Asc
            },
            pageNumber: -1
        };
        this.destinationService.getDestinationsList(getAllDestinationsRequest).then(function (response) { return _this.destinations = response.destinations; });
    };
    CreateFlightComponent.prototype.onSubmit = function () {
        var _this = this;
        this.requestStatus = request_status_1.RequestStatus.PENDING;
        if (this.flight.from === this.flight.to) {
            this.requestStatus = request_status_1.RequestStatus.ERROR;
            this.requestError = "'To' and 'From' fields have equal values";
        }
        else {
            this.flightService.createFlight(this.flight).then(function (flight) {
                _this.requestStatus = request_status_1.RequestStatus.OK;
                _this.flight = flight;
            }).catch(function (err) {
                _this.requestStatus = request_status_1.RequestStatus.ERROR;
                _this.requestError = err;
                console.log(err);
            });
        }
    };
    CreateFlightComponent = __decorate([
        core_1.Component({
            selector: 'create-flight',
            templateUrl: 'create-flight.component.html'
        })
    ], CreateFlightComponent);
    return CreateFlightComponent;
}());
exports.CreateFlightComponent = CreateFlightComponent;
