"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Ruslan on 28.12.2016.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var headers_builder_1 = require("../utils/headers-builder");
var server_address_1 = require("../constants/server-address");
var sort_direction_1 = require("../model/sort-direction");
var default_list_request_1 = require("../constants/default-list-request");
// import * as moment from "moment";
var FlightService = (function () {
    function FlightService(http) {
        this.http = http;
        this.serverEndpoint = "/flight";
    }
    FlightService.prototype.getFlightsList = function (request, delay) {
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
    FlightService.prototype.createFlight = function (newFlight) {
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint;
        return this.sendCreateFlightRequest(requestUrl, 'POST', newFlight);
    };
    FlightService.prototype.getFlight = function (id) {
        var headers = headers_builder_1.HeadersBuilder.newBuilder().build();
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint + "/" + id;
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(requestUrl, options).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    FlightService.prototype.handleError = function (error) {
        console.error("Error occurred in FlightService while sending HTTP request", error);
        return Promise.reject(error.message || error);
    };
    FlightService.prototype.updateFlight = function (id, newFlight) {
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint + "/" + id;
        return this.sendCreateFlightRequest(requestUrl, 'PUT', newFlight);
    };
    FlightService.prototype.sendCreateFlightRequest = function (requestUrl, method, newFlight) {
        var headers = headers_builder_1.HeadersBuilder.newBuilder().build();
        // Generating request body using our transformed date
        newFlight.dateOfDeparture = this.transformToSQLTimestamp(newFlight.dateOfDeparture);
        var requestBody = JSON.stringify(newFlight);
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        if (method === 'PUT') {
            return this.http.put(requestUrl, requestBody, requestOptions).toPromise().then(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        if (method === 'POST') {
            return this.http.post(requestUrl, requestBody, requestOptions).toPromise().then(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        return Promise.reject("Request method is neither PUT nor POST");
    };
    // We are getting input in yyyy-mm-ddThh:mm format
    FlightService.prototype.transformToSQLTimestamp = function (htmlDate) {
        // Appending seconds (:ss), ms (.SSS) and timezone (Z)
        return htmlDate.concat(":00.000+0200");
    };
    FlightService.prototype.deleteFlight = function (flightId) {
        var headers = headers_builder_1.HeadersBuilder.newBuilder().build();
        var options = new http_1.RequestOptions({ headers: headers });
        var requestUrl = "" + server_address_1.serverAddress + this.serverEndpoint + "/" + flightId;
        this.http.delete(requestUrl, options).toPromise().catch(this.handleError);
    };
    FlightService = __decorate([
        core_1.Injectable()
    ], FlightService);
    return FlightService;
}());
exports.FlightService = FlightService;
