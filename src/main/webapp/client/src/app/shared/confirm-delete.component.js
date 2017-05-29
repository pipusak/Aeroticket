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
var ConfirmDeleteComponent = (function () {
    function ConfirmDeleteComponent() {
        this.deleteRequest = new core_1.EventEmitter();
    }
    ConfirmDeleteComponent.prototype.sendDeleteRequest = function () {
        this.deleteRequest.emit(this.targetItemId);
    };
    __decorate([
        core_1.Input()
    ], ConfirmDeleteComponent.prototype, "targetItemId", void 0);
    __decorate([
        core_1.Output()
    ], ConfirmDeleteComponent.prototype, "deleteRequest", void 0);
    ConfirmDeleteComponent = __decorate([
        core_1.Component({
            selector: 'confirm-delete',
            templateUrl: 'confirm-delete.component.html'
        })
    ], ConfirmDeleteComponent);
    return ConfirmDeleteComponent;
}());
exports.ConfirmDeleteComponent = ConfirmDeleteComponent;
