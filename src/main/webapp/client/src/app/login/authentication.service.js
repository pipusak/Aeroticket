"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AuthenticationService = (function () {
    function AuthenticationService(http, userService) {
        this.http = http;
        this.userService = userService;
        // TODO: test this
        this.loggedIn = false;
        this.admin = false;
        if (localStorage.getItem('cred')) {
            this.loggedIn = true;
            if (localStorage.getItem('role') === 'admins') {
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
    AuthenticationService.prototype.login = function (username, password) {
        // let loginSuccessfull: Promise<boolean> = this.userService.getUsersList().then(userList => {
        //   let user = this.findUserInList(userList, username, password);
        //   if (user) {
        //     this.loggedIn = true;
        //     let credentials = btoa(`${username}:${password}`);
        //     localStorage.setItem('cred', credentials);
        //
        //     this.admin = user.role === 'admins';
        //     localStorage.setItem('role', user.role);
        //     localStorage.setItem('id', user.id);
        //
        //     return true;
        //   }
        //
        //   return false;
        // }).catch(err => {
        //   return false;
        // });
        //
        // return loginSuccessfull;
        localStorage.setItem('cred', 'asd');
        localStorage.setItem('id', '1');
        this.loggedIn = true;
        if (password === 'admin') {
            localStorage.setItem('role', 'admins');
            this.admin = true;
        }
        return Promise.resolve(true);
    };
    AuthenticationService.prototype.findUserInList = function (userList, username, password) {
        for (var i = 0, n = userList.length; i < n; i++) {
            var user = userList[i];
            if (username === user.login && password === user.password) {
                return user;
            }
        }
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('cred');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        this.admin = false;
        this.loggedIn = false;
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable()
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
