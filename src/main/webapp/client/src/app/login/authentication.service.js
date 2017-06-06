"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var headers_builder_1 = require("../utils/headers-builder");
var server_address_1 = require("../constants/server-address");
var AuthenticationService = (function () {
    function AuthenticationService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.loggedIn = false;
        this.admin = false;
        this.serverEndpoint = '/login';
        this.role = "NONE";
        if (localStorage.getItem('cred')) {
            this.loggedIn = true;
            if (localStorage.getItem('role') === 'ADMIN') {
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
    // Note: credentials are in encoded form
    AuthenticationService.prototype.getCredentials = function () {
        return localStorage.getItem('cred');
    };
    AuthenticationService.prototype.getUserId = function () {
        return +localStorage.getItem('id');
    };
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        return this.getAuthentifivation(email, password).then(function (response) { return _this.fillVars(response); }).catch(this.handleError);
    };
    AuthenticationService.prototype.fillVars = function (authentificationObject) {
        console.log("FILL Vars");
        this.loggedIn = true;
        var credentials = btoa("fakecred");
        localStorage.setItem('cred', credentials);
        this.loggedIn = true;
        if (authentificationObject.role === 'ADMIN') {
            this.admin = true;
        }
        localStorage.setItem('role', authentificationObject.role);
        localStorage.setItem('id', authentificationObject.id);
        return Promise.resolve(true);
    };
    AuthenticationService.prototype.getAuthentifivation = function (email, password, delay) {
        if (delay === void 0) { delay = 500; }
        console.log("Start login");
        var headers = headers_builder_1.HeadersBuilder.newBuilder().build();
        var authentificationRequest = {
            email: email,
            password: password
        };
        var requestBody = JSON.stringify(authentificationRequest);
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint;
        return this.http.post(requestUrl, requestBody, requestOptions).delay(delay).toPromise().then(function (response) { return response.json(); }).catch(this.handleError);
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('cred');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        this.admin = false;
        this.loggedIn = false;
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error("Incorrect credentials", error);
        return Promise.reject(error.message || error);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable()
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
