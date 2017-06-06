"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
/**
 * Created by Ruslan on 18.12.2016.
 */
var HeadersBuilder = (function () {
    function HeadersBuilder() {
        this.headers = new http_1.Headers();
    }
    HeadersBuilder.newBuilder = function () {
        return new HeadersBuilder().conentTypeHeaders();
    };
    HeadersBuilder.prototype.build = function () {
        return this.headers;
    };
    HeadersBuilder.prototype.conentTypeHeaders = function () {
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
        return this;
    };
    HeadersBuilder.prototype.basicAuthorizationHeader = function (credentials) {
        this.headers.append('Authorization', "Basic " + credentials);
        return this;
    };
    return HeadersBuilder;
}());
exports.HeadersBuilder = HeadersBuilder;
