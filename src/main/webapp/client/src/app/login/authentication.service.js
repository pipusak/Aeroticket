"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.loggedIn = false;
        this.admin = false;
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
            if (localStorage.getItem('token') === 'admin') {
                this.admin = true;
            }
        }
    }
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthenticationService.prototype.isAdmin = function () {
        return this.admin;
    };
    AuthenticationService.prototype.login = function (username, password) {
        localStorage.setItem('token', password);
        if (password === 'admin') {
            this.admin = true;
        }
        this.loggedIn = true;
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.admin = false;
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
