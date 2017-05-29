"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AuthenticationComponent = (function () {
    /*
     *  TODO: authentication minor changes
     *  1. Basic form validation
     *  2. Register form validation (password matching)
      * 3. Possible remove buttons for non-admin
     */
    function AuthenticationComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    // Logout user after it is redirected here (the only way is to click logout)
    AuthenticationComponent.prototype.ngOnInit = function () {
        this.authService.logout();
    };
    AuthenticationComponent.prototype.onLoginSubmit = function (username, password) {
        this.authService.login(username, password);
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    };
    AuthenticationComponent.prototype.onRegisterSubmit = function (firstName, lastName, email, password) {
        console.log("Registered " + firstName + " " + lastName);
    };
    AuthenticationComponent = __decorate([
        core_1.Component({
            templateUrl: 'authentication.component.html',
            selector: 'authentication',
            styleUrls: ['authentication.component.css']
        })
    ], AuthenticationComponent);
    return AuthenticationComponent;
}());
exports.AuthenticationComponent = AuthenticationComponent;
