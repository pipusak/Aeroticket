"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Ruslan on 29.12.2016.
 */
var core_1 = require("@angular/core");
var sort_direction_1 = require("../model/sort-direction");
var FlightsComponent = (function () {
    function FlightsComponent(flightService, destinationService) {
        this.flightService = flightService;
        this.destinationService = destinationService;
        this.request = {
            sorting: {
                fieldName: 'id',
                direction: sort_direction_1.SortDirection.Asc
            },
            pageNumber: 0
        };
    }
    FlightsComponent.prototype.ngOnInit = function () {
        this.updateFlights();
    };
    FlightsComponent.prototype.sort = function (sortBy) {
        this.setSorting(sortBy);
        this.updateFlights();
    };
    FlightsComponent.prototype.updateFlights = function () {
        var _this = this;
        var destRequest = {
            sorting: {
                fieldName: 'id',
                direction: sort_direction_1.SortDirection.Asc
            },
            pageNumber: -1
        };
        this.flightService.getFlightsList(this.request).then(function (response) {
            _this.totalPageCount = response.pageCount;
            return response.flights;
        }).then(function (flights) {
            _this.destinationService.getDestinationsList(destRequest).then(function (response) {
                var destinationsList = response.destinations;
                flights.forEach(function (flight) {
                    flight.to = _this.findDestinationName(flight.to, destinationsList);
                    flight.from = _this.findDestinationName(flight.from, destinationsList);
                });
                _this.flights = flights;
            });
        });
    };
    FlightsComponent.prototype.findDestinationName = function (id, destination) {
        for (var i = 0, n = destination.length; i < n; i++) {
            var destId = destination[i].id;
            if (id === destId) {
                return destination[i].name;
            }
        }
        return "";
    };
    FlightsComponent.prototype.setSorting = function (sortBy) {
        if (sortBy === this.request.sorting.fieldName) {
            this.request.sorting.direction === sort_direction_1.SortDirection.Asc ? this.request.sorting.direction = sort_direction_1.SortDirection.Desc
                : this.request.sorting.direction = sort_direction_1.SortDirection.Asc;
        }
        else {
            this.request.sorting.fieldName = sortBy;
            this.request.sorting.direction = sort_direction_1.SortDirection.Asc;
        }
    };
    FlightsComponent.prototype.onChangeActivePage = function (activePage) {
        this.setActivePage(activePage);
        this.updateFlights();
    };
    FlightsComponent.prototype.setActivePage = function (activePage) {
        this.request.pageNumber = activePage;
    };
    FlightsComponent.prototype.getSortingClasses = function (elementName) {
        var classes = {
            'sort-desc': false,
            'sort-asc': false
        };
        if (this.isClassActive(elementName)) {
            if (this.getSortDirection() === 1) {
                classes['sort-asc'] = true;
            }
            else {
                classes['sort-desc'] = true;
            }
        }
        return classes;
    };
    FlightsComponent.prototype.isClassActive = function (elementName) {
        return this.request.sorting.fieldName === elementName;
    };
    FlightsComponent.prototype.getSortDirection = function () {
        return this.request.sorting.direction;
    };
    FlightsComponent.prototype.selectFlight = function (id) {
        this.selectedFlightId = id;
    };
    FlightsComponent.prototype.onDeleteRequest = function (targetFlightId) {
        var _this = this;
        this.flightService.deleteFlight(targetFlightId);
        // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
        setTimeout(function () {
            _this.updateFlights();
        }, 250);
    };
    FlightsComponent = __decorate([
        core_1.Component({
            selector: 'flights',
            templateUrl: 'flights.component.html'
        })
    ], FlightsComponent);
    return FlightsComponent;
}());
exports.FlightsComponent = FlightsComponent;
