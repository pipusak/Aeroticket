"use strict";
/**
 * Created by Ruslan on 15.12.2016.
 */
(function (RequestStatus) {
    RequestStatus[RequestStatus["PENDING"] = 0] = "PENDING";
    RequestStatus[RequestStatus["OK"] = 1] = "OK";
    RequestStatus[RequestStatus["ERROR"] = 2] = "ERROR";
})(exports.RequestStatus || (exports.RequestStatus = {}));
var RequestStatus = exports.RequestStatus;
