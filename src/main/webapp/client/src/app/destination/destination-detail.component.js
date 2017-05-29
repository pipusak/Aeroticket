"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Ruslan on 08.12.2016.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var DestinationDetailComponent = (function () {
    function DestinationDetailComponent(destinationService, route, location, router) {
        this.destinationService = destinationService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    DestinationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.destinationService.getDestination(+params['id']); })
            .subscribe(function (destination) { return _this.destination = destination; });
    };
    DestinationDetailComponent.prototype.onDeleteRequest = function (targetDestinationId) {
        this.destinationService.deleteDestination(targetDestinationId);
        this.router.navigate(['/destination']);
    };
    DestinationDetailComponent = __decorate([
        core_1.Component({
            selector: 'destination-detail',
            templateUrl: 'destination-detail.component.html'
        })
    ], DestinationDetailComponent);
    return DestinationDetailComponent;
}());
exports.DestinationDetailComponent = DestinationDetailComponent;
