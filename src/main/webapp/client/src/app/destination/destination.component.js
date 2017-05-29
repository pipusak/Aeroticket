"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var sort_direction_1 = require("../model/sort-direction");
var DestinationComponent = (function () {
    function DestinationComponent(destinationService) {
        this.destinationService = destinationService;
        this.request = {
            sorting: {
                fieldName: 'id',
                direction: sort_direction_1.SortDirection.Asc
            },
            pageNumber: 0
        };
    }
    DestinationComponent.prototype.ngOnInit = function () {
        this.updateDestinations();
    };
    DestinationComponent.prototype.sort = function (sortBy) {
        this.setSorting(sortBy);
        this.updateDestinations();
    };
    DestinationComponent.prototype.setSorting = function (sortBy) {
        // Check, if we just need to change the direction of sort
        if (sortBy === this.request.sorting.fieldName) {
            this.request.sorting.direction === sort_direction_1.SortDirection.Asc ? this.request.sorting.direction = sort_direction_1.SortDirection.Desc
                : this.request.sorting.direction = sort_direction_1.SortDirection.Asc;
        }
        else {
            this.request.sorting.fieldName = sortBy;
            this.request.sorting.direction = sort_direction_1.SortDirection.Asc;
        }
    };
    DestinationComponent.prototype.updateDestinations = function () {
        var _this = this;
        this.destinationService.getDestinationsList(this.request).then(function (response) {
            _this.totalPageCount = response.pageCount;
            _this.destinations = response.destinations;
        });
    };
    DestinationComponent.prototype.isClassActive = function (elementName) {
        return this.request.sorting.fieldName === elementName;
    };
    DestinationComponent.prototype.getSortDirection = function () {
        return this.request.sorting.direction;
    };
    DestinationComponent.prototype.onChangeActivePage = function (activePage) {
        this.setActivePage(activePage);
        this.updateDestinations();
    };
    DestinationComponent.prototype.setActivePage = function (activePage) {
        this.request.pageNumber = activePage;
    };
    DestinationComponent.prototype.onDeleteRequest = function (targetDestinationId) {
        var _this = this;
        this.destinationService.deleteDestination(targetDestinationId);
        // Wait 250 ms until list update, to be sure, that the operation done after delete request complete
        setTimeout(function () { _this.updateDestinations(); }, 250);
    };
    DestinationComponent.prototype.selectDestination = function (id) {
        this.selectedDestinationId = id;
    };
    DestinationComponent = __decorate([
        core_1.Component({
            selector: 'destination',
            templateUrl: 'destination.component.html'
        })
    ], DestinationComponent);
    return DestinationComponent;
}());
exports.DestinationComponent = DestinationComponent;
