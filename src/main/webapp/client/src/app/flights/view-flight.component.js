"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ViewFlightComponent = (function () {
    function ViewFlightComponent(flightService, destinationService, route, location, router) {
        this.flightService = flightService;
        this.destinationService = destinationService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    ViewFlightComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.flightService.getFlight(+params['id']); })
            .subscribe(function (flight) {
            _this.flight = flight;
            // Setting names for our destinations
            _this.findDestinationById(flight.to).then(function (name) { return _this.destToName = name; });
            _this.findDestinationById(flight.from).then(function (name) { return _this.destFromName = name; });
        });
    };
    ViewFlightComponent.prototype.findDestinationById = function (id) {
        return this.destinationService.getDestination(id).then(function (dest) { return dest.name; });
    };
    ViewFlightComponent = __decorate([
        core_1.Component({
            selector: 'view-flight',
            templateUrl: 'view-flight.component.html'
        })
    ], ViewFlightComponent);
    return ViewFlightComponent;
}());
exports.ViewFlightComponent = ViewFlightComponent;
