"use strict";
/**
 * Created by Ruslan on 24.11.2016.
 */
var Destination = (function () {
    function Destination(name, latitude, longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return Destination;
}());
exports.Destination = Destination;
