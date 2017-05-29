"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.changeActivePage = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.ngOnInit = function () {
        this.setPagesArray(this.totalPageCount);
        this.activePage = 0;
    };
    PaginationComponent.prototype.setPagesArray = function (arrayLength) {
        this.pages = Array(arrayLength).fill(0).map(function (x, i) { return i; });
    };
    PaginationComponent.prototype.setActivePage = function (page) {
        if (page > this.totalPageCount - 1) {
            page = this.totalPageCount - 1;
        }
        if (page < 0) {
            page = 0;
        }
        this.activePage = page;
        this.changeActivePage.emit(page);
    };
    PaginationComponent.prototype.hasNextPage = function () {
        return this.activePage < this.totalPageCount - 1;
    };
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "totalPageCount", void 0);
    __decorate([
        core_1.Output()
    ], PaginationComponent.prototype, "changeActivePage", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pagination',
            templateUrl: 'pagination-component.html'
        })
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
