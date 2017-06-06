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
var default_list_request_1 = require("../constants/default-list-request");
var sort_direction_1 = require("../model/sort-direction");
var headers_builder_1 = require("../utils/headers-builder");
var server_address_1 = require("../constants/server-address");
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.serverEndpoint = '/client';
    }
    UsersService.prototype.getUsersList = function (request, delay) {
        if (request === void 0) { request = default_list_request_1.defaultListRequest; }
        if (delay === void 0) { delay = 500; }
        // Setting URL query string
        var params = new http_1.URLSearchParams();
        // Determine sort type
        var sortParameters = request.sorting;
        if (sortParameters) {
            params.set('orderBy', sortParameters.fieldName);
            params.set('order', sortParameters.direction === sort_direction_1.SortDirection.Asc ? 'asc' : 'desc');
        }
        // Setting page for request
        params.set('page', request.pageNumber.toString());
        // Setting request headers
        var headers = headers_builder_1.HeadersBuilder.newBuilder();
        var options = new http_1.RequestOptions({ headers: headers.build(), search: params });
        return this.http.get("" + server_address_1.serverAddress + this.serverEndpoint, options).delay(delay).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UsersService.prototype.handleError = function (error) {
        console.error("Error occurred in UserService while sending HTTP request", error);
        return Promise.reject(error.message || error);
    };
    UsersService.prototype.createUser = function (newUser) {
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint;
        var headers = headers_builder_1.HeadersBuilder.newBuilder().build();
        var requestBody = JSON.stringify(newUser);
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        return this.http.post(requestUrl, requestBody, requestOptions).toPromise().then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    return UsersService;
}());
UsersService = __decorate([
    core_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
